import { Paper, Typography } from "@mui/material";
import { useRouteStore } from "../store/useRouteStore";

/* Health label from Green Index */
function getHealthLabel(greenIndex: number) {
  if (greenIndex >= 120) return "Excellent";
  if (greenIndex >= 80) return "Good";
  return "Moderate";
}

/* AQI category (judge-friendly) */
function getAQILabel(aqi: number) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Poor";
  return "Unhealthy";
}

/* 🔥 Convert duration string (e.g. "1542s") → minutes */
function durationToMinutes(duration: string) {
  const seconds = parseInt(duration.replace("s", ""), 10);
  return Math.round(seconds / 60);
}

export default function SelectedRouteCard() {
  const { routes, hasRoute } = useRouteStore();

  if (!hasRoute || routes.length === 0) return null;

  // ✅ Always pick BEST route by Green Index
  const bestRoute = routes.reduce((best, curr) =>
    curr.greenIndex > best.greenIndex ? curr : best
  );

  return (
    <Paper
      elevation={3}
      sx={{
        position: "absolute",
        top: 90,
        left: 20,
        width: 280,
        p: 2,
        borderRadius: 2,
        zIndex: 1000,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        🌿 Recommended Route
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        Distance: {(bestRoute.distanceMeters / 1000).toFixed(2)} km
      </Typography>

      {bestRoute.duration && (
        <Typography variant="body2">
          Time: {durationToMinutes(bestRoute.duration)} min
        </Typography>
      )}

      {/* ✅ AQI DISPLAY */}
      <Typography variant="body2">
        AQI: <b>{bestRoute.aqi}</b> ({getAQILabel(bestRoute.aqi)})
      </Typography>

      

      <Typography variant="body2">
        Overall Health:{" "}
        <b>{getHealthLabel(bestRoute.greenIndex)}</b>
      </Typography>
    </Paper>
  );
}
