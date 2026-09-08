import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const CITIES = [
  { name: "Harare", lat: -17.82, lng: 31.05, primary: true },
  { name: "Johannesburg", lat: -26.2, lng: 28.04 },
  { name: "Nairobi", lat: -1.29, lng: 36.82 },
  { name: "Lagos", lat: 6.52, lng: 3.38 },
  { name: "Cape Town", lat: -33.92, lng: 18.42 },
];

const radians = (value) => (value * Math.PI) / 180;
const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));

function project(lat, lng, centre, radius) {
  const latitude = radians(lat);
  const longitude = radians(lng) - centre;
  const z = Math.cos(latitude) * Math.cos(longitude);
  return { x: Math.cos(latitude) * Math.sin(longitude) * radius, y: -Math.sin(latitude) * radius, z };
}

// A lightweight continental impression keeps the preview reliable without a remote texture.
function isLand(lat, lng) {
  const africa = Math.pow((lng - 18) / 34, 2) + Math.pow((lat + 2) / 42, 2) < 1;
  const horn = lat > -5 && lat < 15 && lng > 38 && lng < 52 - lat * 0.18;
  const europe = lat > 31 && lat < 62 && lng > -12 && lng < 44;
  const arabia = lat > 12 && lat < 31 && lng > 34 && lng < 59;
  const asia = lat > 5 && lat < 52 && lng > 55 && lng < 134;
  const southAmerica = Math.pow((lng + 59) / 19, 2) + Math.pow((lat + 14) / 43, 2) < 1;
  return africa || horn || europe || arabia || asia || southAmerica;
}

function drawCurve(ctx, start, end, progress, colour) {
  if (progress <= 0) return;
  const control = { x: (start.x + end.x) / 2, y: Math.min(start.y, end.y) - 26 - Math.abs(start.x - end.x) * 0.13 };
  const pointAt = (t) => ({
    x: (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * control.x + t * t * end.x,
    y: (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * control.y + t * t * end.y,
  });
  const endT = clamp(progress);
  const steps = Math.max(3, Math.ceil(endT * 32));
  const first = pointAt(0);
  ctx.beginPath();
  ctx.moveTo(first.x, first.y);
  for (let i = 1; i <= steps; i += 1) {
    const point = pointAt((i / steps) * endT);
    ctx.lineTo(point.x, point.y);
  }
  ctx.strokeStyle = colour;
  ctx.stroke();
  if (progress < 1) {
    const travelling = pointAt(endT);
    ctx.beginPath();
    ctx.arc(travelling.x, travelling.y, 2.6, 0, Math.PI * 2);
    ctx.fillStyle = "#ffcc00";
    ctx.fill();
  }
}

/** A self-contained globe: slow rotation, then a few sequential city-to-city routes. */
export function ConnectionGlobe() {
  const canvasRef = useRef(null);
  const startRef = useRef(performance.now());
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext("2d");
    let frame;
    let bounds = { width: 0, height: 0, dpr: 1 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      bounds = { width: rect.width, height: rect.height, dpr };
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now) => {
      const { width, height } = bounds;
      if (!width || !height) { frame = requestAnimationFrame(draw); return; }
      const elapsed = reduce ? 7200 : now - startRef.current;
      const sequence = reduce ? 7500 : elapsed % 15000;
      const centre = radians(22) + elapsed * 0.000035;
      const radius = Math.min(width, height) * 0.365;
      const cx = width * 0.5;
      const cy = height * 0.47;
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(cx, cy);

      const sea = context.createRadialGradient(-radius * 0.3, -radius * 0.42, radius * 0.08, 0, 0, radius * 1.1);
      sea.addColorStop(0, "#fbfeff");
      sea.addColorStop(0.48, "#e6f5fa");
      sea.addColorStop(1, "#abd8e7");
      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 2);
      context.fillStyle = sea;
      context.shadowColor = "rgba(28, 104, 137, 0.19)";
      context.shadowBlur = 28;
      context.fill();
      context.shadowBlur = 0;
      context.clip();

      context.strokeStyle = "rgba(76, 151, 178, 0.18)";
      context.lineWidth = 0.7;
      for (let lat = -60; lat <= 60; lat += 20) {
        const y = -Math.sin(radians(lat)) * radius;
        const half = Math.cos(radians(lat)) * radius;
        context.beginPath();
        context.ellipse(0, y, half, Math.max(2, half * 0.16), 0, 0, Math.PI * 2);
        context.stroke();
      }
      for (let lon = -75; lon <= 75; lon += 25) {
        const x = Math.sin(radians(lon)) * radius;
        const horizontal = Math.max(3, Math.cos(radians(lon)) * radius);
        context.beginPath();
        context.ellipse(x, 0, horizontal * 0.16, radius, 0, 0, Math.PI * 2);
        context.stroke();
      }

      context.fillStyle = "rgba(63, 135, 160, 0.60)";
      for (let lat = -52; lat <= 62; lat += 2.2) {
        for (let lng = -86; lng <= 136; lng += 2.2) {
          if (!isLand(lat, lng)) continue;
          const point = project(lat, lng, centre, radius);
          if (point.z < 0.02) continue;
          context.globalAlpha = 0.22 + point.z * 0.52;
          context.fillRect(point.x, point.y, 1.4, 1.4);
        }
      }
      context.globalAlpha = 1;

      const cityPoints = CITIES.map((city) => ({ ...city, ...project(city.lat, city.lng, centre, radius) }));
      const home = cityPoints[0];
      context.lineWidth = 1.15;
      context.lineCap = "round";
      cityPoints.slice(1).forEach((city, index) => {
        if (home.z < 0.04 || city.z < 0.04) return;
        const progress = clamp((sequence - (900 + index * 1800)) / 1100);
        context.globalAlpha = Math.min(home.z, city.z) * 0.88;
        drawCurve(context, home, city, progress, "#c89600");
      });
      context.globalAlpha = 1;

      cityPoints.forEach((city, index) => {
        if (city.z < 0.05) return;
        if (index !== 0 && sequence <= 900 + (index - 1) * 1800) return;
        context.globalAlpha = clamp((city.z - 0.05) / 0.35);
        context.beginPath();
        context.arc(city.x, city.y, city.primary ? 4.5 : 3.2, 0, Math.PI * 2);
        context.fillStyle = city.primary ? "#ffcc00" : "#b77f00";
        context.fill();
        context.strokeStyle = "rgba(255,255,255,.86)";
        context.lineWidth = 1.1;
        context.stroke();
        if (city.primary || sequence > 6000) {
          context.fillStyle = "rgba(7, 34, 72, .82)";
          context.font = "600 10px Inter, sans-serif";
          context.fillText(city.name.toUpperCase(), city.x + 7, city.y - 7);
        }
      });
      context.globalAlpha = 1;
      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 2);
      context.strokeStyle = "rgba(47, 127, 156, 0.38)";
      context.lineWidth = 1;
      context.stroke();
      context.restore();
      if (!reduce) frame = requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    frame = requestAnimationFrame(draw);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [reduce]);

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" aria-label="A rotating blue globe with fibre routes progressively connecting African cities" role="img" />
      {!reduce && (
        <button type="button" onClick={() => { startRef.current = performance.now(); }} className="absolute bottom-4 right-4 rounded-full border border-[#8bbeca]/70 bg-white/80 px-3 py-1.5 text-[10px] font-semibold text-signal shadow-sm backdrop-blur transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal">
          Replay network
        </button>
      )}
    </div>
  );
}

export default ConnectionGlobe;
