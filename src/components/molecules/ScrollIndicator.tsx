"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * A scroll affordance: an animated "mouse" with a moving wheel dot plus a
 * bouncing chevron, fixed at the bottom-center of the hero. It fades out once
 * the user starts scrolling and jumps to the next section when clicked.
 */
export function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const container =
      document.querySelector<HTMLElement>("main.snap-container");
    if (!container) return;

    const handleScroll = () => {
      setVisible(container.scrollTop < window.innerHeight * 0.4);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNext = () => {
    document
      .getElementById("proyectos")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4 }}
          onClick={scrollToNext}
          aria-label="Desplazar hacia abajo"
          className="group fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2 cursor-pointer"
        >
          {/* Mouse body */}
          <div className="flex h-9 w-5.5 justify-center rounded-full border-2 border-text-secondary/60 pt-1.5 transition-colors group-hover:border-primary">
            <motion.span
              animate={{ y: [0, 9, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1 rounded-full bg-primary"
            />
          </div>

          {/* Chevron */}
          <motion.div
            animate={{ y: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-text-secondary transition-colors group-hover:text-primary"
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
