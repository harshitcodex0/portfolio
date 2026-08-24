// =============================================================================
//  portfolioData.js — Single Source of Truth
//  -----------------------------------------
//  All portfolio content lives here.  Edit this file to update the site;
//  nothing else should need to change.
//
//  Exported constants
//  ------------------
//  PROJECTS   -> showcase section  (map-friendly array)
//  SKILLS     -> skills section    (categorised object + flat array via SKILLS.all)
//  PROFILES   -> social / profile links
//
//  Legacy constants (kept for backwards-compat with existing components)
//  ----------------------------------------------------------------------
//  navLinks, words, counterItems, logoIconsList, abilities,
//  techStackImgs, techStackIcons, expCards, expLogos, testimonials,
//  socialImgs, skillsData
// =============================================================================

// -----------------------------------------------------------------------------
//  PROFILES — authoritative link registry
// -----------------------------------------------------------------------------
export const PROFILES = {
  github: {
    label: "GitHub",
    url: "https://github.com/harshitcodex0",
    handle: "@harshitcodex0",
  },
  linkedin: {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/harshit-s-choudhary/",
    handle: "Harshit S. Choudhary",
  },
  huggingface: {
    label: "Hugging Face",
    url: "https://huggingface.co/jarvis624",
    handle: "@jarvis624",
  },
  leetcode: {
    label: "LeetCode",
    url: "https://leetcode.com/harshit_codex0",
    handle: "harshit_codex0",
  },
  instagram: {
    label: "Instagram",
    url: "https://www.instagram.com/harshit13c/",
    handle: "@harshit13c",
  },
  twitter: {
    label: "X / Twitter",
    url: "https://x.com/HarshSi82158470",
    handle: "@HarshSi82158470",
  },
};

// -----------------------------------------------------------------------------
//  PROJECTS — showcase section data
//  Each object maps cleanly to a card: projects.map((p) => <ProjectCard {...p} />)
// -----------------------------------------------------------------------------
export const PROJECTS = [
  {
    id: 1,
    title: "The Crafted Pour",
    description:
      "A liquor and cocktail discovery platform where users can explore premium spirits, learn how to craft classic cocktails, and create their own unique cocktail recipes.",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Express.js"],
    imagePath: "/images/project1.png",
    githubUrl: "https://github.com/harshitcodex0/the-crafted-pour",   // <- replace with exact repo URL
    liveUrl: "https://the-crafted-pour.vercel.app/",                                    // <- add when deployed
  },
  {
    id: 2,
    title: "Student Result Portal",
    description:
      "A full-stack student result management system that allows institutions to publish results and students to securely view their academic performance.",
    technologies: ["React", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    imagePath: "/images/project2.png",
    githubUrl: "https://github.com/harshitcodex0/result-portal",   // <- replace with exact repo URL
    liveUrl: "https://result-portal-tau.vercel.app/",
  },
  {
    id: 3,
    title: "ZenCode",                          // <- update title when ready
    description:
      "Coming soon — placeholder for the third showcase project.",
    technologies: [],
    imagePath: "/images/project3.png",
    githubUrl: "https://github.com/harshitcodex0",
    liveUrl: null,
  },
];

// -----------------------------------------------------------------------------
//  SKILLS — categorised skill data
//  Access a single category:  SKILLS.frontend
//  Access all as a flat array: SKILLS.all  (same shape as legacy skillsData)
// -----------------------------------------------------------------------------
export const SKILLS = {
  // -- Frontend ----------------------------------------------------------------
  frontend: {
    category: "Frontend",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js (App Router)",
      "Tailwind CSS",
      "Shadcn UI",
      "React Hooks & Context API",
      "Responsive Design",
      "Component-Based Architecture",
    ],
  },

  // -- Backend & Cloud ---------------------------------------------------------
  backendAndCloud: {
    category: "Backend & Cloud",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "MongoDB",
      "PostgreSQL",
      "Prisma ORM",
      "Authentication & Authorization",
      "Role-Based Access Control",
      "Payment Integration (Stripe, Razorpay)",
      "AWS (S3, EC2)",
      
    ],
  },

  // -- AI & Algorithms ---------------------------------------------------------
  aiAndAlgorithms: {
    category: "AI & Algorithms",
    skills: [
      "Open Router",
      "LangChain",
      "Retrieval-Augmented Generation (RAG)",
      "Prompt Engineering",
      "Embeddings & Vector Search",
      "llama.cpp (local LLM inference)",
      "ComfyUI (image-generation workflows)",
      "Data Structures & Algorithms",
      "Problem Solving (LeetCode)",
    ],
  },

  // -- Tools & Environment -----------------------------------------------------
  toolsAndEnvironment: {
    category: "Tools & Environment",
    skills: [
      "Git & GitHub",
      "Docker",
      "Vercel",
      "Postman",
      "Clerk (Auth)",
      "Redis (Cache Handling)",
      "ffmpeg (Video Smoothening)",
      "WSL / Linux",
      "VS Code",
    ],
  },

  // -- Computer Science --------------------------------------------------------
  computerScience: {
    category: "Computer Science",
    skills: [
      "OOP Fundamentals",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
    ],
  },

  // -- Professional & Personal -------------------------------------------------
  professionalAndPersonal: {
    category: "Professional & Personal",
    skills: [
      "Full-Stack Development",
      "Team Collaboration",
      "Client-Focused Development",
      "Rapid Prototyping",
      "Debugging",
      "Visual / Product Sense",
      "Discipline & Consistency",
      "Casual Gaming",
    ],
  },
};

// Convenience: flat array in the shape SkillsSection.jsx expects.
// Built automatically — never edit this line manually.
SKILLS.all = Object.values(SKILLS).filter(
  (v) => v && typeof v === "object" && "category" in v
);

