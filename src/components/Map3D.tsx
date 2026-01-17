import {
  GoogleMap,
  Polyline,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import polyline from "@mapbox/polyline";
import { useRouteStore } from "../store/useRouteStore";
import { useEffect, useMemo, useRef, useState } from "react";

const center = { lat: 12.9716, lng: 77.5946 };

/* 🟢🟡🔴 COLOR BY GREEN INDEX RANKING */
function getRouteColor(rank: number, total: number) {
  if (rank === 0) return "#2e7d32"; // Best
  if (rank === total - 1) return "#c62828"; // Worst
  return "#f9a825"; // Middle
}

export default function Map3D() {
  const mapRef = useRef<google.maps.Map | null>(null);

  const [info, setInfo] = useState<{
    routeIndex: number;
    position: { lat: number; lng: number };
  } | null>(null);

  const {
    routes,
    hasRoute,
    searchId,
    selectedRouteIndex,
    selectRoute,
    mapType, // roadmap | satellite
  } = useRouteStore();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  /* 🔄 Reset info window on new search */
  useEffect(() => {
    setInfo(null);
  }, [searchId]);

  /* 🔢 Rank routes by Green Index */
  const rankedRoutes = useMemo(() => {
    return [...routes].sort((a, b) => b.greenIndex - a.greenIndex);
  }, [routes]);

  /* 🧭 Decode polylines */
  const decodedRoutes = useMemo(() => {
    return rankedRoutes
      .filter((r) => r.polyline)
      .map((route) => {
        const decoded = polyline.decode(route.polyline);
        const path = decoded.map(([lat, lng]) => ({ lat, lng }));
        return { ...route, path };
      });
  }, [rankedRoutes]);

  /* 🔍 Fit bounds + ENABLE 3D */
  useEffect(() => {
    if (!mapRef.current || decodedRoutes.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    decodedRoutes.forEach((route) =>
      route.path.forEach((point) => bounds.extend(point))
    );

    mapRef.current.fitBounds(bounds);

    // 🔥 ENABLE 3D WHEN POSSIBLE
    window.setTimeout(() => {
      mapRef.current?.setTilt(67);
      mapRef.current?.setHeading(0);
    }, 500);
  }, [decodedRoutes]);

  if (!isLoaded) return <p>Loading map…</p>;

  return (
    <GoogleMap
      key={searchId ?? "initial"}
      onLoad={(map) => {
        mapRef.current = map;
        map.setTilt(67); // 🔥 FORCE 3D
      }}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={center}
      zoom={17} // 🔥 3D works best at high zoom
      options={{
        mapTypeId: mapType,
        tilt: 67,
        heading: 0,
        mapTypeControl: false,
        streetViewControl: true,
        fullscreenControl: false,
      }}
    >
      {/* ROUTES */}
      {hasRoute &&
        decodedRoutes.map((route, rank) => {
          const isSelected = route.routeIndex === selectedRouteIndex;

          return (
            <Polyline
              key={`${searchId}-${route.routeIndex}`}
              path={route.path}
              options={{
                strokeColor: getRouteColor(rank, decodedRoutes.length),
                strokeWeight: isSelected ? 8 : 4,
                strokeOpacity: isSelected ? 1 : 0.4,
                zIndex: isSelected ? 10 : 1,
              }}
              onClick={() => {
                selectRoute(route.routeIndex);
                setInfo({
                  routeIndex: route.routeIndex,
                  position: route.path[Math.floor(route.path.length / 2)],
                });
              }}
            />
          );
        })}

      {/* INFO WINDOW */}
      {info && (
        <InfoWindow position={info.position} onCloseClick={() => setInfo(null)}>
          <div>
            <strong>Route {info.routeIndex + 1}</strong>
            <div>
              🌿 Green Index:{" "}
              {routes.find((r) => r.routeIndex === info.routeIndex)?.greenIndex}
            </div>
          </div>
        </InfoWindow>
      )}

      {/* START & END */}
      {decodedRoutes.length > 0 && (
        <>
          <Marker label="S" position={decodedRoutes[0].path[0]} />
          <Marker
            label="D"
            position={decodedRoutes[0].path[decodedRoutes[0].path.length - 1]}
          />
        </>
      )}
    </GoogleMap>
  );
}
