"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Tabs,
  Tab,
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";
import { Description } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";

interface DoctorNotesSectionProps {
  notes: Record<string, Record<string, string>>;
  onSave?: (updatedNotes: Record<string, Record<string, string>>) => void;
  setSummary:(summary: any)=>void;  
  setMediCodes:(summary: any)=>void;  
}

async function updateDoctorNotes(
  notes: Record<string, Record<string, string>>
) {
  try {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const response = await fetch(
      `${BASE_URL}/re_generate_summary`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes: [notes] }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update doctor notes");
    }

    const data = await response.json();
    console.log("✅ Notes updated successfully:", data);
    return data;
  } catch (error) {
    console.error("❌ Error updating doctor notes:", error);
    throw error;
  }
}

export const DoctorNotesSection: React.FC<DoctorNotesSectionProps> = ({
  notes,
  onSave,
  setSummary,
  setMediCodes,
}) => {
  const noteTypes = Object.keys(notes || {}); // ["BIRP", "DAP", "SOAP"]
  const [activeTab, setActiveTab] = useState(0);
  const [editableNotes, setEditableNotes] = useState(notes);
  const [edited, setEdited] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditableNotes(notes);
  }, [notes]);

  const currentNoteType = noteTypes[activeTab];
  const currentSections = editableNotes[currentNoteType];

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleChange = (section: string, value: string) => {
    setEdited(true);
    setEditableNotes((prev) => ({
      ...prev,
      [currentNoteType]: {
        ...prev[currentNoteType],
        [section]: value,
      },
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    let payload={} as Record<string, Record<string, string>>;
    if (notes.BIRP !== editableNotes.BIRP) 
      payload.BIRP = editableNotes.BIRP;
    
    
    if (notes.DAP !== editableNotes.DAP) 
      payload.DAP = editableNotes.DAP;
    
    if (notes.SOAP !== editableNotes.SOAP) 
      payload.SOAP = editableNotes.SOAP;
  
    try {
      // const result = await updateDoctorNotes(editableNotes);
      const result = await updateDoctorNotes(payload);
      // if (onSave) onSave(editableNotes);
      if (onSave) onSave(payload);
      console.log("Server response:", result);
      setEdited(false);
      setSummary(result.summary);
      setMediCodes(result.medical_codes);
    } catch (error) {
      console.error("Failed to save doctor notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const cleanText = (text: string) => text?.replace(/[*#_]+/g, "").trim() || "";

  return (
    <Card sx={{ bgcolor: "background.paper", boxShadow: 2, borderRadius: 2 }}>
      <CardHeader
        title={
          <Grid display={"flex"} justifyContent={"space-between"}>
            <Box display="flex" alignItems="center" gap={1}>
              <Description color="primary" />
              <Typography variant="h6">Doctor's Clinical Notes</Typography>
            </Box>
            <IconButton color="primary" size="small">
              <Edit />
            </IconButton>
          </Grid>
        }
      />

      <CardContent>
        {/* Tabs for BIRP / DAP / SOAP */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
          sx={{ mb: 3 }}
        >
          {noteTypes.map((type) => (
            <Tab key={type} label={type} />
          ))}
        </Tabs>

        {/* Editable fields for current tab */}
        <Box component={Paper} sx={{ p: 3, borderRadius: 2 }}>
          {Object.entries(currentSections).map(([key, value]) => (
            <Box key={key} sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: "text.secondary", fontWeight: 600 }}
              >
                {key}:
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={3}
                value={value}
                variant="outlined"
                onChange={(e) => handleChange(key, e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontFamily: "Poppins, sans-serif",
                    bgcolor: "background.default",
                  },
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Save Button */}
        {edited && (
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ borderRadius: 2 }}
            >
              💾 Save Changes
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
