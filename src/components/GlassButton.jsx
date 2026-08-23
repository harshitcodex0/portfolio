const GlassButton = ({heading}) => {
    return (
        <div className="flex flex-col items-center justify-center mt-8 mb-16 gap-3">
            <div className="glass-1 px-4 py-1.5 rounded-full border border-white/5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
                <span className="text-xs font-semibold text-zinc-300 uppercase tracking-widest">
                    Portfolio
                </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
                {heading}
            </h2>
        </div>
    )
}
export default GlassButton
