import {words} from '../../constants/index.js'
import SolarSystem from '../../components/SolarSystem.jsx'
import AnimatedCounter from '../../components/AnimatedCounter.jsx'
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

const Hero = ({ isLoaded }) => {

    useGSAP(() => {
        if (!isLoaded) return;

        gsap.fromTo('.hero-text h1', {
            y: 50,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1,
            ease: 'power2.inOut',
        });
    }, { dependencies: [isLoaded] });
    
    return (
        <section id="hero" className="relative pt-20">
            {/* Ambient Purple Glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[var(--color-accent)] opacity-20 blur-[120px] rounded-full pointer-events-none z-0" />
            
            {/* hero content*/}
            <div className="hero-layout pointer-events-none relative z-10">
                <header className="flex flex-col justify-center w-full md:px-20 px-5">
                    <div className="flex flex-col gap-8 max-w-3xl">
                        <div className="hero-text tracking-tight">
                            <h1 className="leading-tight">Shaping
                            <span className="slide inline-block">
                                <span className="wrapper">
                                    {words.map((word) => (
                                        <span key={word.text} className="flex items-center md:gap-3 gap-2 pb-2">
                                            <img src={word.imgPath} alt={word.text} className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10"/>
                                            <span className="text-[var(--color-accent)]">{word.text}</span>
                                        </span>
                                    ))}
                                </span>
                            </span>
                            </h1>
                            <h1 className="leading-tight">into Real Projects</h1>
                            <h1 className="leading-tight">that Deliver Results</h1>
                        </div>
                        <p className="text-zinc-400 md:text-xl text-lg relative z-10 pointer-events-none font-light max-w-xl leading-relaxed">
                            Hi, I'm Harshit, a Developer based in India with a passion for creative engineering and building highly polished experiences.
                        </p>

                        <a 
                            href="#work"
                            onClick={(e) => {
                                e.preventDefault();
                                const target = document.getElementById('work');
                                if(target){
                                    const offset = window.innerHeight * 0.15;
                                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                                    window.scrollTo({top, behavior: 'smooth'});
                                }
                            }}
                            className="pointer-events-auto w-fit flex items-center gap-3 px-8 py-4 rounded-full glass-2 text-white font-medium transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-[var(--color-accent)]/50 mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                            See my Work
                            <svg aria-hidden="true" className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        </a>
                    </div>
                </header>
            

            {/* Implemented Lightweight Monochrome Solar System Visual */}
            <figure className="pointer-events-auto w-full h-full min-h-[50vh] flex items-center justify-center">
                <div className="w-full h-full max-w-lg mx-auto">
                    <SolarSystem/>
                </div>
            </figure>
            </div>

            <AnimatedCounter/>
        </section>
    )
}
export default Hero
