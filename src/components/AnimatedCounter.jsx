import { useState, useEffect } from 'react';
import { counterItems } from "../constants/index.js";

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // Easing function: easeOutQuad for smooth deceleration
            const easeOutQuad = percentage * (2 - percentage);
            
            setCount(Math.floor(easeOutQuad * end));

            if (percentage < 1) {
                requestAnimationFrame(animate);
            }
        };

        const animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [end, duration]);

    return <span>{count}{suffix}</span>;
};

const AnimatedCounter = () => {
    return (
        <div id="counter" className="w-full max-w-7xl mx-auto px-5 md:px-20 mt-20 md:mt-32">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {counterItems.map((item) => (
                    <div key={item.label} className="glass-2 border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col justify-center items-center text-center transition-all duration-300 hover:bg-white/5 hover:border-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                        <div className="text-[var(--color-accent)] text-4xl md:text-5xl font-bold mb-3 tracking-tight shadow-sm" style={{ textShadow: "0 0 20px rgba(168,85,247,0.4)" }}>
                            <CountUp suffix={item.suffix} end={item.value} />
                        </div>
                        <div className="text-zinc-400 text-sm md:text-base font-medium leading-tight">{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AnimatedCounter;

