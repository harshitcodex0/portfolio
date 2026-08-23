import { useEffect, useRef } from "react";

const techWords = [
    'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'C++', 'Java', 
    'MongoDB', 'Redis', 'AWS', 'Docker', 'Git', 'GitHub', 'Next.js', 'Tailwind', 
    'AI', 'Machine Learning', 'Algorithms', 'APIs', 'REST', 'Web Development', 
    'Cloud', 'System Design'
];

const AmbientParticles = () => {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: -1000, y: -1000 });
    const scrollY = useRef(0);
    const isReducedMotion = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        
        let animationFrameId;
        let particles = [];
        let wordObjects = [];
        let dpr = window.devicePixelRatio || 1;
        let width, height;
        let lastScrollY = window.scrollY;
        scrollY.current = window.scrollY;

        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        isReducedMotion.current = mediaQuery.matches;
        const handleMotionChange = (e) => {
            isReducedMotion.current = e.matches;
        };
        mediaQuery.addEventListener("change", handleMotionChange);

        const initParticles = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);

            // Richer atmospheric density without overwhelming GPU
            let count = 150; // High-end / Desktop
            let wordCount = 12; // High-end / Desktop
            
            if (width < 768) {
                count = 50; // Mobile
                wordCount = 4;
            } else if (width < 1024) {
                count = 90; // Tablet
                wordCount = 7;
            }

            particles = [];
            for (let i = 0; i < count; i++) {
                const isLarge = Math.random() > 0.95; // 5% chance of being a large out-of-focus particle
                const isPurple = Math.random() > 0.85; // 15% chance of being purple accent
                const size = isLarge ? Math.random() * 2.5 + 1.5 : Math.random() * 1.2 + 0.3;
                const alpha = isLarge ? Math.random() * 0.15 + 0.05 : Math.random() * 0.3 + 0.1;
                const parallaxFactor = isLarge ? Math.random() * 0.8 + 0.5 : Math.random() * 0.4 + 0.1;

                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size,
                    speedX: (Math.random() - 0.5) * (isLarge ? 0.2 : 0.1),
                    speedY: (Math.random() - 0.5) * (isLarge ? 0.2 : 0.1),
                    alpha,
                    parallaxFactor,
                    isLarge,
                    isPurple
                });
            }

            wordObjects = [];
            for (let i = 0; i < wordCount; i++) {
                const text = techWords[Math.floor(Math.random() * techWords.length)];
                const fontSize = Math.random() * 10 + 12; // 12 to 22px
                const alpha = Math.random() * 0.03 + 0.01; // extremely subtle: 0.01 to 0.04
                const parallaxFactor = Math.random() * 0.2 + 0.05;
                
                wordObjects.push({
                    text,
                    x: Math.random() * width,
                    y: Math.random() * height,
                    fontSize,
                    speedX: (Math.random() - 0.5) * 0.05,
                    speedY: (Math.random() - 0.5) * 0.05,
                    alpha,
                    parallaxFactor
                });
            }
        };

        const onMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };
        
        const onMouseLeave = () => {
            mouse.current.x = -1000;
            mouse.current.y = -1000;
        };

        const onScroll = () => {
            scrollY.current = window.scrollY;
        };

        let resizeTimer;
        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(initParticles, 200);
        };

        const onVisibilityChange = () => {
            if (document.hidden) {
                cancelAnimationFrame(animationFrameId);
            } else {
                lastScrollY = window.scrollY;
                render();
            }
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseleave", onMouseLeave, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize, { passive: true });
        document.addEventListener("visibilitychange", onVisibilityChange, { passive: true });

        initParticles();

        const render = () => {
            ctx.clearRect(0, 0, width, height);
            
            const deltaScroll = scrollY.current - lastScrollY;
            lastScrollY = scrollY.current;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                if (!isReducedMotion.current) {
                    p.x += p.speedX;
                    p.y += p.speedY;
                    p.y -= deltaScroll * p.parallaxFactor;

                    const dx = mouse.current.x - p.x;
                    const dy = mouse.current.y - p.y;
                    
                    if (Math.abs(dx) < 150 && Math.abs(dy) < 150) {
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 150) {
                            const force = (150 - dist) / 150;
                            p.x -= (dx / dist) * force * p.parallaxFactor * 1.5;
                            p.y -= (dy / dist) * force * p.parallaxFactor * 1.5;
                        }
                    }

                    if (p.x < -20) p.x = width + 20;
                    if (p.x > width + 20) p.x = -20;
                    if (p.y < -100) p.y = height + 100;
                    if (p.y > height + 100) p.y = -100;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                
                if (p.isPurple) {
                    ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`; // Purple accent
                } else {
                    ctx.fillStyle = `rgba(161, 161, 170, ${p.alpha})`; // Zinc-400
                }
                
                if (p.isLarge) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = p.isPurple ? `rgba(168, 85, 247, ${p.alpha})` : `rgba(161, 161, 170, ${p.alpha})`;
                } else {
                    ctx.shadowBlur = 0;
                }
                ctx.fill();
            }

            // Render Words
            ctx.shadowBlur = 0;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            for (let i = 0; i < wordObjects.length; i++) {
                const w = wordObjects[i];
                if (!isReducedMotion.current) {
                    w.x += w.speedX;
                    w.y += w.speedY;
                    w.y -= deltaScroll * w.parallaxFactor;

                    if (w.x < -100) w.x = width + 100;
                    if (w.x > width + 100) w.x = -100;
                    if (w.y < -100) w.y = height + 100;
                    if (w.y > height + 100) w.y = -100;
                }
                
                ctx.font = `${w.fontSize}px Inter, sans-serif`;
                ctx.fillStyle = `rgba(212, 212, 216, ${w.alpha})`; // zinc-300
                ctx.fillText(w.text, w.x, w.y);
            }

            // reset shadow for next frame clearance
            ctx.shadowBlur = 0;
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            document.removeEventListener("visibilitychange", onVisibilityChange);
            mediaQuery.removeEventListener("change", handleMotionChange);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(resizeTimer);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            aria-hidden="true"
        />
    );
};

export default AmbientParticles;