// -----------------------------------------------------------------------------
//  NAV LINKS
// -----------------------------------------------------------------------------
export const navLinks = [
  { name: "PROJECTS",    link: "#work" },
  { name: "Education",   link: "#experience" },
  { name: "Skills",      link: "#skills-section" },
  { name: "Resume",      link: "#resume" },
];

// -----------------------------------------------------------------------------
//  HERO WORDS (animated word-carousel)
// -----------------------------------------------------------------------------
export const words = [
  { text: "Ideas",    imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs",  imgPath: "/images/designs.svg" },
  { text: "Code",     imgPath: "/images/code.svg" },
  { text: "Ideas",    imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs",  imgPath: "/images/designs.svg" },
  { text: "Code",     imgPath: "/images/code.svg" },
];

// -----------------------------------------------------------------------------
//  COUNTER ITEMS (animated stats)
// -----------------------------------------------------------------------------
export const counterItems = [
  { value: 20,  suffix: "+", label: "Technologies / Tools Mastered" },
  { value: 5,   suffix: "+", label: "Hackathons Attended or Certifications Earned" },
  { value: 5,   suffix: "+", label: "Completed Projects" },
  { value: 500, suffix: "+", label: "Coffee Cups Consumed" },
];

// -----------------------------------------------------------------------------
//  LOGO ICONS (marquee / logo strip)
// -----------------------------------------------------------------------------
export const logoIconsList = [
  { imgPath: "/images/logos/company-logo-1.png" },
  { imgPath: "/images/logos/company-logo-2.png" },
  { imgPath: "/images/logos/company-logo-3.png" },
  { imgPath: "/images/logos/company-logo-4.png" },
  { imgPath: "/images/logos/company-logo-5.png" },
  { imgPath: "/images/logos/company-logo-6.png" },
  { imgPath: "/images/logos/company-logo-7.png" },
  { imgPath: "/images/logos/company-logo-8.png" },
  { imgPath: "/images/logos/company-logo-9.png" },
  { imgPath: "/images/logos/company-logo-10.png" },
  { imgPath: "/images/logos/company-logo-11.png" },
];



// -----------------------------------------------------------------------------
//  TECH STACK (2-D image carousel)
// -----------------------------------------------------------------------------
export const techStackImgs = [
  { name: "React Developer",       imgPath: "/images/logos/react.png" },
  { name: "Python Developer",      imgPath: "/images/logos/python.svg" },
  { name: "Backend Developer",     imgPath: "/images/logos/node.png" },
  { name: "Interactive Developer", imgPath: "/images/logos/three.png" },
  { name: "Project Manager",       imgPath: "/images/logos/git.svg" },
];

// -----------------------------------------------------------------------------
//  TECH STACK ICONS (3-D model viewer)
// -----------------------------------------------------------------------------
export const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Cloud Deployment",
    modelPath: "/models/aws_logo.glb",
    scale: 0.3,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Management",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

// -----------------------------------------------------------------------------
//  EXPERIENCE / EDUCATION CARDS
// -----------------------------------------------------------------------------
export const expCards = [
  {
    review:
      "During my MCA journey, I have focused on full-stack development while continuously improving my knowledge of React, Node.js, databases, and scalable application development.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/logo1.png",
    title: "Graduation Master of Computer Applications (MCA)",
    date: "August 2025 - Present",
    responsibilities: [
      "Studying Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, and Software Engineering.",
      "Building full-stack web applications using React, Node.js, Express, and MongoDB.",
      "Learning modern development practices including Docker, Git, and cloud deployment.",
    ],
  },
  {
    review:
      "My BCA specialization in Cybersecurity provided a strong foundation in secure software development, networking, operating systems, and ethical hacking concepts.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Graduation Bachelor of Computer Applications (BCA) - Cybersecurity",
    date: "August 2021 - July 2024",
    responsibilities: [
      "Specialized in Cybersecurity fundamentals.",
      "Learned Network Security, Ethical Hacking, Cryptography, and Linux Administration.",
      "Developed academic projects using Java, C++ and Web Technologies.",
    ],
  },
];

export const expLogos = [
  { name: "logo1", imgPath: "/images/logo1.png" },
  { name: "logo2", imgPath: "/images/logo2.png" },
  { name: "logo3", imgPath: "/images/logo3.png" },
];

// -----------------------------------------------------------------------------
//  TESTIMONIALS
//  NOTE: Placeholder testimonials — replace with real quotes when available.
// -----------------------------------------------------------------------------
export const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can't say enough good things about Harshit. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Harshit was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Harshit was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. If you're seeking to elevate your website and brand, Harshit is the ideal partner.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Harshit was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that's both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Harshit's expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He's a true professional!",
    imgPath: "/images/client4.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Harshit was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
  },
];

// -----------------------------------------------------------------------------
//  SOCIAL IMAGES (footer icon links)
//  Derived from PROFILES so URLs only need updating in one place.
// -----------------------------------------------------------------------------
export const socialImgs = [
  { name: "insta",    url: PROFILES.instagram.url, imgPath: "/images/insta.png" },
  { name: "github",   url: PROFILES.github.url,    imgPath: "/images/social.png" },
  { name: "x",        url: PROFILES.twitter.url,   imgPath: "/images/x.png" },
  { name: "linkedin", url: PROFILES.linkedin.url,  imgPath: "/images/linkedin.png" },
];

// -----------------------------------------------------------------------------
//  SKILLS DATA (legacy flat array — consumed by SkillsSection.jsx)
//  Auto-derived from SKILLS.all so it stays in sync automatically.
// -----------------------------------------------------------------------------
export const skillsData = SKILLS.all;
