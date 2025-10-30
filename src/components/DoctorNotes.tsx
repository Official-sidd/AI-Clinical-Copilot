import { useState } from 'react';
import { Card, CardContent, CardHeader, Tabs, Tab, TextField, Box, Typography } from '@mui/material';
import { Description } from '@mui/icons-material';

const noteTemplates = {
  soap: `Subjective:\n\nObjective:\n\nAssessment:\n\nPlan:`,
  dap: `Data:\n\nAssessment:\n\nPlan:`,
  birp: `Behavior:\n\nIntervention:\n\nResponse:\n\nPlan:`
};

export const DoctorNotes = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [notes, setNotes] = useState({
    soap: noteTemplates.soap,
    dap: noteTemplates.dap,
    birp: noteTemplates.birp
  });

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleNoteChange = (format: 'soap' | 'dap' | 'birp') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes({ ...notes, [format]: e.target.value });
  };

  const getCurrentFormat = () => {
    const formats: Array<'soap' | 'dap' | 'birp'> = ['soap', 'dap', 'birp'];
    return formats[activeTab];
  };

  return (
    <Card sx={{ bgcolor: 'background.paper', boxShadow: 2 }}>
      <CardHeader 
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Description color="primary" />
            <span>Additional Notes for AI</span>
          </Box>
        }
      />
      <CardContent>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="SOAP Format" />
          <Tab label="DAP Format" />
          <Tab label="BIRP Format" />
        </Tabs>
        
        <TextField
          fullWidth
          multiline
          rows={8}
          value={notes[getCurrentFormat()]}
          onChange={handleNoteChange(getCurrentFormat())}
          placeholder="Enter your notes following the selected format..."
          variant="outlined"
        />
        
        <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'text.secondary' }}>
          {activeTab === 0 && 'SOAP: Subjective, Objective, Assessment, Plan'}
          {activeTab === 1 && 'DAP: Data, Assessment, Plan'}
          {activeTab === 2 && 'BIRP: Behavior, Intervention, Response, Plan'}
        </Typography>
      </CardContent>
    </Card>
  );
};
