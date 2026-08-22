import { useEffect, useRef } from "react";

/**
 * CustomCursor
 * ------------
 * A sophisticated, two-layer custom pointer system.
 * Layer 1: Fast, tiny solid dot tracking exact pointer position.
 * Layer 2: Subtle trailing ring with inertia for a smooth, premium feel.
 *
 * Performance:
 * - Uses a single requestAnimationFrame loop for inertia.
 * - Updates DOM directly via transform translate3d (compositor-only, zero reflow).
 * - Bypasses React state completely to prevent tree re-renders on mousemove.
 * - Event delegation on `document` handles interactive state toggling efficiently.
 *
 * Accessibility:
 * - Only active when CSS `@media (pointer: fine)` matches.
 * - Respects `prefers-reduced-motion` by snapping the trailing ring instantly.
 * - Does not interfere with tab navigation (focus rings remain native).
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Raw pointer coordinates
  const targetPos = useRef({ x: 0, y: 0 });
  // Inertia coordinates for the trailing ring
  const currentPos = useRef({ x: 0, y: 0 });

  const rafId = useRef(null);
  const isVisible = useRef(false);
  const isReducedMotion = useRef(false);

  useEffect(() => {
    // Detect reduced motion to disable the trailing inertia
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotion.current = motionQuery.matches;

    const handleMotionChange = (e) => {
      isReducedMotion.current = e.matches;
    };
    motionQuery.addEventListener("change", handleMotionChange);

    const onMouseMove = (e) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      // Reveal cursor on first movement
      if (!isVisible.current) {
        if (dotRef.current) dotRef.current.style.opacity = 1;
        if (ringRef.current) ringRef.current.style.opacity = 1;
        isVisible.current = true;
      }

      // Move the primary dot instantly for precise feedback
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseLeave = () => {
      // Hide when cursor leaves the browser window
      if (dotRef.current) dotRef.current.style.opacity = 0;
      if (ringRef.current) ringRef.current.style.opacity = 0;
      isVisible.current = false;
    };

    const onMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = 1;
      if (ringRef.current) ringRef.current.style.opacity = 1;
      isVisible.current = true;
    };

    const onMouseOver = (e) => {
      // Event delegation to detect hover on interactive elements
      // Includes generic interactive elements + our specific custom components
      const interactive = e.target.closest(
        'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"]), .project-card, .cta-button, .liquid-glass-nav, .liquid-glass-active'
      );

      if (interactive) {
        dotRef.current?.classList.add("is-active");
        ringRef.current?.classList.add("is-active");
      } else {
        dotRef.current?.classList.remove("is-active");
        ringRef.current?.classList.remove("is-active");
      }
    };

    // Render loop for the trailing ring
    const render = () => {
      if (isReducedMotion.current) {
        // Snap instantly if motion is reduced
        currentPos.current.x = targetPos.current.x;
        currentPos.current.y = targetPos.current.y;
      } else {
        // Smooth lerp for inertia (0.15 is a snappy but smooth factor)
        const lerp = 0.15;
        currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
        currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    // Attach listeners - passive for better scrolling performance
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    // Start loop
    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      motionQuery.removeEventListener("change", handleMotionChange);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      <div ref={ringRef} className="custom-cursor-ring">
        <div className="inner" />
      </div>
      <div ref={dotRef} className="custom-cursor-dot">
        <div className="inner" />
      </div>
    </div>
  );
};

export default CustomCursor;
