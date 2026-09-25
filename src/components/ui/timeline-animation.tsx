import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface TimelineContentProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  animationNum?: number;
  customVariants?: Variants | any;
  timelineRef?: React.RefObject<HTMLDivElement | null>;
}

export const TimelineContent: React.FC<TimelineContentProps> = ({
  children,
  as = "div",
  className = "",
  animationNum = 0,
  customVariants,
}) => {
  const Component = motion.create(as as any);

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: -20, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <Component
      className={className}
      custom={animationNum}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={customVariants || defaultVariants}
    >
      {children}
    </Component>
  );
};

export default TimelineContent;
