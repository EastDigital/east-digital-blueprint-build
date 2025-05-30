
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Impact from "./pages/Impact";
import Approach from "./pages/Approach";
import Connect from "./pages/Connect";
import ProjectDetails from "./pages/ProjectDetails";
import ThreeDRenderingVisualization from "./pages/3DRenderingVisualization";
import RealEstateDigitalCampaigns from "./pages/RealEstateDigitalCampaigns";
import CorporateSolutions from "./pages/CorporateSolutions";
import ArchitecturalRendering from "./pages/ArchitecturalRendering";
import ArchitecturalWalkthrough from "./pages/ArchitecturalWalkthrough";
import VRPropertyTours from "./pages/VRPropertyTours";
import TargetedAds from "./pages/TargetedAds";
import DroneVideography from "./pages/DroneVideography";
import BrokerOutreach from "./pages/BrokerOutreach";
import BrandIdentityDesign from "./pages/BrandIdentityDesign";
import UIUXDesign from "./pages/UIUXDesign";
import WebApps from "./pages/WebApps";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/approach" element={<Approach />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/project/:projectId" element={<ProjectDetails />} />
            <Route path="/3d-rendering-visualization" element={<ThreeDRenderingVisualization />} />
            <Route path="/real-estate-digital-campaigns" element={<RealEstateDigitalCampaigns />} />
            <Route path="/corporate-solutions" element={<CorporateSolutions />} />
            <Route path="/architectural-rendering" element={<ArchitecturalRendering />} />
            <Route path="/architectural-walkthrough" element={<ArchitecturalWalkthrough />} />
            <Route path="/vr-property-tours" element={<VRPropertyTours />} />
            <Route path="/targeted-ads" element={<TargetedAds />} />
            <Route path="/drone-videography" element={<DroneVideography />} />
            <Route path="/broker-outreach" element={<BrokerOutreach />} />
            <Route path="/brand-identity-design" element={<BrandIdentityDesign />} />
            <Route path="/ui-ux-design" element={<UIUXDesign />} />
            <Route path="/web-apps" element={<WebApps />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
