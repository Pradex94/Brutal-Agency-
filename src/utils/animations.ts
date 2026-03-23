import { Variants } from 'motion/react';

// Premium Easings
export const EXPO_OUT = [0.22, 1, 0.36, 1] as any;
export const QUART_OUT = [0.25, 1, 0.5, 1] as any;
export const BACK_OUT = [0.34, 1.56, 0.64, 1] as any;

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: EXPO_OUT }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.4, ease: EXPO_OUT }
  }
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: EXPO_OUT }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      ease: EXPO_OUT
    }
  }
};

export const hoverLift = {
  hover: {
    y: -8,
    rotate: -1,
    transition: { duration: 0.4, ease: EXPO_OUT }
  }
};

export const buttonInteraction = {
  hover: {
    scale: 1.02,
    y: -2,
    transition: { duration: 0.3, ease: EXPO_OUT }
  },
  tap: {
    scale: 0.98,
    y: 1,
    transition: { duration: 0.1, ease: EXPO_OUT }
  }
};

export const textReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EXPO_OUT }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: EXPO_OUT }
  }
};
