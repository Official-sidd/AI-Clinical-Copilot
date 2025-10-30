import { FileText, Image, FileSpreadsheet, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const FileUploader = () => {
  return (
    <Card className="glass-card transition-smooth hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Upload className="h-5 w-5 text-primary" />
          Document Uploads
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          <Button 
            variant="outline" 
            className="h-auto flex-col gap-2 p-4 glass-panel hover:bg-accent/50"
          >
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xs">Lab Report</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto flex-col gap-2 p-4 glass-panel hover:bg-accent/50"
          >
            <FileSpreadsheet className="h-6 w-6 text-primary" />
            <span className="text-xs">Prescription</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto flex-col gap-2 p-4 glass-panel hover:bg-accent/50"
          >
            <Image className="h-6 w-6 text-primary" />
            <span className="text-xs">Medical Scan</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
