import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GlassButton from "../GlassButton.jsx";
import ProjectCard from "../ProjectCard.jsx";
import { PROJECTS } from "../../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".project-card-wrapper", sectionRef.current);
    
    // Lightweight scroll animation: fade and slide up slightly as they enter viewport
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // Trigger when top of card hits 85% of viewport
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  // 1. Group projects into pairs (rows)
  const rows = [];
  for (let i = 0; i < PROJECTS.length; i += 2) {
    rows.push(PROJECTS.slice(i, i + 2));
  }

  return (
    <section id="work" className="w-full mt-20 relative pb-32" aria-label="Projects">
      <div className="w-full max-w-7xl mx-auto px-5 md:px-12 lg:px-20 pt-10">
        
        {/* Section Header */}
        <GlassButton heading="PROJECTS" />

        {/* Dynamic Project Grid */}
        <div ref={sectionRef} className="flex flex-col gap-10 md:gap-12 w-full mt-12">
          {rows.map((row, rowIdx) => {
            // Determine column ratio based on row index
            const isEvenRow = rowIdx % 2 === 0;
            
            // If it's a single item (odd number of projects at the end), it takes 100%
            const gridCols = row.length === 1 
              ? "grid-cols-1" 
              : (isEvenRow ? "lg:grid-cols-[6fr_4fr]" : "lg:grid-cols-[4fr_6fr]");

            return (
              <div key={rowIdx} className={`grid grid-cols-1 gap-10 md:gap-12 ${gridCols}`}>
                {row.map((project, colIdx) => {
                  // The card is 'large' (60%) if it's alone, or if it's the first in an even row, or second in an odd row
                  const isLarge = row.length === 1 || (isEvenRow ? colIdx === 0 : colIdx === 1);
                  
                  return (
                    <div key={project.id} className="project-card-wrapper h-full">
                      <ProjectCard project={project} isLarge={isLarge} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default ShowcaseSection;
