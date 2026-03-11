import { Variants } from "framer-motion";

export const fadeIn = (direction: "up" | "down" | "left" | "right", delay: number): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
      opacity: 0,
      x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
      transition: {
        type: "tween" as const,
        duration: 0.15,
        delay: delay,
        ease: [0.25, 0.6, 0.3, 0.8],
      },
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween" as const,
        duration: 0.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

export const staggerContainer = (staggerChildren: number, delayChildren: number = 0): Variants => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren,
      },
    },
  };
};
