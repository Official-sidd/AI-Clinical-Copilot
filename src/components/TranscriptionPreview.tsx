import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Article, Close } from "@mui/icons-material";

interface Chunk {
  role: string;
  transcript: string;
}

interface Props {
  data: {
    chunk_details: Chunk[];
  };
}

export const TranscriptionPreview = ({ data }: Props) => {
  if (!data?.chunk_details) return null;

  return (
    <Card
      sx={{
        bgcolor: "background.paper",
        boxShadow: 2,
        height: "calc(100vh - 12rem)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader
        title={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Article color="primary" />
              <span>Live Transcription</span>
            </Box>
            <IconButton size="small">
              <Close fontSize="small" />
            </IconButton>
          </Box>
        }
      />

      <CardContent sx={{ flex: 1, overflow: "hidden" }}>
        <Box
          sx={{
            height: "100%",
            bgcolor: "action.hover",
            p: 2,
            borderRadius: 2,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {data.chunk_details.map((chunk, idx) => (
            <Typography
              key={idx}
              variant="body2"
              sx={{
                color:
                  chunk.role.toLowerCase() === "doctor"
                    ? "primary.main"
                    : "text.primary",
                fontWeight: chunk.role.toLowerCase() === "doctor" ? 600 : 400,
                whiteSpace: "pre-line",
              }}
            >
              {`${chunk.role}: ${chunk.transcript}`}
            </Typography>
          ))}

          {/* Listening pulse indicator */}
          {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "text.secondary",
              mt: 2,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                bgcolor: "primary.main",
                borderRadius: "50%",
                animation: "pulse 1.5s ease-in-out infinite",
                "@keyframes pulse": {
                  "0%": { opacity: 1, transform: "scale(1)" },
                  "50%": { opacity: 0.4, transform: "scale(1.3)" },
                  "100%": { opacity: 1, transform: "scale(1)" },
                },
              }}
            />
            <Typography variant="caption">Listening...</Typography>
          </Box> */}
        </Box>
      </CardContent>
    </Card>
  );
};
