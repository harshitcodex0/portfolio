import {words} from '../../constants/index.js'
import Button from '../../components/Button.jsx'
import HeroExperience from '../../components/HeroModels/HeroExperience.jsx'
const Hero = () => {
    return (
        <section id="hero" className="relative">
            <div className="absolute top-0 left-0 z-10 pointer-events-none">
            <img src="/images/bg.png" alt="background"></img>
            </div>
            {/* hero content*/}
            <div className="hero-layout pointer-events-none">
                <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
                    <div className="flex flex-col gap-7">
                        <div className="hero-text">
                            <h1>Shaping
                            <span className="slide">
                                <span className="wrapper">
                                    {words.map((word) => (
                                        <span key={word.text} className="flex items-center md:gap-3 gap-1 pb-2">
                                            <img src={word.imgPath} alt={word.text} className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"/>

                                            <span>{word.text}</span>
                                        </span>
                                    ))}
                                </span>
                            </span>
                            </h1>
                            <h1>into Real Projects</h1>
                            <h1>that Deliver Results</h1>
                        </div>
                        <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
                            Hi, I'm Harshit, a Developer based in India with a passion to code.
                        </p>

                        <Button
                        className="md:w-80 md:h-16 w-60 h-12 pointer-events-auto"
                        id="button"
                        text="See my Work"
                        />
                        
                    </div>
                </header>
            </div>

            {/* Implemented 3D Model */}
            <figure className="pointer-events-auto">
                <div className="hero-3d-layout">
                <HeroExperience/>
                </div>
            </figure>
        </section>
    )
}
export default Hero
