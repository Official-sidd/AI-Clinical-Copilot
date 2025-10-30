import { Stethoscope, Settings, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 glass-panel border-b shadow-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Stethoscope className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">
            AI Clinical Copilot
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="default" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Consultation
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
          
          <Avatar className="h-9 w-9 border-2 border-primary/20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};
