"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const EventMap = ({ events, darkMode }) => {
  const [mapCenter] = useState([60.1699, 24.9384]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const newMarkers = [];
      for (const event of events) {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              event.location
            )}&limit=1`
          );
          if (response.data.length > 0) {
            newMarkers.push({
              id: event.id,
              title: event.title,
              position: [
                parseFloat(response.data[0].lat),
                parseFloat(response.data[0].lon),
              ],
              location: event.location,
            });
          }
        } catch (error) {
          console.error("Geocoding error:", error);
        }
      }
      setMarkers(newMarkers);
    };

    if (events.length > 0) fetchCoordinates();
  }, [events]);

  const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div
      className={`rounded-2xl shadow-lg overflow-hidden ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <MapContainer
        center={mapCenter}
        zoom={10}
        className="h-[600px] rounded-2xl z-0"
        attributionControl={false}
      >
        <TileLayer
          url={
            darkMode
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />

        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position} icon={customIcon}>
            <Popup>
              <div className="font-bold">{marker.title}</div>
              <div>{marker.location}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default EventMap;
