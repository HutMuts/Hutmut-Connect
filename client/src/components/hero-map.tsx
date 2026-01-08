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
  [28.5383, -81.3792],  // Downtown Orlando
  [28.5950, -81.3000],  // Winter Park
  [28.4700, -81.4500],  // Dr. Phillips
  [28.6200, -81.2000],  // UCF area
  [28.4200, -81.3000],  // Kissimmee
  [28.5600, -81.5200],  // Ocoee
  [28.6800, -81.3500],  // Altamonte Springs
  [28.5000, -81.2200],  // East Orlando
];

export function HeroMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [28.5383, -81.3792],  // Orlando, FL
      zoom: 10,
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
