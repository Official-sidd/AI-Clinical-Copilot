import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import MedicationIcon from "@mui/icons-material/Medication";

interface PrescriptionItem {
  name: string;
  dosage: string;
  frequency?: string;
  duration?: string;
}

interface ProbablePrescriptionProps {
  prescriptions: PrescriptionItem[];
}

export const ProbablePrescription: React.FC<ProbablePrescriptionProps> = ({
  prescriptions,
}) => {
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
        {prescriptions.length > 0 ? (
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Medicine Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Dosage</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Frequency</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prescriptions.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.dosage}</TableCell>
                    <TableCell>{item.frequency || "—"}</TableCell>
                    <TableCell>{item.duration || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography color="text.secondary" align="center">
            No probable prescriptions generated yet.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
