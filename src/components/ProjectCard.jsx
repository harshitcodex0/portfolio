import { useRef, useCallback, useEffect } from "react";

/**
 * ProjectCard
 * -----------
 * Renders a single project entry from the PROJECTS constant.
 *
 * Pointer interaction model (desktop only)
 * -----------------------------------------
 * onMouseEnter  → caches getBoundingClientRect() once so onMouseMove never
 *                 needs to call it.  Adds .is-hovering class (elevation + no
 *                 transform transition so tilt tracks pointer instantly).
 * onMouseMove   → RAF-gated.  Reads cached rect — no layout read per frame.
 *                 Computes --rx / --ry (tilt, max ±6 deg) and --start (conic arc).
 * onMouseLeave  → cancels in-flight RAF, clears cached rect, removes
 *                 .is-hovering, resets tilt vars to 0deg.  CSS spring-back
 *                 transition (0.55s) then eases the card to flat.
 *
 * Performance
 * -----------
 * - getBoundingClientRect() called once per hover session (mouseenter), not per frame.
 * - RAF gate ensures at most one setProperty batch per display frame.
 * - RAF is cancelled on unmount via useEffect cleanup.
 * - will-change:transform applied only while actively animating (.is-hovering).
 *
 * Accessibility contract
 * ----------------------
 * - <article> wrapper is NOT a link; avoids double-activation on keyboard nav.
 * - Image and title <a> elements are primary live-site targets (when liveUrl set).
 * - GitHub <a> is always an independent keyboard target; e.stopPropagation()
 *   prevents accidental card-link activation.
 * - Hover effects are visual-only; all content is readable without pointer.
 * - @media (prefers-reduced-motion) in CSS disables the tilt silently.
 */

// Maximum tilt in degrees — 6° is restrained; feels premium without game-UI feel.
const MAX_TILT_DEG = 6;

const ProjectCard = ({ project }) => {
  const cardRef  = useRef(null);
  const rafId    = useRef(null);
  // Cached bounding rect — populated on mouseenter, cleared on mouseleave.
  // Avoids a getBoundingClientRect() call (layout read) on every mousemove frame.
  const rectCache = useRef(null);

  // Cancel any pending RAF on unmount to prevent stale callbacks.
  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // onMouseEnter: cache rect + activate elevated hover state
  // ---------------------------------------------------------------------------
  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    // Cache here — card is not scrolling while pointer is inside,
    // so the rect stays valid for the entire hover session.
    rectCache.current = card.getBoundingClientRect();
    card.classList.add("is-hovering");
  }, []);

  // ---------------------------------------------------------------------------
  // onMouseMove: RAF-gated tilt + conic-arc update (no layout reads)
  // ---------------------------------------------------------------------------
  const handleMouseMove = useCallback((e) => {
    // Discard the previous pending frame — we only need the latest pointer position.
    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      const rect = rectCache.current;
      if (!card || !rect) return;

      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;

      // Normalised pointer offset from centre: -1 (far left/top) → +1 (far right/bottom)
      const nx = (e.clientX - cx) / (rect.width  / 2);
      const ny = (e.clientY - cy) / (rect.height / 2);

      // Tilt convention:
      //   pointer right → card tilts right (+Y rotation)
      //   pointer down  → card tilts back  (−X rotation, top comes toward viewer)
      card.style.setProperty("--rx", `${(-ny * MAX_TILT_DEG).toFixed(2)}deg`);
      card.style.setProperty("--ry", `${ (nx * MAX_TILT_DEG).toFixed(2)}deg`);

      // Update conic border-glow angle — existing .card::before --start system.
      const angleDeg = ((Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI + 360) % 360;
      card.style.setProperty("--start", angleDeg + 60);
    });
  }, []);

  // ---------------------------------------------------------------------------
  // onMouseLeave: cancel RAF, clear cache, spring back to flat
  // ---------------------------------------------------------------------------
  const handleMouseLeave = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    rectCache.current = null;

    const card = cardRef.current;
    if (!card) return;
    card.classList.remove("is-hovering");
    // Reset vars — the base .project-card transition (0.55s spring) animates these to 0.
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  }, []);

  // Prevent GitHub click bubbling to any ancestor link.
  const handleGithubClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const { title, description, technologies, imagePath, githubUrl, liveUrl } = project;
  const hasLiveUrl = Boolean(liveUrl);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="project-card card card-border rounded-2xl overflow-hidden flex flex-col group"
      aria-label={title}
    >
      {/* Pointer-glow overlay — existing .glow class, no changes */}
      <div className="glow" aria-hidden="true" />

      {/* ── Image ────────────────────────────────────────────────────────── */}
      {hasLiveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative overflow-hidden project-card-img-wrapper
                     focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-white/60 focus-visible:ring-offset-2
                     focus-visible:ring-offset-black rounded-t-2xl"
          aria-label={`Visit ${title} live site`}
        >
          <ImageBlock imagePath={imagePath} title={title} />
        </a>
      ) : (
        <div className="relative overflow-hidden project-card-img-wrapper">
          <ImageBlock imagePath={imagePath} title={title} />
        </div>
      )}

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 gap-4 p-6 relative z-10">

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
          {hasLiveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors duration-200
                         focus-visible:outline-none focus-visible:underline"
              tabIndex={-1}     // primary live-site entry is the image link above
              aria-hidden="true"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>

        {/* Description */}
        <p className="text-white-50 text-sm md:text-base leading-relaxed flex-1">
          {description}
        </p>

        {/* Technology tags */}
        {technologies.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="px-3 py-1 rounded-full border border-white/10 text-white-50
                           text-xs font-medium select-none
                           transition-[colors,border-color,background-color] duration-200
                           hover:border-white/30 hover:text-white hover:bg-white/5"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {/* ── Action row ───────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 pt-2 mt-auto">

          {/*
            GitHub link — always rendered, always an independent keyboard target.
            e.stopPropagation() on onClick ensures clicking this never triggers
            any ancestor live-site link (present when hasLiveUrl is true).
          */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleGithubClick}
            className="project-card-github-btn
                       flex items-center gap-2 px-4 py-2 rounded-full
                       border border-white/20 text-sm font-medium
                       transition-[colors,border-color,background-color,transform] duration-300
                       hover:border-white/60 hover:bg-white/5
                       focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-white/60 focus-visible:ring-offset-2
                       focus-visible:ring-offset-black
                       active:scale-95"
            aria-label={`View ${title} source code on GitHub`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 shrink-0"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.203 22 16.447 22 12.021 22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>

          {/* Live site pill — conditional on liveUrl being set */}
          {hasLiveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full
                         bg-white text-black text-sm font-semibold
                         transition-[background-color,transform] duration-300
                         hover:bg-white/80 active:scale-95
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-white focus-visible:ring-offset-2
                         focus-visible:ring-offset-black"
              aria-label={`Open ${title} live site`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3.5 h-3.5 shrink-0"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z" clipRule="evenodd" />
              </svg>
              Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

/** Inner image block — shared between linked and non-linked wrappers */
const ImageBlock = ({ imagePath, title }) => (
  <div className="project-card-img-wrapper">
    <img
      src={imagePath}
      alt={`${title} preview`}
      className="w-full h-full object-cover
                 transition-transform duration-500 ease-out
                 group-hover:scale-105"
      loading="lazy"
    />
    {/* Bottom gradient fade — separates image from text body */}
    <div
      className="absolute inset-x-0 bottom-0 h-16
                  bg-gradient-to-t from-black-100 to-transparent pointer-events-none"
      aria-hidden="true"
    />
  </div>
);

export default ProjectCard;
