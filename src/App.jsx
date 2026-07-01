import Hero from './components/sections/Hero.jsx'
import Navbar from './components/Navbar.jsx'
import ShowcaseSection from "./components/sections/ShowcaseSection.jsx";
import LogoSection from "./components/sections/LogoSection.jsx";
import FeatureCard from "./components/sections/FeatureCard.jsx";
import ExperienceSection from "./components/sections/ExperienceSection.jsx";

const App = () => {
    return (
        <>
            <Navbar />
            <Hero/>
            <ShowcaseSection/>
            <LogoSection/>
            <FeatureCard/>
            <ExperienceSection/>
        </>
    )
}
export default App
