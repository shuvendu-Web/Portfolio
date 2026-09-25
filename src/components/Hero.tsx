import React from "react";
import RobotHero from "@/components/ui/robot-hero";

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative w-full">
      <RobotHero
        backgroundText="SHUVENDU DHENKI"
        subtitle="UI/UX Designer, Web & Mobile App Designer"
        pantallaColor="#00f0ff"
        color="#c4c4c4"
        scale={1.2}
      />
    </section>
  );
};

export default Hero;
