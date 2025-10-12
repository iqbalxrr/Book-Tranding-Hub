
"use client";
import { useEffect, useState } from "react";

const LiveLocation = ({ locationName }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Your browser doesn't support location access.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setError("Location access denied or unavailable.");
      }
    );
  }, []);

  return (
    <div className="border border-gray-200 rounded-2xl shadow p-4 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-2 text-green-600">Live Location</h2>
      {userLocation && (
        <div className="space-y-2">
          {/* Optional Map iframe */}
          <div className="mt-3 rounded-xl overflow-hidden border">
            <iframe
              width="100%"
              height="280"
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${userLocation.lat},${userLocation.lon}&z=15&output=embed`}
            ></iframe>
          </div>
        </div>
      )}

      {locationName && (
        <p className="text-gray-500 text-sm mt-4">
          Book owner’s location: <strong>{locationName}</strong>
        </p>
      )}
    </div>
  );
};

export default LiveLocation;
