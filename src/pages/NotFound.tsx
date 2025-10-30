import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        bgcolor: "#020202",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "#e0e0e0",
        fontFamily: "monospace",
      }}
    >
      {/* Background glowing grid */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(30,136,229,0.05) 0%, transparent 70%),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 40px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 40px)
          `,
          animation: "pulseGrid 6s ease-in-out infinite alternate",
          zIndex: 0,
        }}
      />

      {/* Floating glitchy 404 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{ position: "relative", zIndex: 2 }}
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "6rem", md: "12rem" },
              fontWeight: 900,
              letterSpacing: "-0.05em",
              position: "relative",
              color: "#e0e0e0",
              textShadow:
                "0 0 40px rgba(30,136,229,0.6), 0 0 80px rgba(30,136,229,0.4)",
            }}
          >
            404
          </Typography>

          {/* Glitch overlay layers */}
          <Typography
            variant="h1"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              color: "#1e88e5",
              opacity: 0.5,
              animation: "glitch 1.5s infinite",
              fontSize: { xs: "6rem", md: "12rem" },
              fontWeight: 900,
            }}
          >
            404
          </Typography>
        </motion.div>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{ zIndex: 2 }}
      >
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            mb: 5,
            color: "rgba(224,224,224,0.8)",
            fontWeight: 400,
            letterSpacing: "0.02em",
          }}
        >
          You’ve wandered off the grid — this page doesn’t exist.
        </Typography>
      </motion.div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{ zIndex: 2 }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          sx={{
            borderColor: "#1e88e5",
            color: "#1e88e5",
            px: 4,
            py: 1.2,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "8px",
            "&:hover": {
              bgcolor: "#1e88e5",
              color: "#fff",
              boxShadow: "0 0 25px rgba(30,136,229,0.6)",
            },
          }}
        >
          Back to Safety
        </Button>
      </motion.div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes glitch {
            0% { clip-path: inset(0 0 80% 0); transform: translate(-3px, 2px); }
            10% { clip-path: inset(10% 0 50% 0); transform: translate(3px, -2px); }
            20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 1px); }
            30% { clip-path: inset(40% 0 30% 0); transform: translate(2px, 0); }
            50% { clip-path: inset(15% 0 60% 0); transform: translate(-1px, -1px); }
            100% { clip-path: inset(0 0 0 0); transform: none; }
          }

          @keyframes pulseGrid {
            from { opacity: 0.2; transform: scale(1); }
            to { opacity: 0.35; transform: scale(1.05); }
          }
        `}
      </style>
    </Box>
  );
};

export default NotFound;
