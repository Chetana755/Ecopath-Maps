import { useState } from "react";
import Map3D from "./components/Map3D";
import AuthButtons from "./components/AuthButtons";
import HamburgerMenu from "./components/HamburgerMenu";
import DashboardPanel from "./components/DashboardPanel";
import SearchBar from "./components/SearchBar";

// 🔥 NEW COMPONENTS
import SelectedRouteCard from "./components/SelectedRouteCard";
import RouteExplanation from "./components/RouteExplanation";
import AlternativeRoutesList from "./components/AlternativeRoutesList";
import Legend from "./components/Legend";

export default function App() {
  const [openDashboard, setOpenDashboard] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* MAP ALWAYS LOADS */}
      <Map3D />

      {/* TOP UI */}
      <HamburgerMenu onClick={() => setOpenDashboard(true)} />
      <SearchBar />
      <AuthButtons />

      {/* ROUTE INSIGHTS */}
      <SelectedRouteCard />
      <RouteExplanation />
      <AlternativeRoutesList />
      <Legend />

      {/* SIDE DASHBOARD */}
      <DashboardPanel
        open={openDashboard}
        onClose={() => setOpenDashboard(false)}
      />
    </div>
  );
}
