import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Box,
  Collapse,
  Typography,
} from "@mui/material";
import {
  Psychology,
  ContentCopy,
  Refresh,
  CheckCircle,
  Code,
} from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AISummary = () => {
  const [showCodes, setShowCodes] = useState(false);
  const [summary] =
    useState(`Chief Complaint: Patient presents with persistent cough and mild fever for 3 days.

History of Present Illness: 45-year-old male reports dry cough that began 3 days ago, accompanied by low-grade fever (99.8°F). No shortness of breath or chest pain. Patient denies recent travel or known sick contacts.

Assessment: Likely viral upper respiratory infection. Vitals stable. No signs of pneumonia on examination.

Plan: Recommend rest, hydration, and OTC symptom management. Follow up if symptoms worsen or persist beyond 7 days.`);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      alert("✅ Summary copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleRegenerate = () => {
    // For now, just simulate regeneration — you can hook this to your AI backend later
    console.log("🔄 Regenerate summary triggered");
    // alert("Simulated: Regenerating AI summary...");
    toast.info("Simulated: Regenerating AI summary...");
  };

  return (
    <Card sx={{ bgcolor: "background.paper", boxShadow: 2 }}>
      {/* <ToastContainer position="top-right" autoClose={2000} /> */}
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Psychology color="primary" />
            <span>AI-Generated Visit Summary</span>
          </Box>
        }
      />
      <CardContent>
        <TextField
          fullWidth
          multiline
          rows={8}
          value={summary}
          InputProps={{ readOnly: true }}
          sx={{ mb: 2, fontFamily: "monospace", fontSize: 13 }}
        />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Refresh />}
            onClick={handleRegenerate}
          >
            Regenerate
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ContentCopy />}
            onClick={handleCopy}
          >
            Copy
          </Button>
          <Button variant="contained" size="small" startIcon={<CheckCircle />}>
            Approve
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Code />}
            onClick={() => setShowCodes(!showCodes)}
          >
            {showCodes ? "Hide" : "Show"} Codes
          </Button>
        </Box>

        <Collapse in={showCodes}>
          <Box sx={{ bgcolor: "action.hover", p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Suggested Medical Codes
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                }}
              >
                <span>ICD-10: R05 (Cough)</span>
                <Typography
                  variant="caption"
                  color="primary"
                  sx={{ fontWeight: 600 }}
                >
                  Primary
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                }}
              >
                <span>ICD-10: R50.9 (Fever, unspecified)</span>
                <Typography variant="caption" color="text.secondary">
                  Secondary
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                }}
              >
                <span>CPT: 99213 (Office visit, moderate complexity)</span>
                <Typography
                  variant="caption"
                  color="primary"
                  sx={{ fontWeight: 600 }}
                >
                  Billing
                </Typography>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};
