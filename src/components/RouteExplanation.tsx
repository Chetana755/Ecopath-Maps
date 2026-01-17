import { Paper, Typography } from "@mui/material";
import { useRouteStore } from "../store/useRouteStore";

export default function RouteExplanation() {
  const { explanation, hasRoute } = useRouteStore();

  // 🚫 Nothing searched yet
  if (!hasRoute || !explanation) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: 500,
        p: 2,
        borderRadius: 2,
        zIndex: 1000,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        Why this route?
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        {explanation}
      </Typography>
    </Paper>
  );
}
