import { Save, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="glass-panel border-t mt-8">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>⚠️ For demo only — all data is synthetic and anonymized</span>
          </div>
          
          <Button variant="default" size="lg" className="gap-2">
            <Save className="h-4 w-4" />
            Save to EHR
          </Button>
        </div>
      </div>
    </footer>
  );
};
