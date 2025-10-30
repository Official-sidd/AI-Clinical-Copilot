import { useState } from "react";
import { Card, CardContent, CardHeader, Button, Chip, Box, LinearProgress, Typography } from '@mui/material';
import { Mic, StopCircle, Upload, PlayArrow, Send } from '@mui/icons-material';

export const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setHasRecording(true);
  };

  const handleSendToAI = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <Card sx={{ bgcolor: 'background.paper', boxShadow: 2 }}>
      <CardHeader 
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Mic color="primary" />
              <span>Record or Upload Audio</span>
            </Box>
            {isRecording && (
              <Chip label="Recording..." color="error" size="small" />
            )}
          </Box>
        }
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {!isRecording ? (
            <>
              <Button 
                variant="contained" 
                startIcon={<Mic />}
                onClick={handleStartRecording}
                sx={{ flex: 1 }}
              >
                Start Recording
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<Upload />}
                sx={{ flex: 1 }}
              >
                Upload Audio
              </Button>
            </>
          ) : (
            <Button 
              variant="contained" 
              color="error"
              startIcon={<StopCircle />}
              onClick={handleStopRecording}
              sx={{ flex: 1 }}
            >
              Stop Recording
            </Button>
          )}
        </Box>

        {isRecording && (
          <Box sx={{ bgcolor: 'action.hover', p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 0.5, height: 64 }}>
              {[...Array(20)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 4,
                    bgcolor: 'primary.main',
                    borderRadius: 1,
                    height: `${Math.random() * 100}%`,
                    animation: 'pulse 1s ease-in-out infinite',
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </Box>
            <Box sx={{ textAlign: 'center', mt: 1, color: 'text.secondary', fontSize: 14 }}>
              Recording: {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
            </Box>
          </Box>
        )}

        {hasRecording && !isRecording && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>recording.wav</Typography>
                <Button variant="text" size="small" startIcon={<PlayArrow />}>
                  Play
                </Button>
              </Box>
              <LinearProgress variant="determinate" value={33} />
            </Box>
            
            {isProcessing ? (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
                  Processing audio...
                </Typography>
                <LinearProgress />
              </Box>
            ) : (
              <Button 
                onClick={handleSendToAI}
                variant="contained" 
                startIcon={<Send />}
                fullWidth
              >
                Send to AI
              </Button>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
