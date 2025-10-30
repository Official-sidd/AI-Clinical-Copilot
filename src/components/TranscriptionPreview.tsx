import { Card, CardContent, CardHeader, IconButton, Box, Typography } from '@mui/material';
import { Article, Close } from '@mui/icons-material';

export const TranscriptionPreview = () => {
  const sampleTranscript = `Doctor: Good morning! How are you feeling today?

Patient: Not great, doctor. I've had this cough for about three days now, and I've been running a slight fever.

Doctor: I see. Can you describe the cough for me? Is it dry or are you bringing up any phlegm?

Patient: It's mostly dry. Very irritating, especially at night.

Doctor: And the fever - have you taken your temperature?

Patient: Yes, it's been around 99 to 100 degrees.

Doctor: Any other symptoms? Shortness of breath, chest pain, body aches?

Patient: No chest pain or trouble breathing. Some mild body aches, but nothing too severe.

Doctor: Have you traveled recently or been around anyone who's been sick?

Patient: No recent travel, and I don't think so, but my coworker was out sick last week.`;

  return (
    <Card sx={{ bgcolor: 'background.paper', boxShadow: 2, height: 'calc(100vh - 12rem)' }}>
      <CardHeader 
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Article color="primary" />
              <span>Live Transcription</span>
            </Box>
            <IconButton size="small">
              <Close fontSize="small" />
            </IconButton>
          </Box>
        }
      />
      <CardContent>
        <Box 
          sx={{ 
            height: 'calc(100vh - 18rem)', 
            bgcolor: 'action.hover', 
            p: 2, 
            borderRadius: 2,
            overflowY: 'auto'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sampleTranscript.split('\n\n').map((paragraph, idx) => (
              <Typography 
                key={idx} 
                variant="body2" 
                sx={{ 
                  color: paragraph.startsWith('Doctor:') ? 'primary.main' : 'text.primary',
                  fontWeight: paragraph.startsWith('Doctor:') ? 600 : 400
                }}
              >
                {paragraph}
              </Typography>
            ))}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
              <Box 
                sx={{ 
                  width: 8, 
                  height: 8, 
                  bgcolor: 'primary.main', 
                  borderRadius: '50%',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }} 
              />
              <Typography variant="caption">Listening...</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
