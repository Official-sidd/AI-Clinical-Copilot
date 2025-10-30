import { ThemeProvider, createTheme, CssBaseline, Box, Container } from '@mui/material';
import { Navigation } from "@/components/Navigation";
import { AudioRecorder } from "@/components/AudioRecorder";
import { VitalsInput } from "@/components/VitalsInput";
import { FileUploader } from "@/components/FileUploader";
import { DoctorNotes } from "@/components/DoctorNotes";
import { AISummary } from "@/components/AISummary";
import { TranscriptionPreview } from "@/components/TranscriptionPreview";
import { Footer } from "@/components/Footer";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#e3f2fd',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

const Index = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navigation />
        
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
            {/* Left Panel - Main Interaction (2/3) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <AudioRecorder />
              <VitalsInput />
              <FileUploader />
              <DoctorNotes />
              <AISummary />
            </Box>
            
            {/* Right Panel - Preview (1/3) */}
            <Box sx={{ position: 'sticky', top: 96, height: 'fit-content' }}>
              <TranscriptionPreview />
            </Box>
          </Box>
        </Container>
        
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Index;
