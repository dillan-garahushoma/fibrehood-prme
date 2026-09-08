import React, { useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * Dot-matrix globe with live connection badges.
 * Navy points form a slowly-rotating sphere; red pins mark live nodes whose
 * "LIVE · N watching" badges track their 3D projection to 2D screen space.
 * Pure three.js — no external globe library. Background transparent so it
 * blends into the section surface like the other step visuals.
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

export function ConnectionGlobe() {
  const mountRef = useRef(null);
  const badgeRefs = useRef([]);
  const lineRefs = useRef([]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const R = Math.min(width, height) * 0.4;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = R * 3.4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // ── Dot-matrix sphere (fibonacci distribution) ──
    const dotCount = 1400;
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
      color: 0x072248,
      size: R * 0.035,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.78,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    scene.add(dots);

    // ── Soft inner glow sphere for depth ──
    const glowGeo = new THREE.SphereGeometry(R * 0.98, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x072248,
      transparent: true,
      opacity: 0.04,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    // ── Live node pins (grouped so they rotate with the globe) ──
    const nodeGroup = new THREE.Group();
    const nodeVecs = LIVE_NODES.map((n) => {
      const v = latLngToVec3(n.lat, n.lng, R);
      const pinGeo = new THREE.SphereGeometry(R * 0.03, 12, 12);
      const pinMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(v);
      nodeGroup.add(pin);

      // thin connecting line from pin outward
      const out = v.clone().multiplyScalar(1.18);
      const lineGeo = new THREE.BufferGeometry().setFromPoints([v, out]);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x072248, transparent: true, opacity: 0.4 });
      nodeGroup.add(new THREE.Line(lineGeo, lineMat));

      return { vec: v, out };
    });
    scene.add(nodeGroup);
    nodeGroup.add(dots);
    nodeGroup.add(glow);

    // animate counts up/down slightly for "live" feel
    const baseCounts = LIVE_NODES.map((n) => n.count);

    let frame;
    let lastCountUpdate = 0;
    const screen = new THREE.Vector3();

    const animate = (t) => {
      frame = requestAnimationFrame(animate);
      nodeGroup.rotation.y += 0.0016;

      // project each node to screen space → position HTML badges
      nodeVecs.forEach((node, i) => {
        const worldPos = node.vec.clone().applyMatrix4(nodeGroup.matrixWorld);
        worldPos.project(camera);
        const x = (worldPos.x * 0.5 + 0.5) * width;
        const y = (-worldPos.y * 0.5 + 0.5) * height;
        const visible = worldPos.z < 1 && worldPos.z > -1;

        const badge = badgeRefs.current[i];
        const line = lineRefs.current[i];
        if (badge && line) {
          if (visible) {
            badge.style.transform = `translate(-50%, -100%) translate(${x}px, ${y - 14}px)`;
            badge.style.opacity = worldPos.z < 0.55 ? "1" : String(0.35 + (0.55 - worldPos.z));
          } else {
            badge.style.opacity = "0";
          }
        }
      });

      // bump counts every ~2s
      if (t - lastCountUpdate > 2000) {
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
      glowGeo.dispose();
      glowMat.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mountRef} className="h-full w-full" />
      {LIVE_NODES.map((n, i) => (
        <div key={i} className="pointer-events-none absolute left-0 top-0">
          <div
            ref={(el) => (lineRefs.current[i] = el)}
            className="absolute h-3 w-px bg-signal/40"
            style={{ transform: "translate(-50%, 0)", opacity: 0 }}
          />
          <div
            ref={(el) => (badgeRefs.current[i] = el)}
            className="absolute whitespace-nowrap rounded-md border border-signal/15 bg-signal-deep/90 px-2 py-1 text-[10px] font-medium text-paper shadow-lift backdrop-blur-sm"
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
        </div>
      ))}
    </div>
  );
}

export default ConnectionGlobe;