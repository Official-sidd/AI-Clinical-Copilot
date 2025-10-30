import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Chip,
  Box,
  LinearProgress,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Mic,
  StopCircle,
  Upload,
  PlayArrow,
  Pause,
  Send,
} from "@mui/icons-material";

export const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [hasRecording, setHasRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioUrlRef = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  // const handleStartRecording = async () => {
  //   try {
  //     // Stop any playing audio (prevent overlap)
  //     if (audioRef.current && !audioRef.current.paused) {
  //       audioRef.current.pause();
  //     }

  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     setLocalStream(stream);

  //     const pc = new RTCPeerConnection();

  //     // Add local audio track to peer connection
  //     stream.getTracks().forEach((track) => pc.addTrack(track, stream));

  //     // Create an SDP offer
  //     const offer = await pc.createOffer();
  //     await pc.setLocalDescription(offer);

  //     // Send offer to backend
  //     const res = await fetch("/api/webrtc-offer", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ sdp: offer.sdp }),
  //     });

  //     const { answer } = await res.json();

  //     // Apply the backend’s answer SDP
  //     await pc.setRemoteDescription({ type: "answer", sdp: answer });

  //     setPeerConnection(pc);
  //     setIsRecording(true);
  //   } catch (error) {
  //     console.error("Error starting WebRTC recording:", error);
  //   }
  // };

  // const handleStopRecording = () => {
  //   if (localStream) {
  //     localStream.getTracks().forEach((track) => track.stop());
  //   }
  //   if (peerConnection) {
  //     peerConnection.close();
  //     setPeerConnection(null);
  //   }
  //   setIsRecording(false);
  // };

  //🎙️ Start Recording
  const handleStartRecording = async () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    setIsRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      audioChunksRef.current = [];
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/mp3",
        });
        console.log("🎧 Recorded audio type:", audioBlob.type);
        setRecordedBlob(audioBlob);
        setHasRecording(true);
        const audioUrl = URL.createObjectURL(audioBlob);
        audioUrlRef.current = audioUrl;
        audioRef.current = new Audio(audioUrl);
        attachAudioListeners();
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };

  // 🛑 Stop Recording
  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  // 📤 Upload from File
  const handleFileUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setRecordedBlob(file);
      setHasRecording(true);
      const url = URL.createObjectURL(file);
      audioUrlRef.current = url;
      audioRef.current = new Audio(url);
      attachAudioListeners();
    }
  };

  // 🎧 Play/Pause toggle
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // 🎚️ Attach audio progress listeners
  const attachAudioListeners = () => {
    if (!audioRef.current) return;
    audioRef.current.onloadedmetadata = () =>
      setDuration(audioRef.current?.duration || 0);
    audioRef.current.ontimeupdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        setProgress(
          (audioRef.current.currentTime / (audioRef.current.duration || 1)) *
            100
        );
      }
    };
    audioRef.current.onended = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };
  };

  // 🤖 Send to AI / Backend
  const handleSendToAI = async () => {
    if (!recordedBlob) return;

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("audio", recordedBlob, "recording.mp3");

      const res = await fetch("https://your-backend-url.com/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Server response:", data);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.mp3"; // or .webm depending on your type
    a.click();
    URL.revokeObjectURL(url);
  };

  // 🧹 Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    };
  }, []);

  return (
    <Card sx={{ bgcolor: "background.paper", boxShadow: 2 }}>
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
              <Mic color="primary" />
              <span>Record or Upload Audio</span>
            </Box>
            {isRecording && (
              <Chip label="Recording..." color="error" size="small" />
            )}
          </Box>
        }
      />

      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* --- Buttons --- */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {!isRecording ? (
            <>
              <Button
                variant="contained"
                startIcon={<Mic />}
                onClick={handleStartRecording}
                sx={{ flex: 1 }}
              >
                Start Recording
              </Button>
              <Button
                variant="outlined"
                startIcon={<Upload />}
                onClick={handleFileUploadClick}
                sx={{ flex: 1 }}
              >
                Upload Audio
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </>
          ) : (
            <Button
              variant="contained"
              color="error"
              startIcon={<StopCircle />}
              onClick={handleStopRecording}
              sx={{ flex: 1 }}
            >
              Stop Recording
            </Button>
          )}
        </Box>

        {/* --- Playback and Progress --- */}
        {hasRecording && !isRecording && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ bgcolor: "action.hover", p: 2, borderRadius: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {recordedBlob instanceof File
                    ? recordedBlob.name
                    : "recording.webm"}
                </Typography>

                <IconButton color="primary" onClick={handlePlayPause}>
                  {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
              </Box>

              {/* Progress Bar */}
              {/* <LinearProgress variant="determinate" value={progress} /> */}
              <Box
                sx={{
                  position: "relative",
                  height: 8,
                  borderRadius: 2,
                  bgcolor: "action.selected",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  if (!audioRef.current) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newTime =
                    (clickX / rect.width) * (audioRef.current.duration || 0);
                  audioRef.current.currentTime = newTime;
                  setCurrentTime(newTime);
                  setProgress(
                    (newTime / (audioRef.current.duration || 1)) * 100
                  );
                }}
              >
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                  }}
                />

                {/* draggable thumb */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: `${progress}%`,
                    transform: "translate(-50%, -50%)",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    pointerEvents: "none",
                  }}
                />
              </Box>

              {/* Timer */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 0.5,
                  color: "text.secondary",
                  fontSize: 12,
                }}
              >
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </Box>
            </Box>

            {isProcessing ? (
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
                  Processing audio...
                </Typography>
                <LinearProgress />
              </Box>
            ) : (
              <>
                <Button onClick={handleDownload} variant="outlined" fullWidth>
                  Download Audio
                </Button>
                <Button
                  onClick={handleSendToAI}
                  variant="contained"
                  startIcon={<Send />}
                  fullWidth
                >
                  Send Data To AI
                </Button>
              </>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// 🕒 Helper: format seconds into mm:ss
function formatTime(seconds: number) {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}
