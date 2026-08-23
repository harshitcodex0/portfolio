
import TitleHeader from '../TitleHeader.jsx';
import {expCards} from "../../constants/index.js";
import GlassButton from "../GlassButton.jsx";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



const ExperienceSection = () => {
    useGSAP(()=> {
        gsap.utils.toArray('.timeline-card').forEach((card) => {
            gsap.from(card, {
                x: -30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%"
                }
            })
        })

        gsap.to('.timeline-progress',{
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
                trigger: '.timeline-container',
                start: 'top 60%',
                end: 'bottom 60%',
                scrub: true,
                onUpdate: (self) => {
                    gsap.to('.timeline-progress', {
                        scaleY: self.progress,
                        duration: 0.1,
                        overwrite: "auto"
                    })
                }
            }
        })
    }, []);
    
    return (
        <section id="experience" className="w-full md:mt-40 section-padding xl:px-0">
            <div className="w-full h-full max-w-7xl mx-auto md:px-20 px-5">
                <TitleHeader sub="🎓 My Journey" />
                <GlassButton heading="EDUCATION" />

                <div className="mt-20 md:mt-32 relative timeline-container ml-4 md:ml-10">
                    {/* Timeline Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
                    <div className="timeline-progress absolute left-0 top-0 bottom-0 w-px bg-[var(--color-accent)] scale-y-0 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />

                    <div className="relative z-10 space-y-16 md:space-y-24">
                        {expCards.map((card) => (
                            <div key={card.title} className="timeline-card relative pl-8 md:pl-16">
                                {/* Timeline Node */}
                                <div className="absolute left-[-5px] top-8 w-3 h-3 rounded-full bg-black border-2 border-[var(--color-accent)] shadow-[0_0_10px_rgba(168,85,247,0.5)]" />

                                <div className="glass-2 border border-white/5 rounded-3xl p-6 md:p-10 flex flex-col xl:flex-row gap-8 xl:gap-12 transition-all duration-300 hover:bg-white/5 hover:border-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                                    
                                    {/* Content Section */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-full glass-3 flex items-center justify-center p-2 border border-white/10">
                                                <img src={card.logoPath} alt="Logo" className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <h1 className="font-bold text-xl md:text-2xl text-white tracking-tight leading-snug">{card.title}</h1>
                                                <p className="text-[var(--color-accent)] text-sm font-medium mt-1">{card.date}</p>
                                            </div>
                                        </div>

                                        <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 font-light">
                                            {card.review}
                                        </p>

                                        <div className="space-y-3">
                                            <p className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">Key Focus Areas</p>
                                            <ul className="flex flex-col gap-3">
                                                {card.responsibilities.map((responsibility, i) => (
                                                    <li key={i} className="text-zinc-400 text-sm md:text-base flex items-start gap-3">
                                                        <span className="text-[var(--color-accent)] mt-1.5 opacity-70">▹</span>
                                                        <span className="flex-1 font-light">{responsibility}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Decorative Image */}
                                    <div className="xl:w-[300px] shrink-0 hidden md:block">
                                        <div className="w-full h-full min-h-[200px] rounded-2xl overflow-hidden glass-3 border border-white/5 relative p-4 flex flex-col justify-end">
                                            <img src={card.imgPath} alt={card.title} className="w-full h-full object-cover rounded-xl absolute inset-0 opacity-40 mix-blend-luminosity" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                            <div className="relative z-10 flex gap-1 text-[var(--color-accent)]">
                                                {/* Futuristic dots instead of classic stars */}
                                                <div className="w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_5px_currentColor]" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_5px_currentColor]" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_5px_currentColor]" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_5px_currentColor]" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_5px_currentColor]" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ExperienceSection
