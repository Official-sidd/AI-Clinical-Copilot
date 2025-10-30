import { AppBar, Toolbar, Typography, Switch, Box } from "@mui/material";

export const Navigation = ({ darkMode, onToggleTheme, themeLocked }) => {
  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: darkMode ? "#161b22" : "#1976d2",
        color: darkMode ? "#e0e0e0" : "#fff",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
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
