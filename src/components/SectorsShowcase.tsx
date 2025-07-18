import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Data for the showcase sections.
const sectorsData = [{
  id: "corporates",
  name: "Corporates",
  title: "Enterprise Solutions & Brand Development",
  image: "https://www.eastdigital.in/img/bahuguna_villa_001.jpg",
  showcaseTitle: "Branding Identity for Optik Club",
  showcaseDescription: "We partner with corporate clients to develop powerful brand identities, from logo design to comprehensive marketing collateral that drives brand recognition and growth.",
  link: "/corporate-solutions"
}, {
  id: "real-estate",
  name: "Real Estate",
  title: "Architectural Visualization & Digital Marketing",
  video: "https://www.eastdigital.in/img/3d-arch-demo.mp4",
  image: "https://www.eastdigital.in/img/product_afc_001.jpg",
  // Fallback image
  showcaseTitle: "High-Fidelity Renders for Luxury Villas",
  showcaseDescription: "We provide property developers with 3D visuals, VR walkthroughs, marketing, and tech to launch projects and drive sales.",
  link: "/real-estate-digital-campaigns"
}, {
  id: "engineering",
  name: "Engineering",
  title: "Precision Modeling & Technical Animation",
  image: "https://www.eastdigital.in/img/Reliance-Sasan_ex_01.jpg",
  showcaseTitle: "3D Modeling for Industrial Machinery",
  showcaseDescription: "Our team creates precise 3D models and animations for complex engineering projects, aiding in prototyping, visualization, and client presentations.",
  link: "/3d-rendering-visualization"
}, {
  id: "architecture",
  name: "Architecture",
  title: "Immersive Architectural Walkthroughs",
  image: "https://www.eastdigital.in/img/Nidhi_jaali%20building.jpg",
  showcaseTitle: "VR-Ready Tour of a Modern Office Complex",
  showcaseDescription: "Transform blueprints into immersive experiences. We build photorealistic VR tours and architectural walkthrough videos that captivate stakeholders.",
  link: "/3d-rendering-visualization"
}, {
  id: "manufacturing",
  name: "Manufacturing",
  title: "Product Visualization & Prototyping",
  image: "https://www.eastdigital.in/img/product_afc_001.jpg",
  showcaseTitle: "Digital Prototype for a New Product Line",
  showcaseDescription: "From concept to digital prototype, we provide detailed 3D product renderings that accelerate design cycles and enhance marketing efforts.",
  link: "/3d-rendering-visualization"
}];
const SectorsShowcase = () => {
  const [activeSector, setActiveSector] = useState(sectorsData[0]);
  return <div className="bg-black text-white py-12 sm:py-16 lg:py-20 px-4 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto text-center w-full">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-eastdigital-orange/8 via-eastdigital-orange/12 to-eastdigital-orange/8 border border-eastdigital-orange/15 rounded-full mb-6 backdrop-blur-2xl shadow-lg shadow-eastdigital-orange/10">
          <span className="text-eastdigital-orange text-sm font-medium tracking-wider uppercase">INDUSTRY EXPERTISE</span>
        </div>
        <h2 className="sm:text-4xl md:text-5xl font-bold text-2xl text-left">
          Sectors We Transform
        </h2>
        <p className="text-base sm:text-lg text-eastdigital-lightgray mt-4 max-w-3xl mx-auto text-left font-light">
          Delivering innovative solutions across diverse industries with
          precision and expertise.
        </p>

        {/* Fixed Mobile Scrollable Tabs */}
        <div className="w-full my-8 md:my-10">
          <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex flex-nowrap justify-start md:justify-center items-center gap-2 sm:gap-4 min-w-max px-4 md:px-0 pb-2">
              {sectorsData.map(sector => <button key={sector.id} onClick={() => setActiveSector(sector)} className={cn("flex-shrink-0 whitespace-nowrap px-4 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm font-semibold rounded-full transition-all duration-300 backdrop-blur-md", activeSector.id === sector.id ? "bg-eastdigital-orange text-white shadow-lg" : "bg-white/10 text-white border border-white/20 hover:bg-white/20")}>
                  {sector.name}
                </button>)}
            </div>
          </div>
        </div>

        <div className="w-full">
          <h3 className="text-base font-normal mb-4 sm:mb-6 text-eastdigital-lightgray text-left">{activeSector.title}</h3>
          
          <div className="max-w-5xl mx-auto w-full">
            <Link to={activeSector.link} className="group cursor-pointer block w-full">
              <Card className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden border-gray-700">
                {activeSector.video ? <video key={activeSector.video} src={activeSector.video} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" autoPlay loop muted playsInline /> : <img key={activeSector.image} src={activeSector.image} alt={activeSector.showcaseTitle} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />}
                {/* Desktop-only Overlay */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="hidden md:absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 text-left text-white">
                  <div className="relative pl-4 sm:pl-6">
                    <div className="absolute left-0 top-1 bottom-1 w-1 bg-eastdigital-orange rounded-full" />
                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold">
                      {activeSector.showcaseTitle}
                    </h4>
                    <p className="mt-1 sm:mt-2 max-w-md text-sm sm:text-base font-normal text-eastdigital-lightgray">
                      {activeSector.showcaseDescription}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Mobile-only Text Content */}
              <div className="block md:hidden mt-4 text-left px-2">
                <h4 className="text-lg font-bold text-white">
                  {activeSector.showcaseTitle}
                </h4>
                <p className="mt-1 text-sm font-normal text-eastdigital-lightgray">
                  {activeSector.showcaseDescription}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>;
};
export default SectorsShowcase;