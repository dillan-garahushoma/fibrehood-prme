import React, { useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Tooltip, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { statusMeta } from "@/data/coverageStatus";

const ZIM_CENTER = [-18.6, 29.6];

// NOTE — tile source: the previous Carto Voyager URL (basemaps.cartocdn.com)
// now requires an API key; Carto deprecated anonymous access to it. This uses
// Esri's keyless "World Light Gray Base" layer as an interim default so the
// map isn't broken in the meantime — it's free for reasonable traffic without
// signup, but check Esri's terms before high-volume production use, or swap
// back to Carto/Stadia/MapTiler with a real key when you have one. The
// `.fh-coverage-map` filter below desaturates whichever tile source is used,
// so this stays a quiet backdrop rather than competing with signal/loop.
const TILE_URL = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}";
const TILE_ATTRIBUTION = "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ";

// Custom HTML markers (avoid Leaflet's broken default icon asset paths).
const locationIcon = L.divIcon({
  className: "",
  html: `<div style="position:relative;width:22px;height:22px;">
    <span style="position:absolute;inset:0;border-radius:9999px;background:rgba(255,204,0,0.35);animation:fhPulse 1.8s ease-out infinite;"></span>
    <span style="position:absolute;left:7px;top:7px;width:8px;height:8px;border-radius:9999px;background:#FFCC00;box-shadow:0 0 0 3px #072248,0 0 10px rgba(255,204,0,0.8);"></span>
  </div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11]
});

function MapController({ flyTarget, onReady }) {
  const map = useMap();
  useEffect(() => {
    onReady?.(map);
  }, [map, onReady]);

  useEffect(() => {
    if (!flyTarget?.nonce) return;
    map.flyTo([flyTarget.lat, flyTarget.lng], flyTarget.zoom ?? 14, { duration: 1.3, easeLinearity: 0.25 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flyTarget?.nonce]);

  return null;
}

export function CoverageMap({ areas, activeAreaId, flyTarget, marker, onReady, onAreaHover, onAreaLeave, onAreaClick, className, children }) {
  return (
    <div className={`fh-coverage-map isolate ${className || "relative h-full w-full overflow-hidden"}`}>
      {/* Scoped so it only ever touches this map's own tiles, never a future
          second map elsewhere in the app. */}
      <style>{`
        .fh-coverage-map .leaflet-tile-pane {
          filter: grayscale(38%) brightness(1.08) contrast(0.95) saturate(0.7);
        }
      `}</style>
      <MapContainer
        center={ZIM_CENTER}
        zoom={6}
        zoomControl={false}
        scrollWheelZoom
        className="absolute inset-0"
        style={{ height: "100%", width: "100%", background: "#ECEFF4" }}
      >
        <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} maxZoom={16} />
        <ZoomControl position="topright" />
        <MapController flyTarget={flyTarget} onReady={onReady} />

        {areas.map((a) => {
          const active = activeAreaId === a.id;
          const meta = statusMeta(a.status);
          return (
            <Polygon
              key={a.id}
              positions={a.polygon}
              pathOptions={{
                color: active ? "#072248" : meta.mapColor,
                weight: active ? 3 : 1.5,
                fillColor: meta.mapColor,
                fillOpacity: active ? 0.42 : 0.2
              }}
              eventHandlers={{
                mouseover: () => onAreaHover?.(a.id),
                mouseout: () => onAreaLeave?.(a.id),
                click: () => onAreaClick?.(a)
              }}
            >
              <Tooltip sticky direction="top">
                <div className="font-semibold text-signal">{a.name}</div>
                <div className="text-xs text-ink-soft">Indicative area · {meta.label}</div>
              </Tooltip>
            </Polygon>
          );
        })}

        {marker && <Marker position={[marker.lat, marker.lng]} icon={locationIcon} />}
      </MapContainer>

      {children}
    </div>
  );
}

export default CoverageMap;