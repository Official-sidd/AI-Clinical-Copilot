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
} from "@mui/material";
import { Description } from "@mui/icons-material";

interface DoctorNotesSectionProps {
  notes: Record<string, Record<string, string>>;
  onSave?: (updatedNotes: Record<string, Record<string, string>>) => void;
}

export const DoctorNotesSection: React.FC<DoctorNotesSectionProps> = ({
  notes,
  onSave,
}) => {
  const noteTypes = Object.keys(notes || {}); // ["BIRP", "DAP", "SOAP"]
  const [activeTab, setActiveTab] = useState(0);
  const [editableNotes, setEditableNotes] = useState(notes);
  const [edited, setEdited] = useState(false);

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

  const handleSave = () => {
    if (onSave) onSave(editableNotes);
    setEdited(false);
  };

  const cleanText = (text: string) => text?.replace(/[*#_]+/g, "").trim() || "";

  return (
    <Card sx={{ bgcolor: "background.paper", boxShadow: 2, borderRadius: 2 }}>
      <CardHeader
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <Description color="primary" />
            <Typography variant="h6">Doctor's Clinical Notes</Typography>
          </Box>
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
