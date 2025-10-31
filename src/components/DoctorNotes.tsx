"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  Box,
  Typography,
} from "@mui/material";
import { Description } from "@mui/icons-material";
import { EditableNotesTable } from "@/components/EditableNotesTable";

export const DoctorNotes = () => {
  const [activeTab, setActiveTab] = useState(0);

  const sampleNotes = {
    SOAP: {
      S: "Subjective**  \nPatient reports having a headache for the past three days...",
      O: "Objective**  \nNot discussed.\n\n**",
      A: "Assessment**  \nHeadache, likely tension-type, exacerbated by screen time and stress.\n\n**",
      P: "Plan**  \nNot discussed.",
    },
    DAP: {
      D: "Data**  \nPatient reports having a headache for the past three days...",
      A: "Assessment**  \nSevere headache likely related to screen exposure and work stress.",
      P: "Plan**  \nRecommend reducing screen time and taking breaks.",
    },
    BIRP: {
      B: "** Patient reports a headache for the past 3 days...",
      I: "** Not discussed.\n\n**",
      R: "** Patient expressed that the headache is bothersome but not unbearable.\n\n**",
      P: "** Monitor symptoms and consider follow-up if headaches persist or worsen.",
    },
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getCurrentNotes = () => {
    if (activeTab === 0) return { SOAP: sampleNotes.SOAP };
    if (activeTab === 1) return { DAP: sampleNotes.DAP };
    if (activeTab === 2) return { BIRP: sampleNotes.BIRP };
    return {};
  };

  return (
    <Card sx={{ bgcolor: "background.paper", boxShadow: 2 }}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Description color="primary" />
            <span>Doctor's Notes Summary</span>
          </Box>
        }
      />
      <CardContent>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="SOAP Format" />
          <Tab label="DAP Format" />
          <Tab label="BIRP Format" />
        </Tabs>

        <EditableNotesTable
          initialNotes={getCurrentNotes()}
          onSave={(updated) => console.log("Updated Notes:", updated)}
        />

        <Typography
          variant="caption"
          sx={{ mt: 2, display: "block", color: "text.secondary" }}
        >
          {activeTab === 0 && "SOAP: Subjective, Objective, Assessment, Plan"}
          {activeTab === 1 && "DAP: Data, Assessment, Plan"}
          {activeTab === 2 && "BIRP: Behavior, Intervention, Response, Plan"}
        </Typography>
      </CardContent>
    </Card>
  );
};
