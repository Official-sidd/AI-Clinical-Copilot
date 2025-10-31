import { AppBar, Toolbar, Typography, Switch, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Navigation = ({ darkMode, onToggleTheme, themeLocked }) => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: darkMode ? "#161b22" : "#1976d2",
        color: darkMode ? "#e0e0e0" : "#fff",
      }}
    >
      <Toolbar>
        <Typography
          onClick={() => {
            // toast.error("Yaha kuch nahi hoga, chala ja ghar!");
            window.location.href = "/";
          }}
          variant="h6"
          sx={{
            flexGrow: 1,
            cursor: "pointer",
          }}
        >
          AI Clinical Copilot
        </Typography>

        {!themeLocked && (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2">
              {darkMode ? "Dark" : "Light"} Mode
            </Typography>
            <Switch
              checked={darkMode}
              onChange={onToggleTheme}
              color="default"
            />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
