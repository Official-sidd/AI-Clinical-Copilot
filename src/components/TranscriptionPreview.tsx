import { FileText, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const TranscriptionPreview = () => {
  const sampleTranscript = `Doctor: Good morning! How are you feeling today?

Patient: Not great, doctor. I've had this cough for about three days now, and I've been running a slight fever.

Doctor: I see. Can you describe the cough for me? Is it dry or are you bringing up any phlegm?

Patient: It's mostly dry. Very irritating, especially at night.

Doctor: And the fever - have you taken your temperature?

Patient: Yes, it's been around 99 to 100 degrees.

Doctor: Any other symptoms? Shortness of breath, chest pain, body aches?

Patient: No chest pain or trouble breathing. Some mild body aches, but nothing too severe.

Doctor: Have you traveled recently or been around anyone who's been sick?

Patient: No recent travel, and I don't think so, but my coworker was out sick last week.`;

  return (
    <Card className="glass-card h-full flex flex-col transition-smooth hover:shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" />
            Live Transcription
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 px-4 pb-4">
        <ScrollArea className="flex-1 glass-panel rounded-lg p-4">
          <div className="space-y-3 text-sm leading-relaxed">
            {sampleTranscript.split('\n\n').map((paragraph, idx) => (
              <p 
                key={idx}
                className={paragraph.startsWith('Doctor:') ? 'text-primary font-medium' : 'text-foreground'}
              >
                {paragraph}
              </p>
            ))}
            <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
              <div className="h-2 w-2 rounded-full bg-primary" />
              Listening...
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
