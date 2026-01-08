import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const forRentSignSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60" width="40" height="60">
  <!-- Post -->
  <rect x="17" y="28" width="6" height="32" fill="#8B4513" rx="1"/>
  <!-- Sign background -->
  <rect x="2" y="2" width="36" height="28" rx="3" fill="#DC2626" stroke="#B91C1C" stroke-width="1"/>
  <!-- FOR text -->
  <text x="20" y="14" font-family="Arial, sans-serif" font-size="7" font-weight="bold" fill="white" text-anchor="middle">FOR</text>
  <!-- RENT text -->
  <text x="20" y="24" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="white" text-anchor="middle">RENT</text>
</svg>
`;

const forRentIcon = L.divIcon({
  html: `<div class="marker-bounce">${forRentSignSvg}</div>`,
  className: "for-rent-marker",
  iconSize: [40, 60],
  iconAnchor: [20, 60],
});

const markerCoordinates: [number, number][] = [
  [40.7128, -74.0060],
  [40.7135, -74.0050],
  [40.7110, -74.0080],
  [40.7150, -74.0090],
  [40.7145, -74.0040],
  [40.7100, -74.0055],
  [40.7160, -74.0070],
  [40.7120, -74.0095],
];

export function HeroMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [40.7128, -74.0060],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    markerCoordinates.forEach((coords, index) => {
      setTimeout(() => {
        L.marker(coords, { icon: forRentIcon }).addTo(map);
      }, index * 150);
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <div ref={mapRef} className="w-full h-full" />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0) 100%)"
        }}
      />
    </div>
  );
}
