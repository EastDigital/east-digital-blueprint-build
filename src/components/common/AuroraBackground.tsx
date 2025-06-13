import React from "react";

const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-[-10%] left-[10%] w-[400px] h-[400px] bg-purple-500 opacity-30 rounded-full mix-blend-lighten filter blur-3xl animate-blob1" />
      <div className="absolute top-[30%] left-[50%] w-[400px] h-[400px] bg-pink-500 opacity-30 rounded-full mix-blend-lighten filter blur-3xl animate-blob2" />
      <div className="absolute top-[60%] left-[30%] w-[400px] h-[400px] bg-blue-500 opacity-30 rounded-full mix-blend-lighten filter blur-3xl animate-blob3" />
    </div>
  );
};

export default AuroraBackground;
