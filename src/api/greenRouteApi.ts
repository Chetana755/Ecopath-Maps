// src/api/greenRouteApi.ts

export interface BackendRoute {
  routeIndex: number;
  distanceMeters: number;
  duration: string;
  aqi: number;
  greenIndex: number;
  solar?: {
    solarIndex: number;
    shadeLabel: string;
  };
  polyline: {
    encodedPolyline: string;
  };
}

export interface GreenRouteResponse {
  message: string;
  selected_route: BackendRoute;
  alternative_routes: BackendRoute[];
  explanation: string;
}

export async function fetchGreenRoute(
  origin: string,
  destination: string
): Promise<GreenRouteResponse> {
  const response = await fetch(
    "http://localhost:5000/get-green-route", // ✅ CORRECT PORT
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin,
        destination,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch green route: ${errorText}`);
  }

  return response.json();
}
