import React, { useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * Photoreal Earth globe.
 * - NASA Blue Marble colour map + topology bump + specular water mask
 * - Directional "sun" light plus soft ambient fill
 * - Fresnel atmosphere shell for a true limb glow
 * - Live nodes "come online": as each city rotates toward the camera its pin
 *   ignites, a halo expands, and its HTML badge fades in. Rotating away, it
 *   goes dark again.
 */

const TEX = {
  map: "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
  bump: "https://unpkg.com/three-globe/example/img/earth-topology.png",
  water: "https://unpkg.com/three-globe/example/img/earth-water.png",
};

const LIVE_NODES = [
  { lat: -17.82, lng: 31.05, label: "Harare", count: 1590 },
  { lat: 0.35, lng: 32.58, label: "Kampala", count: 2881 },
  { lat: -1.29, lng: 36.82, label: "Nairobi", count: 1125 },
  { lat: -26.2, lng: 28.04, label: "Johannesburg", count: 743 },
  { lat: -20.15, lng: 28.58, label: "Bulawayo", count: 612 },
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

export function ConnectionGlobe() {
  const mountRef = useRef(null);
  const badgeRefs = useRef([]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const R = Math.max(60, Math.min(width, height) * 0.38);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 4000);
    camera.position.z = R * 3.4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // ── Lighting ──
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const sun = new THREE.DirectionalLight(0xfff4e0, 1.5);
    sun.position.set(-R * 3, R * 1.6, R * 3);
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x88bbff, 0.5);
    rim.position.set(R * 3, -R, -R * 2);
    scene.add(rim);

    const globe = new THREE.Group();
    // Tilt so Africa/Southern hemisphere reads well
    globe.rotation.z = -0.18;
    scene.add(globe);

    // ── Earth ──
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    const colorMap = loader.load(TEX.map, (t) => { t.colorSpace = THREE.SRGBColorSpace; });
    const bumpMap = loader.load(TEX.bump);
    const waterMap = loader.load(TEX.water);

    const earthGeo = new THREE.SphereGeometry(R, 96, 96);
    const earthMat = new THREE.MeshPhongMaterial({
      map: colorMap,
      bumpMap: bumpMap,
      bumpScale: R * 0.035,
      specularMap: waterMap,
      specular: new THREE.Color(0x4a6a8a),
      shininess: 12,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    globe.add(earth);

    // ── Atmosphere (fresnel limb glow) ──
    const atmoGeo = new THREE.SphereGeometry(R * 1.13, 64, 64);
    const atmoMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { glowColor: { value: new THREE.Color(0x4a90d9) } },
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
          float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.6);
          gl_FragColor = vec4(glowColor, 1.0) * intensity * 1.4;
        }
      `,
    });
    scene.add(new THREE.Mesh(atmoGeo, atmoMat));

    // ── Live nodes ──
    const nodes = LIVE_NODES.map((n) => {
      const v = latLngToVec3(n.lat, n.lng, R * 1.004);
      const dir = v.clone().normalize();

      // core pin
      const pinGeo = new THREE.SphereGeometry(R * 0.016, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: 0xffcc00,
        transparent: true,
        opacity: 0,
      });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(v);
      globe.add(pin);

      // expanding halo ring, oriented tangent to the surface
      const haloGeo = new THREE.RingGeometry(R * 0.02, R * 0.028, 40);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0xffcc00,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(v);
      halo.lookAt(dir.clone().multiplyScalar(R * 3));
      globe.add(halo);

      // vertical beam rising from the city
      const beamGeo = new THREE.CylinderGeometry(R * 0.004, R * 0.004, R * 0.13, 8, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0xffcc00,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.copy(dir.clone().multiplyScalar(R * 1.065));
      beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      globe.add(beam);

      return { local: v, dir, pin, halo, beam, phase: Math.random() * Math.PI * 2 };
    });

    const baseCounts = LIVE_NODES.map((n) => n.count);
    const camDir = new THREE.Vector3();
    const worldNormal = new THREE.Vector3();

    let frame;
    let lastCountUpdate = 0;

    const animate = (t) => {
      frame = requestAnimationFrame(animate);
      globe.rotation.y += 0.0011;

      camera.getWorldDirection(camDir); // points from camera into scene

      nodes.forEach((node, i) => {
        // How much this node faces the camera: 1 = dead centre, 0 = limb, <0 = behind
        worldNormal.copy(node.dir).applyQuaternion(globe.quaternion).normalize();
        const facing = worldNormal.dot(camDir.clone().negate());

        // "Coming online" ramp — ignites between the limb and the front face
        const online = THREE.MathUtils.clamp((facing - 0.12) / 0.4, 0, 1);
        const eased = online * online * (3 - 2 * online); // smoothstep

        const pulse = 0.5 + 0.5 * Math.sin(t * 0.0032 + node.phase);

        node.pin.material.opacity = eased;
        node.pin.scale.setScalar(0.8 + eased * (0.6 + pulse * 0.35));

        // halo expands outward as it comes online, then breathes
        node.halo.material.opacity = eased * (0.55 - pulse * 0.3);
        node.halo.scale.setScalar(0.6 + eased * (1.1 + pulse * 1.5));

        node.beam.material.opacity = eased * 0.4;
        node.beam.scale.set(1, 0.3 + eased * 0.9, 1);

        // HTML badge tracking
        const badge = badgeRefs.current[i];
        if (badge) {
          const world = node.local.clone().applyMatrix4(globe.matrixWorld);
          const projected = world.clone().project(camera);
          const x = (projected.x * 0.5 + 0.5) * width;
          const y = (-projected.y * 0.5 + 0.5) * height;
          badge.style.transform = `translate(-50%, -100%) translate(${x}px, ${y - 12}px) scale(${0.9 + eased * 0.1})`;
          badge.style.opacity = String(eased);
        }
      });

      if (t - lastCountUpdate > 2200) {
        lastCountUpdate = t;
        LIVE_NODES.forEach((n, i) => {
          n.count = Math.max(50, baseCounts[i] + Math.floor((Math.random() - 0.45) * 14));
          const countEl = badgeRefs.current[i]?.querySelector("[data-count]");
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
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => m.dispose());
        }
      });
      colorMap.dispose();
      bumpMap.dispose();
      waterMap.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mountRef} className="h-full w-full" />
      {LIVE_NODES.map((n, i) => (
        <div
          key={n.label}
          ref={(el) => (badgeRefs.current[i] = el)}
          className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-md border border-loop/25 bg-signal-deep/90 px-2 py-1 text-[10px] font-medium text-paper shadow-lift backdrop-blur-sm"
          style={{ opacity: 0, willChange: "transform, opacity" }}
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-loop opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-loop" />
            </span>
            <span className="font-semibold text-paper">{n.label}</span>
            <span className="text-paper/30">|</span>
            <span data-count className="display-mono">{n.count.toLocaleString()}</span>
            <span className="text-paper/60">online</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default ConnectionGlobe;