// src/components/SectorsShowcase.tsx
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Data for the showcase sections.
const sectorsData = [
  {
    id: "corporates",
    name: "Corporates",
    title: "Enterprise Solutions & Brand Development",
    image: "https://www.eastdigital.in/img/product_afc_001.jpg",
    showcaseTitle: "Branding Identity for Optik Club",
    showcaseDescription:
      "We partner with corporate clients to develop powerful brand identities, from logo design to comprehensive marketing collateral that drives brand recognition and growth.",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    title: "Architectural Visualization & Digital Marketing",
    image: "https://www.eastdigital.in/img/product_afc_001.jpg",
    showcaseTitle: "High-Fidelity Renders for Luxury Villas",
    showcaseDescription:
      "We provide property developers with 3D visuals, VR walkthroughs, marketing, and tech to launch projects and drive sales.",
  },
  {
    id: "engineering",
    name: "Engineering",
    title: "Precision Modeling & Technical Animation",
    image: "https://www.eastdigital.in/img/product_afc_001.jpg",
    showcaseTitle: "3D Modeling for Industrial Machinery",
    showcaseDescription:
      "Our team creates precise 3D models and animations for complex engineering projects, aiding in prototyping, visualization, and client presentations.",
  },
  {
    id: "architecture",
    name: "Architecture",
    title: "Immersive Architectural Walkthroughs",
    image: "https://www.eastdigital.in/img/product_afc_001.jpg",
    showcaseTitle: "VR-Ready Tour of a Modern Office Complex",
    showcaseDescription:
      "Transform blueprints into immersive experiences. We build photorealistic VR tours and architectural walkthrough videos that captivate stakeholders.",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    title: "Product Visualization & Prototyping",
    image: "https://www.eastdigital.in/img/product_afc_001.jpg",
    showcaseTitle: "Digital Prototype for a New Product Line",
    showcaseDescription:
      "From concept to digital prototype, we provide detailed 3D product renderings that accelerate design cycles and enhance marketing efforts.",
  },
];

const SectorsShowcase = () => {
  const [activeSector, setActiveSector] = useState(sectorsData[0]);

  return (
    <div className="bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-eastdigital-orange/8 via-eastdigital-orange/12 to-eastdigital-orange/8 border border-eastdigital-orange/15 rounded-full mb-6 backdrop-blur-2xl shadow-lg shadow-eastdigital-orange/10">
            <span className="text-eastdigital-orange text-sm font-medium tracking-wider uppercase">INDUSTRY EXPERTISE</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mt-4">
          Sectors We Transform
        </h2>
        <p className="text-lg text-eastdigital-lightgray mt-4 max-w-3xl mx-auto">
          Delivering innovative solutions across diverse industries with
          precision and expertise.
        </p>

        <div className="flex justify-center items-center flex-wrap gap-4 my-10">
          {sectorsData.map((sector) => (
            <button
              key={sector.id}
              onClick={() => setActiveSector(sector)}
              className={cn(
                "px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 backdrop-blur-md",
                activeSector.id === sector.id
                  ? "bg-eastdigital-orange text-white shadow-lg"
                  : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
              )}
            >
              {sector.name}
            </button>
          ))}
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-6">{activeSector.title}</h3>
          <Card className="relative w-full max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden border-gray-700">
            <img
              src={activeSector.image}
              alt={activeSector.showcaseTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-left text-white">
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-eastdigital-orange rounded-full" />
                <h4 className="text-2xl font-bold">
                  {activeSector.showcaseTitle}
                </h4>
                <p className="mt-2 max-w-md text-eastdigital-lightgray">
                  {activeSector.showcaseDescription}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SectorsShowcase;
