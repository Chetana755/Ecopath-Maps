import { Paper, InputBase, Box, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useRouteStore } from "../store/useRouteStore";
import { fetchGreenRoute } from "../api/greenRouteApi";
import type { Route } from "../store/useRouteStore";

export default function SearchBar() {
  const [expanded, setExpanded] = useState(false);

  const { from, to, setFrom, setTo, setRoutes, clearRoutes } = useRouteStore();

  const handleSearch = async () => {
    if (!from || !to) return;

    try {
      // 🔥 reset previous search
      clearRoutes();

      const data = await fetchGreenRoute(from, to);
      const searchId = Date.now();

      // normalize backend → frontend
      const normalizedRoutes: Route[] = data.alternative_routes.map(
        (route: any, index: number) => ({
          routeIndex: index,
          polyline: route.polyline.encodedPolyline,
          greenIndex: Number(route.greenIndex),
          aqi: Number(route.aqi),
          distanceMeters: Number(route.distanceMeters),
          duration: route.duration,
          shadeLabel: route.solar?.shadeLabel,
        })
      );

      // ✅ explanation stored separately
      setRoutes(normalizedRoutes, searchId, data.explanation);

      setExpanded(false);
    } catch (error) {
      console.error(error);
      alert("Failed to calculate green routes");
    }
  };

  return (
    <Paper
      sx={{
        position: "absolute",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        width: expanded ? 420 : 300,
        p: 1,
        zIndex: 1000,
      }}
    >
      {!expanded ? (
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => setExpanded(true)}
        >
          <SearchIcon sx={{ mx: 1 }} />
          <InputBase placeholder="Search Google Maps" fullWidth />
        </Box>
      ) : (
        <Box>
          <TextField
            fullWidth
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Button
            fullWidth
            variant="contained"
            disabled={!from || !to}
            onClick={handleSearch}
          >
            FIND GREEN ROUTE
          </Button>
        </Box>
      )}
    </Paper>
  );
}
