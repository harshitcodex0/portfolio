import React, { useState, useEffect } from 'react';
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
        <div id="counter" className="padding-x-lg xl:mt-0 mt-32">
            <div className="mx-auto grid-4-cols">
                {counterItems.map((item) => (
                    <div key={item.label} className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center">
                        <div className="counter-number text-white text-5xl font-bold mb-2">
                            <CountUp suffix={item.suffix} end={item.value} />
                        </div>
                        <div className="text-white-50 text-lg">{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AnimatedCounter;

