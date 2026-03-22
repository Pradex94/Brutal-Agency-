'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smoother spring for the magnetic feel
  const springConfig = { damping: 35, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (hoveredElement) {
        const rect = hoveredElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // Magnetic pull: move cursor 35% towards center if nearby
        // This creates the "stick" effect
        const pull = 0.35;
        cursorX.set(e.clientX - distanceX * pull);
        cursorY.set(e.clientY - distanceY * pull);
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('button, a, .cursor-pointer') as HTMLElement;
      
      if (interactive) {
        setIsHovering(true);
        setHoveredElement(interactive);
      } else {
        setIsHovering(false);
        setHoveredElement(null);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, hoveredElement]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-neon-green border-2 border-brutal-black rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        left: -12,
        top: -12,
      }}
      animate={{
        scale: isHovering ? 3.5 : 1,
        backgroundColor: isHovering ? '#eaea00' : '#2ff801',
        borderWidth: isHovering ? '1px' : '2px',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    />
  );
}
