import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GlassButton from "../GlassButton.jsx";
import ProjectCard from "../ProjectCard.jsx";
import { PROJECTS } from "../../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

/**
 * ShowcaseSection
 * ---------------
 * Maps over the PROJECTS constant and renders a responsive card grid.
 *
 * Layout behaviour
 * ----------------
 * Mobile  : single-column vertical stack (natural document flow, no horizontal
 *           gesture conflicts, subtle fade-up on scroll).
 * Tablet  : two-column grid.
 * Desktop : up to three-column grid — first card spans two columns to give
 *           the featured project premium real estate.
 *
 * Animation
 * ---------
 * Each card fades + slides up independently when it enters the viewport,
 * using a small stagger so the eye reads left-to-right, top-to-bottom.
 */
const ShowcaseSection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Section fade-in on mount
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" }
    );

    // Staggered card entrance on scroll — scoped to this section only so the
    // selector never accidentally matches .project-card elements in other sections.
    gsap.utils.toArray(".project-card", sectionRef.current).forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: i * 0.05,
          // clearProps:"transform" releases GSAP's inline transform after the entrance
          // completes, returning full transform control to the CSS perspective() tilt
          // system in ProjectCard. Without this, GSAP's residual inline style
          // (transform: matrix(...)) permanently overrides the CSS tilt on hover.
          clearProps: "transform",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="w-full mt-20 px-5 md:px-20 py-10 md:py-20 flex items-center justify-center"
      aria-label="Projects"
    >
      <div className="w-full max-w-7xl">
        {/* Section heading */}
        <GlassButton heading="PROJECTS" />

        {/*
          Responsive grid
          ─────────────────────────────────────
          xs-md  : 1 column
          md-xl  : 2 columns
          xl+    : 3 columns, first card featured (col-span-2)

          The featured treatment is applied only when there are 2+ projects so
          the grid never ends up with a lone card in a 2-col span that looks odd.
        */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6 md:gap-8
            mt-6
          "
          role="list"
          aria-label="Projects"
        >
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              role="listitem"
              className={
                // Feature the first card at xl breakpoint only
                index === 0 && PROJECTS.length > 1
                  ? "xl:col-span-2"
                  : ""
              }
            >
              {/* index prop removed — ProjectCard does not use it */}
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
