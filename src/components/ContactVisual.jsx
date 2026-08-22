import { useEffect, useRef } from "react";

const ContactVisual = () => {
    const svgRef = useRef(null);

    useEffect(() => {
        let frameId;
        let t = 0;

        const render = () => {
            t += 0.02;
            
            // Respect reduced motion
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                return;
            }

            if (svgRef.current) {
                // Gentle floating motion
                const envelope = svgRef.current.querySelector('.envelope-group');
                const nodes = svgRef.current.querySelector('.nodes-group');

                if (envelope) {
                    envelope.style.transform = `translateY(${Math.sin(t * 1.5) * 8}px) rotate(${Math.sin(t * 0.5) * 2}deg)`;
                }
                
                if (nodes) {
                    nodes.style.transform = `translateY(${Math.cos(t * 1.2) * 5}px) rotate(${t * 2}deg)`;
                }
            }

            frameId = requestAnimationFrame(render);
        };

        frameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center relative overflow-hidden pointer-events-none bg-black-200">
            {/* Background ambient glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)]" />

            <svg 
                ref={svgRef}
                viewBox="0 0 600 600" 
                className="w-full max-w-md h-auto opacity-90 transition-transform duration-700 ease-out hover:scale-105 hover:rotate-1"
            >
                <defs>
                    <linearGradient id="mailGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
                    </linearGradient>
                    <linearGradient id="mailBase" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.02)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.15)" />
                    </linearGradient>
                    <filter id="softGlow">
                        <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* Ambient orbital nodes (Communication Hub Concept) */}
                <g className="nodes-group" style={{ transformOrigin: '300px 300px' }}>
                    <circle cx="300" cy="300" r="180" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 12" />
                    <circle cx="300" cy="300" r="240" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    
                    {/* Data nodes */}
                    <circle cx="120" cy="300" r="4" fill="rgba(255,255,255,0.5)" filter="url(#softGlow)" />
                    <circle cx="480" cy="300" r="3" fill="rgba(255,255,255,0.3)" />
                    <circle cx="300" cy="60" r="5" fill="rgba(255,255,255,0.7)" filter="url(#softGlow)" />
                    
                    {/* Connecting lines */}
                    <line x1="120" y1="300" x2="220" y2="250" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="300" y1="60" x2="300" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="480" y1="300" x2="380" y2="320" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2 4" />
                </g>

                {/* Central Floating Envelope (3D Isometric Illusion) */}
                <g className="envelope-group" style={{ transformOrigin: '300px 300px' }}>
                    {/* Envelope shadow */}
                    <ellipse cx="300" cy="420" rx="90" ry="15" fill="rgba(0,0,0,0.5)" filter="blur(8px)" />
                    
                    {/* Envelope Body */}
                    <path d="M 180 220 L 420 220 L 420 360 L 180 360 Z" fill="url(#mailBase)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    
                    {/* Envelope Flap (Open) */}
                    <path d="M 180 220 L 300 150 L 420 220" fill="none" stroke="url(#mailGlow)" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M 180 220 L 300 150 L 420 220 Z" fill="rgba(255,255,255,0.03)" />

                    {/* Inside Letter / Paper */}
                    <path d="M 200 200 L 400 200 L 400 260 L 200 260 Z" fill="rgba(255,255,255,0.9)" />
                    <line x1="220" y1="220" x2="360" y2="220" stroke="rgba(0,0,0,0.2)" strokeWidth="4" strokeLinecap="round" />
                    <line x1="220" y1="240" x2="300" y2="240" stroke="rgba(0,0,0,0.2)" strokeWidth="4" strokeLinecap="round" />
                    
                    {/* Front Flaps */}
                    <path d="M 180 220 L 300 310 L 420 220" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M 180 360 L 300 310 L 420 360" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinejoin="round" />
                </g>
            </svg>
        </div>
    );
};

export default ContactVisual;
