
import TitleHeader from '../TitleHeader.jsx';
import { skillsData } from "../../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassButton from "../GlassButton.jsx";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
    useGSAP(() => {
        gsap.utils.toArray('.skill-category-card').forEach((card) => {
            gsap.fromTo(card, 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    }
                }
            );

            const pills = card.querySelectorAll('.skill-pill');
            gsap.fromTo(pills, 
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    }
                }
            );
        });
    });

    return (
        <div id="skills-section" className="flex-center section-padding pt-32">
            <div className="w-full h-full md:px-10 px-5 max-w-7xl mx-auto">
                <TitleHeader sub="🧑‍💻 Technical Expertise" />
                <GlassButton heading="MY SKILLS" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-20">
                    {skillsData.map((category, index) => (
                        <div 
                            key={index} 
                            className="skill-category-card glass-2 border border-white/5 p-8 md:p-10 rounded-[2rem] flex flex-col gap-6 relative overflow-hidden group transition-all duration-300 hover:bg-white/5 hover:border-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight relative z-10">
                                {category.category}
                            </h3>
                            <div className="flex flex-wrap gap-2 md:gap-3 relative z-10">
                                {category.skills.map((skill, skillIndex) => (
                                    <div 
                                        key={skillIndex} 
                                        className="skill-pill px-4 py-2 rounded-full border border-white/10 text-zinc-300 text-sm font-medium bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/50 hover:text-white hover:bg-[var(--color-accent)]/10 shadow-sm cursor-default"
                                    >
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default SkillsSection;
