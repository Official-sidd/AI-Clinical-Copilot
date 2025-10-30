import { Card, CardContent, CardHeader, Button, Box } from "@mui/material";
import {
  Description,
  Image,
  TableChart,
  CloudUpload,
} from "@mui/icons-material";

export const FileUploader = () => {
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
          >
            <Description color="primary" sx={{ fontSize: 32 }} />
            <span style={{ fontSize: 12 }}>Lab Report</span>
          </Button>

          {/* <Button 
            variant="outlined" 
            fullWidth
            sx={{ 
              height: 100, 
              flexDirection: 'column', 
              gap: 1,
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <TableChart color="primary" sx={{ fontSize: 32 }} />
            <span style={{ fontSize: 12 }}>Prescription</span>
          </Button> */}

          <Button
            variant="outlined"
            fullWidth
            sx={{
              height: 100,
              flexDirection: "column",
              gap: 1,
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Image color="primary" sx={{ fontSize: 32 }} />
            <span style={{ fontSize: 12 }}>Medical Scan</span>
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
