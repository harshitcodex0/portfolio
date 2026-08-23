import { useState, useEffect, useRef } from "react";
import { navLinks } from "../constants/index.js";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("");
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const menuRef = useRef(null);
    const navRefs = useRef([]);

    useEffect(() => {
        const activeIndex = navLinks.findIndex((link) => link.name === activeLink);
        if (activeIndex !== -1 && navRefs.current[activeIndex]) {
            const el = navRefs.current[activeIndex];
            setIndicatorStyle({
                left: el.offsetLeft,
                width: el.offsetWidth,
                opacity: 1,
            });
        } else {
            setIndicatorStyle({ opacity: 0, left: 0, width: 0 });
        }
    }, [activeLink]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [menuOpen]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const handleNavClick = (e, link, name) => {
        e.preventDefault();
        setActiveLink(name);
        setMenuOpen(false);
        const targetId = link.replace("#", "");
        const target = document.getElementById(targetId);
        if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <>
            {/* ── Navbar ── */}
            <header
                className={`fixed left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex items-center justify-between gap-4 rounded-full ${
                    scrolled 
                        ? "top-6 w-[90vw] max-w-5xl py-3 px-6 glass-2 shadow-[0_4px_30px_rgba(168,85,247,0.1)]" 
                        : "top-4 w-[90vw] max-w-[90vw] py-5 px-8 md:px-12 bg-transparent border border-transparent"
                }`}
            >
                    {/* Logo */}
                    <a
                        href="#hero"
                        onClick={(e) => handleNavClick(e, "#hero", "")}
                        className="text-xl md:text-2xl font-bold text-white tracking-tight hover:opacity-80 transition-opacity duration-200 shrink-0 no-underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                        style={{ letterSpacing: "-0.5px" }}
                    >
                        HARSHIT<span className="text-[var(--color-accent)]">.</span>
                    </a>

                    {/* Desktop Links — centered */}
                    <nav className="hidden lg:flex flex-1 justify-center">
                        <ul className="flex items-center gap-3 lg:gap-6 list-none m-0 p-0 relative">
                            {/* Sliding Indicator */}
                            <div 
                                className="absolute h-full top-0 rounded-full transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] pointer-events-none backdrop-blur-md"
                                style={{ 
                                    left: indicatorStyle.left, 
                                    width: indicatorStyle.width, 
                                    opacity: indicatorStyle.opacity,
                                    background: "rgba(255, 255, 255, 0.15)",
                                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.1)",
                                    border: "1px solid rgba(255, 255, 255, 0.25)"
                                }}
                            />
                            {navLinks.map(({ name, link }, idx) => (
                                <li key={name} ref={(el) => (navRefs.current[idx] = el)} className="z-10">
                                    <a
                                        href={link}
                                        onClick={(e) => handleNavClick(e, link, name)}
                                        className={`relative inline-block text-sm no-underline transition-all duration-300 px-3 lg:px-4 py-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${
                                            activeLink === name
                                                ? "text-white font-bold scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                                : "font-medium text-white/70 hover:text-white hover:bg-white/5"
                                        }`}
                                    >
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Desktop CTA */}
                    <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, "#contact", "Contact")}
                        className="hidden lg:inline-flex items-center shrink-0 no-underline px-6 py-2.5 rounded-full text-sm font-semibold text-white glass-2 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-white/20 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                    >
                        Contact Me
                    </a>

                    {/* Hamburger */}
                    <button
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        className="flex lg:hidden flex-col justify-center items-center gap-[5px] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                        style={{
                            width: 40,
                            height: 40,
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: 10,
                            cursor: "pointer",
                            padding: 8,
                            transition: "background 0.2s ease",
                        }}
                    >
                        {[0, 1, 2].map((i) => (
                            <span
                                key={i}
                                style={{
                                    display: "block",
                                    width: 22,
                                    height: 2,
                                    borderRadius: 2,
                                    background: "rgba(217,236,255,0.9)",
                                    transformOrigin: "center",
                                    transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
                                    transform: menuOpen
                                        ? i === 0 ? "translateY(7px) rotate(45deg)"
                                        : i === 2 ? "translateY(-7px) rotate(-45deg)"
                                        : "scaleX(0)"
                                        : "none",
                                    opacity: menuOpen && i === 1 ? 0 : 1,
                                }}
                            />
                        ))}
                    </button>
            </header>

            {/* ── Mobile Backdrop ── */}
            <div
                onClick={() => setMenuOpen(false)}
                className="lg:hidden fixed inset-0"
                style={{
                    zIndex: 190,
                    background: menuOpen ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
                    backdropFilter: menuOpen ? "blur(4px)" : "blur(0px)",
                    WebkitBackdropFilter: menuOpen ? "blur(4px)" : "blur(0px)",
                    pointerEvents: menuOpen ? "all" : "none",
                    transition: "background 0.4s ease, backdrop-filter 0.4s ease",
                }}
                aria-hidden="true"
            />

            {/* ── Mobile Drawer ── */}
            <aside
                ref={menuRef}
                className="lg:hidden fixed top-0 right-0 bottom-0 flex flex-col overflow-y-auto glass-3"
                style={{
                    zIndex: 210,
                    width: "min(320px, 85vw)",
                    transform: menuOpen ? "translateX(0%)" : "translateX(100%)",
                    transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
                    overscrollBehavior: "contain",
                }}
                aria-hidden={!menuOpen}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                    <span className="text-xl font-bold text-white tracking-tight">
                        Harshit<span className="text-[var(--color-accent)]">.</span>
                    </span>
                    <button
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                        className="flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 8,
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(217,236,255,0.8)",
                            fontSize: "1rem",
                            cursor: "pointer",
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Links */}
                <nav className="flex-1 px-4 pt-6 pb-2">
                    <ul className="flex flex-col gap-1 list-none m-0 p-0">
                        {navLinks.map(({ name, link }, i) => (
                            <li
                                key={name}
                                style={{
                                    opacity: menuOpen ? 1 : 0,
                                    transform: menuOpen ? "translateX(0)" : "translateX(30px)",
                                    transition: `opacity 0.35s ease ${menuOpen ? i * 60 + 80 : 0}ms, transform 0.35s cubic-bezier(0.4,0,0.2,1) ${menuOpen ? i * 60 + 80 : 0}ms`,
                                }}
                            >
                                <a
                                    href={link}
                                    onClick={(e) => handleNavClick(e, link, name)}
                                    className="flex items-center gap-4 px-4 py-4 rounded-xl no-underline font-medium text-base transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                                    style={{
                                        color: activeLink === name ? "#fff" : "rgba(217,236,255,0.72)",
                                        background: activeLink === name ? "rgba(255,255,255,0.07)" : "transparent",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                                        e.currentTarget.style.color = "#fff";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = activeLink === name ? "rgba(255,255,255,0.07)" : "transparent";
                                        e.currentTarget.style.color = activeLink === name ? "#fff" : "rgba(217,236,255,0.72)";
                                    }}
                                >
                                    <span style={{ color: "#60a5fa", fontSize: "0.7rem", fontWeight: 700, minWidth: 20 }}>
                                        0{i + 1}
                                    </span>
                                    {name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer CTA */}
                <div
                    className="px-6 pb-10 pt-4"
                    style={{
                        borderTop: "1px solid rgba(255,255,255,0.07)",
                        opacity: menuOpen ? 1 : 0,
                        transform: menuOpen ? "translateY(0)" : "translateY(12px)",
                        transition: `opacity 0.35s ease ${menuOpen ? navLinks.length * 60 + 100 : 0}ms, transform 0.35s ease ${menuOpen ? navLinks.length * 60 + 100 : 0}ms`,
                    }}
                >
                    <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, "#contact", "Contact")}
                        className="flex items-center justify-center w-full no-underline font-semibold text-white glass-2 border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-[var(--color-accent)]/50 cursor-pointer py-3.5 rounded-xl text-[0.95rem]"
                    >
                        Contact Me
                    </a>
                </div>
            </aside>
        </>
    );
};

export default Navbar;
