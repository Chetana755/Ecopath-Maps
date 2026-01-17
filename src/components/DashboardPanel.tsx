import { Drawer, Typography, Box, Button, Divider } from "@mui/material";
import { useRouteStore } from "../store/useRouteStore";

export default function DashboardPanel({ open, onClose }: any) {
  const { mapType, setMapType } = useRouteStore();

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 260, p: 2 }}>
        <Typography variant="h6">Map Settings</Typography>
        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Map View
        </Typography>

        <Button
          fullWidth
          variant={mapType === "roadmap" ? "contained" : "outlined"}
          sx={{ mb: 1 }}
          onClick={() => setMapType("roadmap")}
        >
          🗺 Map View
        </Button>

        <Button
          fullWidth
          variant={mapType === "satellite" ? "contained" : "outlined"}
          onClick={() => setMapType("satellite")}
        >
          🛰 Satellite View
        </Button>
      </Box>
    </Drawer>
  );
}
