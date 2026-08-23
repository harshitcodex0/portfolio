import { useState, useEffect } from "react";
import Loader from "./components/Loader.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import AmbientParticles from "./components/AmbientParticles.jsx";
import Hero from './components/sections/Hero.jsx'
import Navbar from './components/Navbar.jsx'
import ShowcaseSection from "./components/sections/ShowcaseSection.jsx";
import LogoSection from "./components/sections/LogoSection.jsx";
import ExperienceSection from "./components/sections/ExperienceSection.jsx";
import SkillsSection from "./components/sections/SkillsSection.jsx";
import Contact from "./components/sections/Contact.jsx";
import Footer from "./components/sections/Footer.jsx";

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Since we've removed heavy 3D models, we no longer need to track WebGL asset loading.
    // We simply use a short artificial delay to allow fonts and initial layout to settle
    // before animating in the hero section.
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <CustomCursor />
            <AmbientParticles />
            <Loader isLoaded={isLoaded} />
            <Navbar />
            <Hero isLoaded={isLoaded} />
            <ShowcaseSection/>
            <LogoSection/>
            <ExperienceSection/>
            <SkillsSection/>
            <div className="flex justify-center items-center py-20 w-full relative z-10">
                <a 
                    href="https://docs.google.com/document/d/1V-X8nuFYuCm5Cg-mY8dW4XNp_6tVJ8Ix/edit?usp=drive_link&ouid=102257691683634290526&rtpof=true&sd=true" 
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-12 py-5 rounded-full glass-2 text-white font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:border-[var(--color-accent)]/50 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                    View Resume
                    <svg aria-hidden="true" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
            </div>
            <Contact/>
            <Footer/>
        </>
    )
}
export default App
