
const GlassButton = ({heading}) => {
    return (
        <div className="flex justify-center mt-8 mb-12">
            {/* Embedded SVG Refraction Map (Keeps the liquid shape authentic) */}
            <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
                <defs>
                    <filter id="liquid-glass-heading">
                        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>

            <h1
                className="
      relative inline-block px-10 py-4
      text-2xl md:text-3xl lg:text-4xl font-semibold text-white
      bg-white/[0.07] border border-white/20 rounded-full
      backdrop-blur-xl backdrop-brightness-[1.15] backdrop-saturate-[1.3]

      /* White Outer Shadow/Glow for Black Backgrounds */
      shadow-[0_0_25px_rgba(255,255,255,0.08),0_0_50px_rgba(255,255,255,0.03)]

      /* Internal Liquid Specular Highlights */
      before:absolute before:inset-0 before:rounded-full before:p-[1px]
      before:bg-gradient-to-b before:from-white/40 before:via-white/5 before:to-white/20
      before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
      before:[mask-composite:xor] before:pointer-events-none

      /* Internal 3D Gel Shadow */
      after:absolute after:inset-0 after:rounded-full after:pointer-events-none
      after:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.4)]

      /* Motion States */
      cursor:pointer transition-all duration-300 ease-out
      hover:-translate-y-1 hover:bg-white/[0.12]
      hover:shadow-[0_0_35px_rgba(255,255,255,0.15),0_0_60px_rgba(255,255,255,0.05)]
      active:scale-[0.98] active:duration-75
    "
                style={{ filter: 'url(#liquid-glass-heading)' }}
                role="heading"
                aria-level={1}
            >
    <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
      {heading}
    </span>
            </h1>
        </div>
    )
}
export default GlassButton
