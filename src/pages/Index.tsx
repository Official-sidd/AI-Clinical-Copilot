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
import { useState, useMemo, useEffect } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sampleData from "../data/transcript.json";
import { fetchTranscript } from "../utils/api";
import { Loader } from "@/components/ui/Loader";
import { set } from "date-fns";
import { DoctorNotesSection } from "@/components/DoctorNotesSection";
import { ProbablePrescription } from "@/components/ProbablePrescription";
import { EditablePrescriptionSection } from "@/components/EditablePrescriptionSection";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [loadingTranscript, setLoadingTranscript] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [themeLocked, setThemeLocked] = useState(false);
  const [summaryApproved, setSummaryApproved] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [transcriptData, setTranscriptData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [mediCodes, setMediCodes] = useState();
  const [notes, setNotes] = useState({
    SOAP: { S: "", O: "", A: "", P: "" },
    DAP: { D: "", A: "", P: "" },
    BIRP: { B: "", I: "", R: "", P: "" },
  });
  const [showFallback, setShowFallback] = useState(false);

  const notesData = {
    BIRP: {
      B: "Patient reports having a headache for the past three days, primarily around the temples and sometimes at the back of the head...",
      I: "Not discussed.",
      R: "Patient expressed that the headache is bothersome but not unbearable.",
      P: "Follow-up to assess headache management and consider further evaluation if symptoms persist.",
    },
    DAP: {
      D: "Not discussed",
      A: "Patient reports having a headache for the past three days...",
      P: "Not discussed",
    },
    SOAP: {
      S: "Patient reports having a headache for the past three days...",
      O: "Not discussed.",
      A: "Headache, likely tension-type due to prolonged screen time and stress.",
      P: "Recommend reducing screen time, taking regular breaks, and practicing relaxation techniques.",
    },
  };

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
    }
  };

  const handleAudioReady = (file) => {
    setAudioFile(file);
  };

  const handleSendToAI = async (file) => {
    if (!file) {
      console.error("No audio blob found");
      return;
    }
    try {
      setLoadingTranscript(true);
      const result = await fetchTranscript(file);
      console.log("Transcription result:", result);
      setTranscriptData(result);
      setSummary(result.summary);
      console.log("notes data", result.notes);
      setNotes(result.notes);
      setMediCodes(result.medical_codes);
      setLoadingTranscript(true);
    } catch (err) {
      console.error("Transcription failed:", err);
      setShowFallback(true);
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
              <AudioRecorder
                onAudioReady={handleAudioReady}
                onSendToAI={handleSendToAI}
              />{" "}
              {/* ✅ pass setter */}
              <VitalsInput />
              <FileUploader />
              <DoctorNotesSection
                notes={notes}
                onSave={(updated) => console.log("Updated Notes:", updated)}
                setSummary={setSummary}
                setMediCodes={setMediCodes}
              />
              <AISummary
                onApproveChange={setSummaryApproved}
                summary={summary}
                medical_codes={mediCodes}
              />
              <EditablePrescriptionSection
                prescriptions={[
                  {
                    name: "Paracetamol 500mg",
                    dosage: "1 tablet",
                    frequency: "Twice a day",
                    duration: "5 days",
                  },
                  {
                    name: "Ibuprofen 400mg",
                    dosage: "1 tablet",
                    frequency: "After meals",
                    duration: "3 days",
                  },
                ]}
                onSave={(updated) =>
                  console.log("Saved prescriptions:", updated)
                }
              />
              {/* <ProbablePrescription prescriptions={transcriptData?.prescriptions || []} /> */}
            </Box>

            {/* Right Panel */}
            {transcriptData ? (
              <Box sx={{ position: "sticky", top: 96, height: "fit-content" }}>
                <TranscriptionPreview data={transcriptData} />
              </Box>
            ) : showFallback ? (
              <Box sx={{ position: "sticky", top: 96, height: "fit-content" }}>
                <TranscriptionPreview data={sampleData} />
              </Box>
            ) : loadingTranscript ? (
              <Loader />
            ) : null}
          </Box>
        </Container>

        <Footer isSummaryApproved={summaryApproved} />
      </Box>
    </ThemeProvider>
  );
};

export default Index;
