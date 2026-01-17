import { Paper, Typography, Box } from "@mui/material";
import { useRouteStore } from "../store/useRouteStore";

/* Color dot based on Green Index ranking */
function getDotColor(rank: number, total: number) {
  if (rank === 0) return "#2e7d32"; // Best
  if (rank === total - 1) return "#c62828"; // Worst
  return "#f9a825"; // Middle
}

/* AQI label */
function getAQILabel(aqi: number) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Poor";
  return "Very Poor";
}

/* Convert duration string (e.g. "1542s") → minutes */
function durationToMinutes(duration: string) {
  const seconds = parseInt(duration.replace("s", ""), 10);
  return Math.round(seconds / 60);
}

export default function AlternativeRoutesList() {
  const {
    routes,
    hasRoute,
    selectedRouteIndex,
    selectRoute,
  } = useRouteStore();

  if (!hasRoute || routes.length <= 1) return null;

  // Sort routes by Green Index (best → worst)
  const rankedRoutes = [...routes].sort(
    (a, b) => b.greenIndex - a.greenIndex
  );

  // Remove recommended route (best one)
  const alternativeRoutes = rankedRoutes.slice(1);

  return (
    <Paper
      elevation={3}
      sx={{
        position: "absolute",
        bottom: 100,
        right: 20,
        width: 280,
        p: 2,
        borderRadius: 2,
        zIndex: 1000,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        Alternative Routes
      </Typography>

      {alternativeRoutes.map((route, index) => {
        const rank = index + 1;
        const isSelected =
          route.routeIndex === selectedRouteIndex;

        return (
          <Box
            key={route.routeIndex}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              mt: 1.5,
              p: 1,
              borderRadius: 1,
              cursor: "pointer",
              backgroundColor: isSelected
                ? "#f0f0f0"
                : "transparent",
            }}
            onClick={() => selectRoute(route.routeIndex)}
          >
            {/* Color Dot */}
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: getDotColor(
                  rank,
                  rankedRoutes.length
                ),
                mt: "5px",
              }}
            />

            <Box>
              <Typography variant="body2">
                Route {route.routeIndex + 1}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Distance:{" "}
                {(route.distanceMeters / 1000).toFixed(2)} km
              </Typography>
              <br />

              {route.duration && (
                <>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Time: {durationToMinutes(route.duration)} min
                  </Typography>
                  <br />
                </>
              )}

              {/* ✅ AQI DISPLAY */}
              <Typography variant="caption">
                AQI: {route.aqi} ({getAQILabel(route.aqi)})
              </Typography>
              <br />

             
            </Box>
          </Box>
        );
      })}
    </Paper>
  );
}
