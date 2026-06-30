import React from 'react';

const LiquidButton = ({ 
    children, 
    onClick, 
    className = "", 
    href,
    active = false,
    ...props 
}) => {
    // We use the same liquid-glass-nav class that powers the navbar.
    // If it's the "active" state, it uses the nested pill styling instead.
    const baseClasses = `transition-all duration-300 flex items-center justify-center font-medium px-6 py-3 hover:scale-105 active:scale-95 cursor-pointer ${
        active 
            ? 'liquid-glass-active text-white' 
            : 'liquid-glass-nav text-white/90 hover:text-white'
    } ${className}`;

    if (href) {
        return (
            <a 
                href={href} 
                className={baseClasses}
                style={{ borderRadius: "999px" }}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <button 
            onClick={onClick} 
            className={baseClasses}
            style={{ borderRadius: "999px" }}
            {...props}
        >
            {children}
        </button>
    );
};

export default LiquidButton;
