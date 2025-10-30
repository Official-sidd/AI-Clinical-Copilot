import { FileEdit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export const DoctorNotes = () => {
  return (
    <Card className="glass-card transition-smooth hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileEdit className="h-5 w-5 text-primary" />
          Additional Notes for AI
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea 
          placeholder="Enter any additional observations, context, or specific instructions for the AI summary..."
          className="min-h-[120px] glass-panel resize-none"
        />
      </CardContent>
    </Card>
  );
};
