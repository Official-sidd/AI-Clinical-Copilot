import { useState } from "react";
import { Mic, Square, Upload, Play, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setHasRecording(true);
  };

  const handleSendToAI = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <Card className="glass-card transition-smooth hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Mic className="h-5 w-5 text-primary" />
          Record or Upload Audio
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          {!isRecording ? (
            <>
              <Button 
                onClick={handleStartRecording}
                variant="default"
                className="flex-1 gap-2"
              >
                <Mic className="h-4 w-4" />
                Start Recording
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Upload className="h-4 w-4" />
                Upload Audio
              </Button>
            </>
          ) : (
            <Button 
              onClick={handleStopRecording}
              variant="destructive"
              className="flex-1 gap-2"
            >
              <Square className="h-4 w-4" />
              Stop Recording
            </Button>
          )}
        </div>

        {isRecording && (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Recording: {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div className="h-16 glass-panel rounded-lg flex items-center justify-center">
              <div className="flex gap-1 items-end h-8">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.05}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {hasRecording && !isRecording && (
          <div className="space-y-3">
            <div className="glass-panel rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">recording.wav</span>
                <Button variant="ghost" size="sm" className="h-8 gap-2">
                  <Play className="h-3 w-3" />
                  Play
                </Button>
              </div>
              <Progress value={33} className="h-1" />
            </div>
            
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-primary">
                  <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Processing audio...
                </div>
                <Progress value={60} className="h-1" />
              </div>
            ) : (
              <Button 
                onClick={handleSendToAI}
                variant="default" 
                className="w-full gap-2"
              >
                <Send className="h-4 w-4" />
                Send to AI
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
