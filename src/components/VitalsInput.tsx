import { useState } from 'react';
import { Card, CardContent, CardHeader, TextField, IconButton, Box } from '@mui/material';
import { Favorite, Thermostat, WaterDrop, MonitorHeart, Edit, Save, Close } from '@mui/icons-material';

export const VitalsInput = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [vitals, setVitals] = useState({
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    oxygenLevel: ''
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setVitals({ ...vitals, [field]: e.target.value });
  };

  return (
    <Card sx={{ bgcolor: 'background.paper', boxShadow: 2 }}>
      <CardHeader 
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MonitorHeart color="primary" />
              <span>Patient Vitals</span>
            </Box>
            {!isEditing ? (
              <IconButton color="primary" onClick={() => setIsEditing(true)} size="small">
                <Edit />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton color="primary" onClick={() => setIsEditing(false)} size="small">
                  <Save />
                </IconButton>
                <IconButton color="error" onClick={() => setIsEditing(false)} size="small">
                  <Close />
                </IconButton>
              </Box>
            )}
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
          <TextField
            fullWidth
            label="Temperature (°F)"
            type="number"
            value={vitals.temperature}
            onChange={handleChange('temperature')}
            disabled={!isEditing}
            placeholder="98.6"
            InputProps={{
              startAdornment: <Thermostat color="primary" sx={{ mr: 1 }} />
            }}
          />
          
          <TextField
            fullWidth
            label="Blood Pressure"
            value={vitals.bloodPressure}
            onChange={handleChange('bloodPressure')}
            disabled={!isEditing}
            placeholder="120/80"
            InputProps={{
              startAdornment: <MonitorHeart color="primary" sx={{ mr: 1 }} />
            }}
          />
          
          <TextField
            fullWidth
            label="Heart Rate (bpm)"
            type="number"
            value={vitals.heartRate}
            onChange={handleChange('heartRate')}
            disabled={!isEditing}
            placeholder="72"
            InputProps={{
              startAdornment: <Favorite color="primary" sx={{ mr: 1 }} />
            }}
          />
          
          <TextField
            fullWidth
            label="Oxygen Level (%)"
            type="number"
            value={vitals.oxygenLevel}
            onChange={handleChange('oxygenLevel')}
            disabled={!isEditing}
            placeholder="98"
            InputProps={{
              startAdornment: <WaterDrop color="primary" sx={{ mr: 1 }} />
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
