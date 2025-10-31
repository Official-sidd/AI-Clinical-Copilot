import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Autocomplete,
} from "@mui/material";
import MedicationIcon from "@mui/icons-material/Medication";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

interface PrescriptionItem {
  name: string;
  dosage: string;
  frequency?: string;
  duration?: string;
}

interface EditablePrescriptionSectionProps {
  prescriptions?: PrescriptionItem[];
  onSave?: (updated: PrescriptionItem[]) => void;
}

// Mock medicine list for autocomplete suggestions
const medicineList = [
  "Paracetamol 500mg",
  "Ibuprofen 400mg",
  "Amoxicillin 250mg",
  "Azithromycin 500mg",
  "Cetirizine 10mg",
  "Pantoprazole 40mg",
  "Metformin 500mg",
  "Amlodipine 5mg",
  "Cough Syrup",
  "Vitamin D3 1000IU",
];

export const EditablePrescriptionSection: React.FC<
  EditablePrescriptionSectionProps
> = ({ prescriptions = [], onSave }) => {
  const [rows, setRows] = useState<PrescriptionItem[]>(prescriptions);
  const [edited, setEdited] = useState(false);

  const handleAddRow = () => {
    setRows([...rows, { name: "", dosage: "", frequency: "", duration: "" }]);
    setEdited(true);
  };

  const handleDeleteRow = (index: number) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
    setEdited(true);
  };

  const handleChange = (
    index: number,
    field: keyof PrescriptionItem,
    value: string
  ) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
    setEdited(true);
  };

  const handleSave = () => {
    if (onSave) onSave(rows);
    setEdited(false);
  };

  return (
    <Card sx={{ bgcolor: "background.paper", boxShadow: 2, borderRadius: 2 }}>
      <CardHeader
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <MedicationIcon color="primary" />
            <Typography variant="h6">Probable Prescription</Typography>
          </Box>
        }
      />

      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddRow}
          >
            Add Medicine
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, width: "35%" }}>
                  Medicine Name
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: "20%" }}>
                  Dosage
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: "20%" }}>
                  Frequency
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: "20%" }}>
                  Duration
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, width: "5%", whiteSpace: "nowrap" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Autocomplete
                      freeSolo
                      options={medicineList}
                      value={row.name}
                      onInputChange={(_, newValue) =>
                        handleChange(index, "name", newValue)
                      }
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Search medicine" />
                      )}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      fullWidth
                      value={row.dosage}
                      onChange={(e) =>
                        handleChange(index, "dosage", e.target.value)
                      }
                      placeholder="e.g., 1 tablet"
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      fullWidth
                      value={row.frequency}
                      onChange={(e) =>
                        handleChange(index, "frequency", e.target.value)
                      }
                      placeholder="e.g., Twice a day"
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      fullWidth
                      value={row.duration}
                      onChange={(e) =>
                        handleChange(index, "duration", e.target.value)
                      }
                      placeholder="e.g., 5 days"
                    />
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteRow(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    <Typography color="text.secondary">
                      No medicines added yet.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {edited && (
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save Prescription
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
