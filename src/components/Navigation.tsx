import { AppBar, Toolbar, Typography, Button, Avatar, IconButton, Box } from '@mui/material';
import { LocalHospital, Settings, Add } from '@mui/icons-material';

const Navigation = () => {
  return (
    <AppBar position="sticky" sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ bgcolor: 'primary.light', p: 1, borderRadius: 2 }}>
            <LocalHospital sx={{ color: 'primary.main', fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
              AI Clinical Copilot
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Streamline your documentation
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button variant="contained" startIcon={<Add />}>
            New Consultation
          </Button>
          <IconButton>
            <Settings />
          </IconButton>
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=doctor" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export { Navigation };
