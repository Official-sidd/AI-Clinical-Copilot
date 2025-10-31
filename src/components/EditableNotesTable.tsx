import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Box,
  Paper,
  Typography,
} from "@mui/material";

interface EditableNotesTableProps {
  initialNotes: Record<string, Record<string, string>>;
  onSave?: (updatedNotes: Record<string, Record<string, string>>) => void;
}

export const EditableNotesTable = ({
  initialNotes,
  onSave,
}: EditableNotesTableProps) => {
  const [notes, setNotes] = useState(initialNotes);
  const [edited, setEdited] = useState(false);

  // 🧩 Refresh when initialNotes changes (tab switch)
  useEffect(() => {
    setNotes(initialNotes);
    setEdited(false);
  }, [initialNotes]);

  const handleChange = (
    category: string,
    key: string,
    value: string
  ) => {
    setEdited(true);
    setNotes((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    setEdited(false);
    if (onSave) onSave(notes);
  };

  const category = Object.keys(notes)[0];
  const data = notes[category];

  if (!data) return null;

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ mb: 2, color: "primary.main", textTransform: "uppercase" }}
      >
        {category} Notes
      </Typography>

      <TableContainer component={Paper} sx={{ bgcolor: "background.default" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="10%">
                <Typography fontWeight="bold">Section</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Details</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.entries(data).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      color: "text.secondary",
                    }}
                  >
                    {key}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    value={value}
                    onChange={(e) =>
                      handleChange(category, key, e.target.value)
                    }
                    minRows={3}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        fontFamily: "Poppins, sans-serif",
                        bgcolor: "background.paper",
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {edited && (
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            💾 Save Changes
          </Button>
        </Box>
      )}
    </Box>
  );
};
