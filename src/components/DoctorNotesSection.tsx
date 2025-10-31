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
}

async function updateDoctorNotes(
  notes: Record<string, Record<string, string>>
) {
  try {
    const response = await fetch(
      "https://bk6xbdf1-5000.inc1.devtunnels.ms/re_generate_summary",
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
    try {
      const result = await updateDoctorNotes(editableNotes);
      if (onSave) onSave(editableNotes);
      console.log("Server response:", result);
      setEdited(false);
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
