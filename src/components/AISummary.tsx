import { Brain, Copy, RefreshCw, CheckCircle, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const AISummary = () => {
  const [showCodes, setShowCodes] = useState(false);
  const [summary] = useState(`Chief Complaint: Patient presents with persistent cough and mild fever for 3 days.

History of Present Illness: 45-year-old male reports dry cough that began 3 days ago, accompanied by low-grade fever (99.8°F). No shortness of breath or chest pain. Patient denies recent travel or known sick contacts.

Assessment: Likely viral upper respiratory infection. Vitals stable. No signs of pneumonia on examination.

Plan: Recommend rest, hydration, and OTC symptom management. Follow up if symptoms worsen or persist beyond 7 days.`);

  return (
    <Card className="glass-card transition-smooth hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="h-5 w-5 text-primary" />
          AI-Generated Visit Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea 
          value={summary}
          className="min-h-[200px] glass-panel font-mono text-sm resize-none"
          readOnly
        />
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Regenerate
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button variant="default" size="sm" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Approve
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => setShowCodes(!showCodes)}
          >
            <Code className="h-4 w-4" />
            {showCodes ? "Hide" : "Show"} Codes
          </Button>
        </div>

        {showCodes && (
          <div className="glass-panel p-4 rounded-lg space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <h4 className="font-semibold text-sm">Suggested Medical Codes</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>ICD-10: R05 (Cough)</span>
                <span className="text-primary">Primary</span>
              </div>
              <div className="flex justify-between">
                <span>ICD-10: R50.9 (Fever, unspecified)</span>
                <span className="text-muted-foreground">Secondary</span>
              </div>
              <div className="flex justify-between">
                <span>CPT: 99213 (Office visit, moderate complexity)</span>
                <span className="text-primary">Billing</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
