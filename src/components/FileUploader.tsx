import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Description,
  Image,
  CloudUpload,
  TableChart,
  Delete,
} from "@mui/icons-material";

export const FileUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadType, setUploadType] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles((prev) => [...prev, file]);
    }
  };

  const handleUploadClick = (type: string) => {
    setUploadType(type);
    document.getElementById(`file-input-${type}`)?.click();
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Card sx={{ bgcolor: "background.paper", boxShadow: 2 }}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CloudUpload color="primary" />
            <span>Document Uploads</span>
          </Box>
        }
      />
      <CardContent>
        {/* --- Upload Buttons --- */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            sx={{
              height: 100,
              flexDirection: "column",
              gap: 1,
              "&:hover": { bgcolor: "action.hover" },
            }}
            onClick={() => handleUploadClick("lab")}
          >
            <Description color="primary" sx={{ fontSize: 32 }} />
            <span style={{ fontSize: 12 }}>Lab Report</span>
          </Button>

          <Button
            variant="outlined"
            fullWidth
            sx={{
              height: 100,
              flexDirection: "column",
              gap: 1,
              "&:hover": { bgcolor: "action.hover" },
            }}
            onClick={() => handleUploadClick("scan")}
          >
            <Image color="primary" sx={{ fontSize: 32 }} />
            <span style={{ fontSize: 12 }}>Medical Scan</span>
          </Button>
        </Box>

        {/* Hidden File Inputs */}
        {["lab", "prescription", "scan"].map((type) => (
          <input
            key={type}
            type="file"
            id={`file-input-${type}`}
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
        ))}

        {/* --- Uploaded File List --- */}
        {uploadedFiles.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Uploaded Files
            </Typography>
            <List dense>
              {uploadedFiles.map((file, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <Delete color="error" />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    {file.type.includes("image") ? (
                      <Image color="primary" />
                    ) : (
                      <Description color="primary" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    secondary={`${(file.size / 1024).toFixed(1)} KB`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
