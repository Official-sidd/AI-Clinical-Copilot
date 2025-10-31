import { Box, CircularProgress, Typography } from "@mui/material";

export const Loader = ({ message = "Loading...", fullscreen = false }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: fullscreen ? "100vh" : "200px",
        width: "100%",
        bgcolor: fullscreen ? "background.default" : "transparent",
        position: fullscreen ? "fixed" : "relative",
        top: 0,
        left: 0,
        zIndex: fullscreen ? 9999 : "auto",
      }}
    >
      <CircularProgress size={48} thickness={4} />
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mt: 2, fontWeight: 500 }}
      >
        {message}
      </Typography>
    </Box>
  );
};
