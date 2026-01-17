import { create } from "zustand";

/* ---------- Route Model ---------- */
export interface Route {
  routeIndex: number;
  polyline: string;
  greenIndex: number;
  aqi: number;
  distanceMeters: number;
  duration?: string;
  shadeLabel?: string;
}

/* ---------- Store State ---------- */
interface RouteState {
  from: string;
  to: string;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;

  routes: Route[];
  hasRoute: boolean;
  selectedRouteIndex: number | null;

  explanation: string | null;
  searchId: number | null;

  /* ✅ mapType as STRING (SAFE) */
  mapType: "roadmap" | "satellite";
  setMapType: (type: "roadmap" | "satellite") => void;

  setRoutes: (
    routes: Route[],
    searchId: number,
    explanation?: string | null
  ) => void;

  clearRoutes: () => void;
  selectRoute: (index: number) => void;
}

/* ---------- Store ---------- */
export const useRouteStore = create<RouteState>((set) => ({
  from: "",
  to: "",
  setFrom: (from) => set({ from }),
  setTo: (to) => set({ to }),

  routes: [],
  hasRoute: false,
  selectedRouteIndex: null,
  explanation: null,
  searchId: null,

  /* ✅ SAFE default */
  mapType: "roadmap",
  setMapType: (type) => set({ mapType: type }),

  setRoutes: (routes, searchId, explanation = null) => {
    let bestRouteIndex: number | null = null;

    if (routes.length > 0) {
      const bestRoute = routes.reduce((a, b) =>
        b.greenIndex > a.greenIndex ? b : a
      );
      bestRouteIndex = bestRoute.routeIndex;
    }

    set({
      routes,
      hasRoute: routes.length > 0,
      selectedRouteIndex: bestRouteIndex,
      explanation,
      searchId,
    });
  },

  clearRoutes: () =>
    set({
      routes: [],
      hasRoute: false,
      selectedRouteIndex: null,
      explanation: null,
      searchId: null,
    }),

  selectRoute: (index) => set({ selectedRouteIndex: index }),
}));