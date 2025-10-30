import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
} from "@mui/material";
import { Navigation } from "@/components/Navigation";
import { AudioRecorder } from "@/components/AudioRecorder";
import { VitalsInput } from "@/components/VitalsInput";
import { FileUploader } from "@/components/FileUploader";
import { DoctorNotes } from "@/components/DoctorNotes";
import { AISummary } from "@/components/AISummary";
import { TranscriptionPreview } from "@/components/TranscriptionPreview";
import { Footer } from "@/components/Footer";
import SplashScreen from "../components/ui/SplashScreen";
import { useState, useMemo } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [themeLocked, setThemeLocked] = useState(false);
  const [summaryApproved, setSummaryApproved] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: darkMode ? "#90caf9" : "#1976d2",
          },
          background: {
            default: darkMode ? "#0d1117" : "#f5f7fa",
            paper: darkMode ? "#161b22" : "#ffffff",
          },
        },
        typography: {
          fontFamily: "Inter, system-ui, sans-serif",
        },
        shape: { borderRadius: 8 },
      }),
    [darkMode]
  );

  const handleThemeToggle = () => {
    if (!darkMode) {
      setDarkMode(true);
      setThemeLocked(true);
      toast.dismiss();
      // toast("Once you go black, you can’t go back", {
      //   position: "top-center",
      //   autoClose: 3000,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   hideProgressBar: false,
      //   draggable: true,
      //   transition: Slide,
      //   theme: "dark",
      // });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading && <SplashScreen onFinish={() => setLoading(false)} />}
      <ToastContainer
        position="top-center"
        closeOnClick
        pauseOnHover={false}
        draggable
      />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Navigation
          darkMode={darkMode}
          onToggleTheme={handleThemeToggle}
          themeLocked={themeLocked}
        />

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
              gap: 3,
            }}
          >
            {/* Left Panel */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <AudioRecorder />
              <VitalsInput />
              <FileUploader />
              <DoctorNotes />
              <AISummary onApproveChange={setSummaryApproved} />
            </Box>

            {/* Right Panel */}
            <Box sx={{ position: "sticky", top: 96, height: "fit-content" }}>
              <TranscriptionPreview />
            </Box>
          </Box>
        </Container>

        <Footer isSummaryApproved={summaryApproved} />
      </Box>
    </ThemeProvider>
  );
};

export default Index;
