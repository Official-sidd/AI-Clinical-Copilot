import { Box, Button, Typography, Container } from '@mui/material';
import { Save, Warning } from '@mui/icons-material';

export const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper', 
        borderTop: 1, 
        borderColor: 'divider',
        mt: 4,
        py: 2
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Warning color="warning" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              For demo only — all data is synthetic and anonymized
            </Typography>
          </Box>
          <Button variant="contained" size="large" startIcon={<Save />}>
            Save to EHR
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
