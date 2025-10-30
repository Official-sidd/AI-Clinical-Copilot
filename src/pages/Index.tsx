import { Navigation } from "@/components/Navigation";
import { AudioRecorder } from "@/components/AudioRecorder";
import { VitalsInput } from "@/components/VitalsInput";
import { FileUploader } from "@/components/FileUploader";
import { DoctorNotes } from "@/components/DoctorNotes";
import { AISummary } from "@/components/AISummary";
import { TranscriptionPreview } from "@/components/TranscriptionPreview";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen medical-gradient">
      <Navigation />
      
      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Main Interaction (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            <AudioRecorder />
            <VitalsInput />
            <FileUploader />
            <DoctorNotes />
            <AISummary />
          </div>
          
          {/* Right Panel - Preview (1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <TranscriptionPreview />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
