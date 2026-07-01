import { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import Loader from "./components/Loader.jsx";
import Hero from './components/sections/Hero.jsx'
import Navbar from './components/Navbar.jsx'
import ShowcaseSection from "./components/sections/ShowcaseSection.jsx";
import LogoSection from "./components/sections/LogoSection.jsx";
import FeatureCard from "./components/sections/FeatureCard.jsx";
import ExperienceSection from "./components/sections/ExperienceSection.jsx";
import TechStack from "./components/sections/TechStack.jsx";
import SkillsSection from "./components/sections/SkillsSection.jsx";
import Contact from "./components/sections/Contact.jsx";
import LiquidButton from "./components/LiquidButton.jsx";
import Footer from "./components/sections/Footer.jsx";

const App = () => {
    const { progress } = useProgress();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (progress === 100) {
            const timer = setTimeout(() => {
                setIsLoaded(true);
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [progress]);

    // Fallback in case 3D models load instantly or something hangs
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Loader isLoaded={isLoaded} />
            <Navbar />
            <Hero isLoaded={isLoaded} />
            <ShowcaseSection/>
            <LogoSection/>
            <FeatureCard/>
            <ExperienceSection/>
            <TechStack/>
            <SkillsSection/>
            <div className="flex justify-center items-center py-10  w-full">
                <LiquidButton 
                    href="https://docs.google.com/document/d/1V-X8nuFYuCm5Cg-mY8dW4XNp_6tVJ8Ix/edit?usp=drive_link&ouid=102257691683634290526&rtpof=true&sd=true" 
                    target="_blank"
                    rel="noreferrer"
                    className="hover:!bg-white hover:!text-black active:!scale-110 !px-10 !py-4 text-xl font-bold"
                >
                    Resume
                </LiquidButton>
            </div>
            <Contact/>
            <Footer/>
        </>
    )
}
export default App
