import React, { useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Tooltip, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { statusMeta } from "@/data/coverageStatus";

const ZIM_CENTER = [-18.6, 29.6];

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
    <div className={className || "relative h-full w-full overflow-hidden"}>
      <MapContainer
        center={ZIM_CENTER}
        zoom={6}
        zoomControl={false}
        scrollWheelZoom
        className="absolute inset-0"
        style={{ height: "100%", width: "100%", background: "#ECEFF4" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          subdomains="abcd"
          maxZoom={20}
        />
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
                <div className="text-xs text-ink-soft">{meta.label}</div>
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