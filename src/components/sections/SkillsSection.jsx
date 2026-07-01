import { useRef } from "react";
import TitleHeader from "../HeroModels/TitleHeader.jsx";
import { skillsData } from "../../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassButton from "../GlassButton.jsx";
import LiquidButton from "../LiquidButton.jsx";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
    const cardRefs = useRef([]);

    const handleMouseMove = (index) => (e) => {
        const card = cardRefs.current[index];
        if(!card) return;

        //Get the mouse point relative to the card
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        //Calc the angle form the center of the card
        let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
        angle = (angle + 360) % 360;
        
        card.style.setProperty("--start", angle+60);
    }

    useGSAP(() => {
        gsap.utils.toArray('.skill-category-card').forEach((card) => {
            // Animate the card fading and sliding up
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

            // Animate each skill pill inside the card
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
        <div id="skills-section" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5 max-w-7xl">
                <TitleHeader
                    sub="🧑‍💻Technical Expertise"
                />
                <GlassButton heading={"My Skills"}/>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                    {skillsData.map((category, index) => (
                        <div 
                            key={index} 
                            ref={(el) => (cardRefs.current[index] = el)} 
                            onMouseMove={handleMouseMove(index)} 
                            className="skill-category-card card card-border bg-black-100 p-8 rounded-[24px] flex flex-col gap-4 relative overflow-hidden group"
                        >
                            <div className="glow" />
                            <h3 className="text-2xl font-semibold text-white mb-2 relative z-10">{category.category}</h3>
                            <div className="flex flex-wrap gap-3 relative z-10">
                                {category.skills.map((skill, skillIndex) => (
                                    <div 
                                        key={skillIndex} 
                                        className="skill-pill px-4 py-2 rounded-full border border-white/10 text-white-50 text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black hover:border-white shadow-sm cursor-default"
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
