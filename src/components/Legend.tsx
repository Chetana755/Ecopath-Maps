import { Paper, Box, Typography } from "@mui/material";

export default function Legend() {
  return (
    <Paper
      elevation={2}
      sx={{
        position: "absolute",
        bottom: 20,
        left: 20,
        p: 1.5,
        borderRadius: 2,
        zIndex: 500, // 👈 lower than buttons
      }}
    >
      <Typography variant="caption" fontWeight="bold">
        Route Legend
      </Typography>

      <Box sx={{ mt: 1 }}>
        <Typography variant="caption">
          <span style={{ color: "#2e7d32" }}>■</span> Healthiest
        </Typography>
        <br />
        <Typography variant="caption">
          <span style={{ color: "#f9a825" }}>■</span> Alternative
        </Typography>
        <br />
        <Typography variant="caption">
          <span style={{ color: "#c62828" }}>■</span> Least Healthy
        </Typography>
      </Box>
    </Paper>
  );
}
