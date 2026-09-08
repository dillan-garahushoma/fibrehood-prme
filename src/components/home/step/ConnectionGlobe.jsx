import React, { useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * High-quality dot-matrix globe.
 * - Round dot sprites (canvas texture) instead of square points
 * - Depth-aware opacity so the back hemisphere fades naturally
 * - Soft atmospheric rim glow
 * - Animated connection arcs between live nodes
 * - Higher pixel ratio for crisp rendering
 *
 * Live badges track their node's 3D projection to 2D screen space.
 */

const LIVE_NODES = [
  { lat: -17.8, lng: 31.0, label: "Harare", count: 1590 },
  { lat: 1.3, lng: 32.3, label: "Kampala", count: 2881 },
  { lat: -1.3, lng: 36.8, label: "Nairobi", count: 1125 },
  { lat: -26.2, lng: 28.0, label: "Joburg", count: 743 },
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

// Soft circular sprite texture for crisp, anti-aliased dots
function makeDotTexture() {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(7,34,72,1)");
  g.addColorStop(0.5, "rgba(7,34,72,0.9)");
  g.addColorStop(1, "rgba(7,34,72,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

// Build a curved arc (quadratic bezier bulging outward) between two points on the sphere
function buildArc(a, b, radius) {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const bulge = mid.length();
  mid.normalize().multiplyScalar(bulge + radius * 0.35);
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  const points = curve.getPoints(60);
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  return geo;
}

export function ConnectionGlobe() {
  const mountRef = useRef(null);
  const badgeRefs = useRef([]);
  const pinRefs = useRef([]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const R = Math.max(60, Math.min(width, height) * 0.38);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.z = R * 3.6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const dotTexture = makeDotTexture();
    const globe = new THREE.Group();
    scene.add(globe);

    // ── Dot-matrix sphere (fibonacci distribution) ──
    const dotCount = 2600;
    const positions = new Float32Array(dotCount * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      positions[i * 3] = Math.cos(theta) * r * R;
      positions[i * 3 + 1] = y * R;
      positions[i * 3 + 2] = Math.sin(theta) * r * R;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const dotMat = new THREE.PointsMaterial({
      size: R * 0.05,
      map: dotTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      sizeAttenuation: true,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    globe.add(dots);

    // ── Soft inner sphere for subtle depth ──
    const coreGeo = new THREE.SphereGeometry(R * 0.97, 48, 48);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x072248,
      transparent: true,
      opacity: 0.035,
    });
    globe.add(new THREE.Mesh(coreGeo, coreMat));

    // ── Atmospheric rim glow (back-side fresnel) ──
    const atmoGeo = new THREE.SphereGeometry(R * 1.12, 64, 64);
    const atmoMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { glowColor: { value: new THREE.Color(0x072248) } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 glowColor;
        void main() {
          float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor = vec4(glowColor, 1.0) * intensity;
        }
      `,
    });
    const atmo = new THREE.Mesh(atmoGeo, atmoMat);
    scene.add(atmo);

    // ── Live node pins + outward stems ──
    const nodeWorld = LIVE_NODES.map((n) => {
      const v = latLngToVec3(n.lat, n.lng, R);

      const pinGeo = new THREE.SphereGeometry(R * 0.028, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(v);
      globe.add(pin);

      // outward stem + base ring
      const out = v.clone().normalize().multiplyScalar(R * 1.12);
      const stemGeo = new THREE.BufferGeometry().setFromPoints([
        v.clone(),
        out.clone(),
      ]);
      const stemMat = new THREE.LineBasicMaterial({
        color: 0x072248,
        transparent: true,
        opacity: 0.35,
      });
      globe.add(new THREE.Line(stemGeo, stemMat));

      const ringGeo = new THREE.RingGeometry(R * 0.02, R * 0.035, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xef4444,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(v);
      ring.lookAt(0, 0, 0);
      globe.add(ring);

      return { vec: v, pin };
    });

    // ── Animated connection arcs between consecutive live nodes ──
    const arcs = [];
    for (let i = 0; i < nodeWorld.length; i++) {
      const a = nodeWorld[i].vec;
      const b = nodeWorld[(i + 1) % nodeWorld.length].vec;
      const geo = buildArc(a, b, R);
      const mat = new THREE.LineBasicMaterial({
        color: 0xffcc00,
        transparent: true,
        opacity: 0.45,
      });
      const line = new THREE.Line(geo, mat);
      globe.add(line);
      arcs.push({ line, geo });
    }

    const baseCounts = LIVE_NODES.map((n) => n.count);

    let frame;
    let lastCountUpdate = 0;

    const animate = (t) => {
      frame = requestAnimationFrame(animate);
      globe.rotation.y += 0.0014;

      // pulse pins
      const pulse = 1 + Math.sin(t * 0.004) * 0.15;
      nodeWorld.forEach((n) => {
        if (n.pin) n.pin.scale.setScalar(pulse);
      });

      // project nodes → screen space for HTML badges
      nodeWorld.forEach((node, i) => {
        const worldPos = node.vec.clone().applyMatrix4(globe.matrixWorld);
        worldPos.project(camera);
        const x = (worldPos.x * 0.5 + 0.5) * width;
        const y = (-worldPos.y * 0.5 + 0.5) * height;
        const visible = worldPos.z < 1 && worldPos.z > -1;
        const facing = worldPos.z; // < 0 => front-ish in clip space projection after rotation

        const badge = badgeRefs.current[i];
        if (badge) {
          if (visible) {
            badge.style.transform = `translate(-50%, -100%) translate(${x}px, ${y - 14}px)`;
            const op = facing < 0.6 ? Math.min(1, (0.6 - facing) * 2.2 + 0.15) : 0.15;
            badge.style.opacity = String(op);
          } else {
            badge.style.opacity = "0";
          }
        }
      });

      if (t - lastCountUpdate > 2200) {
        lastCountUpdate = t;
        LIVE_NODES.forEach((n, i) => {
          const delta = Math.floor((Math.random() - 0.45) * 12);
          n.count = Math.max(50, baseCounts[i] + delta);
          const badge = badgeRefs.current[i];
          const countEl = badge?.querySelector("[data-count]");
          if (countEl) countEl.textContent = n.count.toLocaleString();
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

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      dotTexture.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      arcs.forEach((a) => { a.geo.dispose(); a.line.material.dispose(); });
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mountRef} className="h-full w-full" />
      {LIVE_NODES.map((n, i) => (
        <div
          key={i}
          ref={(el) => (badgeRefs.current[i] = el)}
          className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-md border border-signal/15 bg-signal-deep/90 px-2 py-1 text-[10px] font-medium text-paper shadow-lift backdrop-blur-sm"
          style={{ opacity: 0, willChange: "transform, opacity" }}
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>
            <span className="font-bold uppercase tracking-wide text-loop">Live</span>
            <span className="text-paper/40">|</span>
            <span data-count>{n.count.toLocaleString()}</span>
            <span className="text-paper/60">connected</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default ConnectionGlobe;