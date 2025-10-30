import { Activity, Heart, Thermometer, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const VitalsInput = () => {
  return (
    <Card className="glass-card transition-smooth hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5 text-primary" />
          Patient Vitals & Related Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm">
              <Thermometer className="h-4 w-4 text-primary" />
              Temperature (°F)
            </Label>
            <Input 
              type="number" 
              placeholder="98.6" 
              className="glass-panel"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-primary" />
              Blood Pressure
            </Label>
            <Input 
              type="text" 
              placeholder="120/80" 
              className="glass-panel"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm">
              <Heart className="h-4 w-4 text-primary" />
              Heart Rate (bpm)
            </Label>
            <Input 
              type="number" 
              placeholder="72" 
              className="glass-panel"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm">
              <Droplets className="h-4 w-4 text-primary" />
              Oxygen Level (%)
            </Label>
            <Input 
              type="number" 
              placeholder="98" 
              className="glass-panel"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
