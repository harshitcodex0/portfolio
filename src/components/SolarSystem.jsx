import { useEffect, useRef } from "react";

const SolarSystem = () => {
    const svgRef = useRef(null);

    useEffect(() => {
        let frameId;
        let t = 0;

        const render = () => {
            t += 0.003;
            
            // Respect reduced motion
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                return;
            }

            if (svgRef.current) {
                // Get all orbital rings and planets
                const orbit1 = svgRef.current.querySelector('.orbit-1');
                const orbit2 = svgRef.current.querySelector('.orbit-2');
                const orbit3 = svgRef.current.querySelector('.orbit-3');
                const orbit4 = svgRef.current.querySelector('.orbit-4');

                // Rotate them slowly at different speeds
                if (orbit1) orbit1.style.transform = `rotate(${t * 15}deg)`;
                if (orbit2) orbit2.style.transform = `rotate(${t * -10}deg)`;
                if (orbit3) orbit3.style.transform = `rotate(${t * 8}deg)`;
                if (orbit4) orbit4.style.transform = `rotate(${t * -5}deg)`;
            }

            frameId = requestAnimationFrame(render);
        };

        frameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center relative overflow-hidden pointer-events-none">
            {/* Core anchor glow (very subtle off-white) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_50%)] rounded-full blur-2xl" />
            
            <svg 
                ref={svgRef}
                viewBox="0 0 800 800" 
                className="w-full max-w-2xl h-auto opacity-80 transition-transform duration-1000 ease-out hover:scale-[1.02]"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                        <stop offset="50%" stopColor="rgba(255, 255, 255, 0.05)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                    </linearGradient>
                    <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
                        <stop offset="30%" stopColor="rgba(255, 255, 255, 0.8)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                    </radialGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* Central Anchor / "Star" */}
                <circle cx="400" cy="400" r="12" fill="url(#sunGrad)" filter="url(#glow)" />
                <circle cx="400" cy="400" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                
                {/* Orbit 1 (Fastest, innermost) */}
                <g className="orbit-1" style={{ transformOrigin: '400px 400px' }}>
                    <circle cx="400" cy="400" r="100" fill="none" stroke="url(#orbitGrad)" strokeWidth="0.5" strokeDasharray="4 8" />
                    {/* Planet 1 */}
                    <circle cx="500" cy="400" r="3" fill="#fff" filter="url(#glow)" />
                    {/* Moon of Planet 1 */}
                    <circle cx="508" cy="392" r="1" fill="rgba(255,255,255,0.6)" />
                </g>

                {/* Orbit 2 */}
                <g className="orbit-2" style={{ transformOrigin: '400px 400px' }}>
                    <circle cx="400" cy="400" r="180" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                    <circle cx="400" cy="400" r="180" fill="none" stroke="url(#orbitGrad)" strokeWidth="1.5" strokeDasharray="1 15" strokeLinecap="round" />
                    {/* Planet 2 */}
                    <circle cx="220" cy="400" r="5" fill="#fff" filter="url(#glow)" />
                    {/* Planet 2 Rings */}
                    <ellipse cx="220" cy="400" rx="12" ry="3" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" transform="rotate(30 220 400)" />
                </g>

                {/* Orbit 3 (Mid distance) */}
                <g className="orbit-3" style={{ transformOrigin: '400px 400px' }}>
                    <circle cx="400" cy="400" r="260" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                    {/* Planet 3 */}
                    <circle cx="400" cy="140" r="8" fill="rgba(255,255,255,0.9)" filter="url(#glow)" />
                    <circle cx="400" cy="140" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="2 4" />
                    <circle cx="400" cy="122" r="1.5" fill="#fff" />
                </g>

                {/* Orbit 4 (Outermost, slowest) */}
                <g className="orbit-4" style={{ transformOrigin: '400px 400px' }}>
                    <circle cx="400" cy="400" r="340" fill="none" stroke="url(#orbitGrad)" strokeWidth="0.5" strokeDasharray="4 20" />
                    {/* Planet 4 */}
                    <circle cx="640" cy="640" r="4" fill="rgba(255,255,255,0.7)" filter="url(#glow)" />
                </g>

                {/* Distant ambient orbital dust / stars */}
                <g className="opacity-40">
                    <circle cx="150" cy="200" r="1" fill="#fff" />
                    <circle cx="650" cy="150" r="1.5" fill="#fff" />
                    <circle cx="250" cy="650" r="0.8" fill="#fff" />
                    <circle cx="700" cy="500" r="1" fill="#fff" />
                </g>
            </svg>
        </div>
    );
};

export default SolarSystem;
