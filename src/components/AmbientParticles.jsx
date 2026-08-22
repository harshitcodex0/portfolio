import { useEffect, useRef } from "react";

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
            let count = 250; // High-end / Desktop
            if (width < 768) count = 70; // Mobile
            else if (width < 1024) count = 120; // Tablet

            particles = [];
            for (let i = 0; i < count; i++) {
                const isLarge = Math.random() > 0.95; // 5% chance of being a large out-of-focus particle
                const size = isLarge ? Math.random() * 3 + 2 : Math.random() * 1.2 + 0.3;
                const alpha = isLarge ? Math.random() * 0.15 + 0.05 : Math.random() * 0.4 + 0.1;
                const parallaxFactor = isLarge ? Math.random() * 0.8 + 0.5 : Math.random() * 0.4 + 0.1;

                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size,
                    speedX: (Math.random() - 0.5) * (isLarge ? 0.3 : 0.15),
                    speedY: (Math.random() - 0.5) * (isLarge ? 0.3 : 0.15),
                    alpha,
                    parallaxFactor,
                    isLarge
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
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                if (p.isLarge) {
                    // Slight glow for large particles, minimal performance hit since few exist
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = `rgba(255,255,255, ${p.alpha})`;
                } else {
                    ctx.shadowBlur = 0;
                }
                ctx.fill();
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
