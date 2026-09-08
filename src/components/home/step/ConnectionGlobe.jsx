import React, { useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * Light dot-matrix globe.
 * Dots are placed only on land (sampled from an equirectangular land/water mask),
 * so real continents read clearly. A depth-aware shader fades dots on the far
 * hemisphere so the sphere feels volumetric on a light surface. HTML "LIVE"
 * badges track their city's projected screen position and fade in as that
 * region rotates to the front.
 */

const LAND_MASK = "https://unpkg.com/three-globe/example/img/earth-water.png";

const LIVE_NODES = [
  { lat: -17.82, lng: 31.05, count: 1590 },
  { lat: 0.35, lng: 32.58, count: 2881 },
  { lat: -26.2, lng: 28.04, count: 1125 },
  { lat: -1.29, lng: 36.82, count: 743 },
];

function latLngToVec3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function makeDotSprite() {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.55, "rgba(255,255,255,0.95)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/** Sample the land/water mask into a boolean lookup grid. */
function loadLandSampler() {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const w = 1024;
      const h = 512;
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      let data;
      try {
        data = ctx.getImageData(0, 0, w, h).data;
      } catch {
        resolve(null);
        return;
      }
      // In earth-water.png water is bright, land is dark.
      resolve((lat, lng) => {
        const x = Math.floor(((lng + 180) / 360) * (w - 1));
        const y = Math.floor(((90 - lat) / 180) * (h - 1));
        return data[(y * w + x) * 4] < 110;
      });
    };
    img.onerror = () => resolve(null);
    img.src = LAND_MASK;
  });
}

export function ConnectionGlobe() {
  const mountRef = useRef(null);
  const badgeRefs = useRef([]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let frame;
    let cleanupFns = [];

    const start = async () => {
      const isLand = await loadLandSampler();
      if (disposed || !mount) return;

      const width = mount.clientWidth;
      const height = mount.clientHeight;
      const R = Math.max(60, Math.min(width, height) * 0.4);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 4000);
      camera.position.z = R * 3.3;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      mount.appendChild(renderer.domElement);

      const globe = new THREE.Group();
      globe.rotation.z = -0.14;
      scene.add(globe);

      // ── Land dots (dense fibonacci sample, kept only where the mask says land) ──
      const sampleCount = 34000;
      const pts = [];
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < sampleCount; i++) {
        const y = 1 - (i / (sampleCount - 1)) * 2;
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = golden * i;
        const px = Math.cos(theta) * r;
        const pz = Math.sin(theta) * r;

        const lat = Math.asin(y) * (180 / Math.PI);
        const lng = Math.atan2(pz, -px) * (180 / Math.PI) - 180;
        const normLng = ((lng + 540) % 360) - 180;

        if (!isLand || isLand(lat, normLng)) {
          pts.push(px * R, y * R, pz * R);
        }
      }

      const dotGeo = new THREE.BufferGeometry();
      dotGeo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));

      const sprite = makeDotSprite();
      const dotMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uMap: { value: sprite },
          uColor: { value: new THREE.Color(0x0b1b2a) },
          uSize: { value: R * 0.017 * renderer.getPixelRatio() },
        },
        vertexShader: `
          uniform float uSize;
          varying float vFade;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            // Depth fade: dots on the far hemisphere become faint
            vec3 n = normalize(mat3(modelViewMatrix) * normalize(position));
            float facing = n.z;
            vFade = smoothstep(-0.75, 0.35, facing);
            gl_PointSize = uSize * (300.0 / -mv.z) * (0.72 + 0.28 * vFade);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          uniform sampler2D uMap;
          uniform vec3 uColor;
          varying float vFade;
          void main() {
            float a = texture2D(uMap, gl_PointCoord).a;
            if (a < 0.05) discard;
            gl_FragColor = vec4(uColor, a * mix(0.07, 0.9, vFade));
          }
        `,
      });
      const dots = new THREE.Points(dotGeo, dotMat);
      globe.add(dots);

      // ── Very soft occluding sphere so back dots read as behind, not through ──
      const veilGeo = new THREE.SphereGeometry(R * 0.985, 48, 48);
      const veilMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.72,
        depthWrite: true,
      });
      globe.add(new THREE.Mesh(veilGeo, veilMat));

      // ── Live node markers ──
      const nodes = LIVE_NODES.map((n) => {
        const v = latLngToVec3(n.lat, n.lng, R * 1.005);
        const dir = v.clone().normalize();

        const pinGeo = new THREE.SphereGeometry(R * 0.012, 12, 12);
        const pinMat = new THREE.MeshBasicMaterial({
          color: 0xef4444,
          transparent: true,
          opacity: 0,
        });
        const pin = new THREE.Mesh(pinGeo, pinMat);
        pin.position.copy(v);
        globe.add(pin);

        return { local: v, dir, pin };
      });

      const baseCounts = LIVE_NODES.map((n) => n.count);
      const camDir = new THREE.Vector3();
      const worldNormal = new THREE.Vector3();
      let lastCountUpdate = 0;

      const animate = (t) => {
        frame = requestAnimationFrame(animate);
        globe.rotation.y += 0.0012;
        camera.getWorldDirection(camDir);
        const toCam = camDir.clone().negate();

        nodes.forEach((node, i) => {
          worldNormal.copy(node.dir).applyQuaternion(globe.quaternion).normalize();
          const facing = worldNormal.dot(toCam);
          const online = THREE.MathUtils.clamp((facing - 0.15) / 0.4, 0, 1);
          const eased = online * online * (3 - 2 * online);

          node.pin.material.opacity = eased;

          const badge = badgeRefs.current[i];
          if (badge) {
            const projected = node.local.clone().applyMatrix4(globe.matrixWorld).project(camera);
            const x = (projected.x * 0.5 + 0.5) * width;
            const y = (-projected.y * 0.5 + 0.5) * height;
            badge.style.transform = `translate(-50%, -100%) translate(${x}px, ${y - 10}px)`;
            badge.style.opacity = String(eased);
          }
        });

        if (t - lastCountUpdate > 2200) {
          lastCountUpdate = t;
          LIVE_NODES.forEach((n, i) => {
            n.count = Math.max(50, baseCounts[i] + Math.floor((Math.random() - 0.45) * 14));
            const el = badgeRefs.current[i]?.querySelector("[data-count]");
            if (el) el.textContent = n.count.toLocaleString();
          });
        }

        renderer.render(scene, camera);
      };
      animate(0);

      const onResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      cleanupFns.push(() => {
        window.removeEventListener("resize", onResize);
        scene.traverse((o) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            const mats = Array.isArray(o.material) ? o.material : [o.material];
            mats.forEach((m) => m.dispose());
          }
        });
        sprite.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      });
    };

    start();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mountRef} className="h-full w-full" />
      {LIVE_NODES.map((n, i) => (
        <div
          key={i}
          ref={(el) => (badgeRefs.current[i] = el)}
          className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-md bg-[#111418] px-2 py-1 text-[10px] font-medium text-white shadow-lift"
          style={{ opacity: 0, willChange: "transform, opacity" }}
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>
            <span className="font-bold uppercase tracking-wide">Live</span>
            <span className="text-white/25">|</span>
            <span data-count className="display-mono">{n.count.toLocaleString()}</span>
            <span className="text-white/60">connected</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default ConnectionGlobe;