"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix default marker icons in Next/webpack environments
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Ensure all markers use the default icon
L.Marker.prototype.options.icon = DefaultIcon;

export type MapPlace = {
  name: string;
  category: string;
  town: string;
  short: string;
  lat: number;
  lng: number;
  website?: string;
  directionsUrl?: string;
};

export default function PlacesMap({
  places,
  center = { lat: 37.565, lng: -86.3 },
  zoom = 10,
  height = 520,
}: {
  places: MapPlace[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: number;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        scrollWheelZoom
        style={{ height, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map((p) => (
          <Marker key={`${p.name}-${p.lat}-${p.lng}`} position={[p.lat, p.lng]}>
            <Popup>
              <div style={{ minWidth: 220 }}>
                <div style={{ fontWeight: 700, marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: 12, opacity: 0.75 }}>
                  {p.category} • {p.town}
                </div>

                <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.35 }}>
                  {p.short}
                </div>

                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  {p.directionsUrl ? (
                    <a
                      href={p.directionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontSize: 12,
                        padding: "6px 10px",
                        borderRadius: 10,
                        background: "#111827",
                        color: "white",
                        textDecoration: "none",
                      }}
                    >
                      Directions
                    </a>
                  ) : null}

                  {p.website ? (
                    <a
                      href={p.website}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontSize: 12,
                        padding: "6px 10px",
                        borderRadius: 10,
                        border: "1px solid #e5e7eb",
                        textDecoration: "none",
                        color: "#111827",
                        background: "white",
                      }}
                    >
                      Website
                    </a>
                  ) : null}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
