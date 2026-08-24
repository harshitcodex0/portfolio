
import {socialImgs} from "../../constants/index.js";

const Footer = () => {
    return (
        <footer className="w-full mt-20 border-t border-white/5 py-10 px-5 md:px-20 relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
                
                <div className="flex-1 flex justify-center md:justify-start">
                    <a href="/" className="text-zinc-400 hover:text-[var(--color-accent)] transition-colors duration-300 font-medium rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]">
                        HARSHIT
                    </a>
                </div>

                <div className="flex-1 flex justify-center gap-4">
                    {socialImgs.map((img) => (
                        <a 
                            key={img.url}
                            href={img.url}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-2 border border-white/5 flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                            aria-label={`Visit my profile`}
                        >
                            <img src={img.imgPath} alt="" aria-hidden="true" className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100" />
                        </a>
                    ))}
                </div>

                <div className="flex-1 flex justify-center md:justify-end">
                    <p className="text-zinc-500 text-sm font-light text-center md:text-right">
                        © {new Date().getFullYear()} Harshit | The Zenith Company.<br className="hidden md:block" /> All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    )
}
export default Footer
