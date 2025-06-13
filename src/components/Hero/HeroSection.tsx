import AuroraBackground from "../common/AuroraBackground";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      <AuroraBackground />
      <h1 className="text-5xl font-bold z-10">Empowering the Digital Future</h1>
      <p className="text-lg mt-4 z-10">With cutting-edge AI and creative tech.</p>
    </section>
  );
};

export default HeroSection;
