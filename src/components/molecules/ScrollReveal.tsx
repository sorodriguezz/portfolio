"use client";

import { useEffect } from "react";

/**
 * Animates each top-level section of the snap container into view as the user
 * scrolls, giving a smooth, fluid transition between slides instead of a hard
 * jump. Renders nothing — it only wires up an IntersectionObserver.
 */
export function ScrollReveal() {
  useEffect(() => {
    const scroller =
      document.querySelector<HTMLElement>("main.snap-container");
    if (!scroller) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return; // leave everything visible, no animation

    const targets = Array.from(scroller.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const alreadyInView =
        rect.top < window.innerHeight * 0.85 && rect.bottom > 0;

      if (alreadyInView) {
        // Show instantly (no flash, no double-animation with inner content).
        el.classList.add("reveal-on-scroll", "is-visible");
      } else {
        el.classList.add("reveal-on-scroll");
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
