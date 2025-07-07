
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Connect from "./pages/Connect";
import Impact from "./pages/Impact";
import Enquiry from "./pages/Enquiry";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ProjectDetails from "./pages/ProjectDetails";
import Approach from "./pages/Approach";
import ArchitecturalRendering from "./pages/ArchitecturalRendering";
import ArchitecturalWalkthrough from "./pages/ArchitecturalWalkthrough";
import VRPropertyTours from "./pages/VRPropertyTours";
import DroneVideography from "./pages/DroneVideography";
import { ThreeDRenderingVisualization } from "./pages/3DRenderingVisualization";
import RealEstateDigitalCampaigns from "./pages/RealEstateDigitalCampaigns";
import TargetedAds from "./pages/TargetedAds";
import BrokerOutreach from "./pages/BrokerOutreach";
import WebApps from "./pages/WebApps";
import UIUXDesign from "./pages/UIUXDesign";
import BrandIdentityDesign from "./pages/BrandIdentityDesign";
import CorporateSolutions from "./pages/CorporateSolutions";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/connect" element={<Connect />} />
              <Route path="/enquiry" element={<Enquiry />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/approach" element={<Approach />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/project/:slug" element={<ProjectDetails />} />
              <Route path="/architectural-rendering" element={<ArchitecturalRendering />} />
              <Route path="/architectural-walkthrough" element={<ArchitecturalWalkthrough />} />
              <Route path="/vr-property-tours" element={<VRPropertyTours />} />
              <Route path="/drone-videography" element={<DroneVideography />} />
              <Route path="/3d-rendering-visualization" element={<ThreeDRenderingVisualization />} />
              <Route path="/real-estate-digital-campaigns" element={<RealEstateDigitalCampaigns />} />
              <Route path="/targeted-ads" element={<TargetedAds />} />
              <Route path="/broker-outreach" element={<BrokerOutreach />} />
              <Route path="/web-apps" element={<WebApps />} />
              <Route path="/ui-ux-design" element={<UIUXDesign />} />
              <Route path="/brand-identity-design" element={<BrandIdentityDesign />} />
              <Route path="/corporate-solutions" element={<CorporateSolutions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
