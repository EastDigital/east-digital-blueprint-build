
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/contexts/AuthContext';
import Index from "./pages/Index";
import Impact from "./pages/Impact";
import ProjectDetails from "./pages/ProjectDetails";
import Approach from "./pages/Approach";
import Connect from "./pages/Connect";
import RealEstateDigitalCampaigns from "./pages/RealEstateDigitalCampaigns";
import ThreeDRenderingVisualization from "./pages/3DRenderingVisualization";
import CorporateSolutions from "./pages/CorporateSolutions";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
            <Route path="/approach" element={<Approach />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/real-estate-digital-campaigns" element={<RealEstateDigitalCampaigns />} />
            <Route path="/3d-rendering-visualization" element={<ThreeDRenderingVisualization />} />
            <Route path="/corporate-solutions" element={<CorporateSolutions />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
