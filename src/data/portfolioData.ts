import port1 from "@/assets/port/port-1.png";
import port2 from "@/assets/port/port-2.png";
import port3 from "@/assets/port/port-3.png";
import port4 from "@/assets/port/port-4.png";
import port5 from "@/assets/port/port-5.png";
import port6 from "@/assets/port/port-6.png";
import port7 from "@/assets/port/port-7.png";
import port8 from "@/assets/port/port-8.png";
import port9 from "@/assets/port/port-9.png";
import port10 from "@/assets/port/port-10.png";
import port11 from "@/assets/port/port-11.png";
import port12 from "@/assets/port/port-12.png";
import port13 from "@/assets/port/port-13.png";
import logoPhoto from "@/assets/port/logo-photo.png";

import sass1 from "@/assets/sass/sass_1.png";
import sass2 from "@/assets/sass/sass_2.png";
import sass3 from "@/assets/sass/sass_3.png";

import codecloudsLogo from "@/assets/codeclouds_logo.jpg";
import shyamLogo from "@/assets/shyam-future.png";
import indujiLogo from "@/assets/induji.jpg";

export interface Project {
  id: string;
  title: string;
  category: "3d paralax website" | "Sass project" | "website UI" | "mobile Ui" | "social media post" | "Logo" | "creative post";
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  metrics?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number; iconName?: string }[];
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string[];
  technologies: string[];
  logo?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

// Dynamically load all 120+ creative post images from src/assets/post
const postImagesGlob = import.meta.glob('/src/assets/post/*.{png,jpg,jpeg,PNG,JPG,JPEG}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const postProjects: Project[] = Object.entries(postImagesGlob).map(([filePath, imageUrl], idx) => {
  const fileNameWithExt = filePath.split('/').pop() || `creative-post-${idx + 1}`;
  const fileName = fileNameWithExt.replace(/\.[^/.]+$/, "");
  const formattedTitle = fileName
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    id: `creative-post-${idx + 1}-${fileName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    title: formattedTitle || `Creative Social Post ${idx + 1}`,
    category: "creative post",
    description: `High-impact social media campaign creative post design (${formattedTitle}).`,
    longDescription: `Professional digital marketing graphic asset, social media ad banner, and engagement creative post design for brand promotion.`,
    image: imageUrl,
    tags: ["Photoshop", "Social Media", "Graphic Design", "Ad Creative", "Branding", "Figma"],
    demoUrl: "https://dropix-website-builder-v1.netlify.app",
    githubUrl: "https://github.com/shuvendu-Web",
    featured: idx < 12,
    metrics: "Social Media Creative",
  };
});

const baseProjects: Project[] = [
  {
    id: "aurum-luxury-logo-photo",
    title: "Logo Design Showcase",
    category: "Logo",
    description: "High-end brand logo design photo mockup and visual identity showcase.",
    longDescription: "Bespoke brand logo design, emblem and visual identity system created for client branding.",
    image: logoPhoto,
    tags: ["Logo Design", "Branding", "Figma", "Photoshop", "Vector Emblem", "UI/UX"],
    demoUrl: "https://dropix-website-builder-v1.netlify.app",
    githubUrl: "https://github.com/shuvendu-Web",
    featured: true,
    metrics: "Brand Logo Design",
  },
  {
    id: "dropix-website-builder",
    title: "Dropix Website Builder",
    category: "Sass project",
    description: "No-code drag & drop AI website builder SaaS empowering users to design, customize, and publish responsive websites effortlessly.",
    longDescription: "Dropix is an advanced SaaS application featuring an intuitive visual canvas, AI-powered content generation, responsive layout controls, and instant multi-domain publishing.",
    image: sass1,
    tags: ["React", "TypeScript", "Tailwind CSS", "SaaS", "AI Builder", "Framer Motion"],
    demoUrl: "https://dropix-website-builder-v1.netlify.app",
    githubUrl: "https://github.com/shuvendu-Web/dropix-website-builder",
    featured: true,
    metrics: "AI Visual Builder SaaS",
  },
  {
    id: "nurocare-ai",
    title: "NuroCare AI Health Platform",
    category: "Sass project",
    description: "Intelligent health telemedicine & diagnostic SaaS featuring AI symptom analysis, doctor booking, and live patient telemetry.",
    longDescription: "NuroCare AI connects patients and healthcare providers with intelligent symptom triage, real-time vitals monitoring, secure medical records, and automated consultation scheduling.",
    image: sass2,
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "AI Health", "WebSockets"],
    demoUrl: "https://nurocare-ai.netlify.app",
    githubUrl: "https://github.com/shuvendu-Web/nurocare-ai",
    featured: true,
    metrics: "AI Telemedicine Suite",
  },
  {
    id: "taskflow-ai",
    title: "TaskFlow AI Workspace",
    category: "Sass project",
    description: "Autonomous task management and agentic workflow SaaS with smart kanban boards, real-time sync, and automated sprint reports.",
    longDescription: "TaskFlow AI streamlines team productivity with automated task prioritization, AI subtask decomposition, sprint velocity analytics, and seamless workspace collaboration.",
    image: sass3,
    tags: ["React", "TypeScript", "Tailwind CSS", "SaaS", "Kanban API", "AI Automation"],
    demoUrl: "https://taskflow-ai-v1.netlify.app",
    githubUrl: "https://github.com/shuvendu-Web/taskflow-ai",
    featured: true,
    metrics: "Agentic Sprint Management",
  },
  {
    id: "guarana-diet-soda",
    title: "Guaraná Diet Soda",
    category: "3d paralax website",
    description: "Vibrant, interactive beverage brand experience featuring 3D product visualizer, custom WebGL lighting, and refreshing parallax scrolling.",
    longDescription: "High-energy promo website for Guaraná Diet Soda crafted with interactive 3D can rotation, flavor selector, smooth scroll animations, and bold brand storytelling.",
    image: port1,
    tags: ["React", "Three.js", "WebGL", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://guarana-diet-soda.netlify.app",
    githubUrl: "https://github.com/shuvendu-Web/guarana-diet-soda",
    featured: true,
    metrics: "3D Beverage Showcase",
  },
  {
    id: "glow-naturally",
    title: "Glow Naturally Skincare",
    category: "3d paralax website",
    description: "Organic beauty & skincare storefront highlighting natural botanical ingredients, product finder quiz, and elegant glassmorphic UI.",
    longDescription: "Modern luxury skincare web app built with responsive product grid, ingredient deep-dives, customer review visualizer, and seamless cart experience.",
    image: port2,
    tags: ["React", "TypeScript", "Tailwind CSS", "E-Commerce", "UI/UX", "Glassmorphism"],
    demoUrl: "https://glow-naturally-77.netlify.app",
    githubUrl: "https://github.com/shuvendu-Web/glow-naturally",
    featured: true,
    metrics: "Organic Skincare Portal",
  },
  {
    id: "dubai-vetra",
    title: "Dubai Vetra Luxury Residences",
    category: "3d paralax website",
    description: "Exclusive real estate portal for luxury Dubai architectural properties featuring virtual tours, interactive floor plans, and dark aesthetic.",
    longDescription: "Ultra-luxury property showcase app with 3D architectural rendering viewer, location maps, penthouse gallery, and private consultation booking.",
    image: port3,
    tags: ["React", "TypeScript", "Tailwind CSS", "Real Estate", "Luxury UI", "Framer Motion"],
    demoUrl: "https://dubai-vetra-v1.netlify.app",
    githubUrl: "https://github.com/shuvendu-Web/dubai-vetra",
    featured: true,
    metrics: "Luxury Real Estate Hub",
  },
  {
    id: "luxonn-luxury",
    title: "Luxonn Luxury Automotive",
    category: "3d paralax website",
    description: "High-end supercar showcase platform with interactive vehicle configurator, specs comparison, and VIP concierge booking.",
    longDescription: "Bespoke luxury car experience with dynamic color customizer, engine sound preview, 360-degree view, and high-performance layout.",
    image: port4,
    tags: ["React", "TypeScript", "Tailwind CSS", "Automotive UI", "3D Preview"],
    demoUrl: "https://luxonn-luxury.netlify.app",
    githubUrl: "https://github.com/shuvendu-Web/luxonn-luxury",
    featured: true,
    metrics: "Interactive Car Configurator",
  },
  {
    id: "luxor-luxury-living",
    title: "Luxor Luxury Living",
    category: "3d paralax website",
    description: "Sophisticated interior architecture and resort living showcase with fluid parallax transitions and curated suites catalog.",
    longDescription: "Elegantly styled luxury living portal featuring high-resolution photography, interactive floorplan hot-spots, and booking inquiries.",
    image: port5,
    tags: ["React", "TypeScript", "Tailwind CSS", "Architecture UI", "Parallax"],
    demoUrl: "https://luxor-pluxury-lives.netlify.app",
    githubUrl: "https://github.com/shuvendu-Web/luxor-luxury",
    featured: false,
    metrics: "Bespoke Interior Living",
  },
  {
    id: "celeste-luxury",
    title: "Celeste Haute Couture & Jewelry",
    category: "3d paralax website",
    description: "Haute fashion & high jewelry e-commerce experience built with minimalist layout, fluid micro-interactions, and lookbook showcase.",
    longDescription: "High-end fashion brand portal showcasing seasonal lookbooks, interactive gem inspection, and luxury shopping bag UI.",
    image: port6,
    tags: ["React", "TypeScript", "Tailwind CSS", "Fashion E-Commerce", "UI/UX"],
    demoUrl: "https://celeste-luxury.netlify.app",
    githubUrl: "https://github.com/shuvendu-Web/celeste-luxury",
    featured: true,
    metrics: "Haute Couture Lookbook",
  },
  {
    id: "naj-infotech",
    title: "NAJ Infotech Corporate Portal",
    category: "website UI",
    description: "Enterprise IT consulting & software solutions portal with service breakdowns, case studies, and client conversion funnels.",
    longDescription: "Corporate tech agency site built with clean typography, modern service cards, interactive client testimonials, and quick estimate calculator.",
    image: port7,
    tags: ["React", "TypeScript", "Tailwind CSS", "Corporate UI", "Lead Gen"],
    demoUrl: "https://najinfotech.netlify.app",
    githubUrl: "https://github.com/shuvendu-Web/naj-infotech",
    featured: true,
    metrics: "Enterprise Tech Portal",
  },
  {
    id: "living-word-publications",
    title: "Living Word Publications",
    category: "website UI",
    description: "Digital publishing house platform featuring online bookstore, author spotlights, sample book reader, and responsive catalog.",
    longDescription: "Content-rich literary platform with book search, author interviews, digital sample previewer, and e-commerce cart integration.",
    image: port8,
    tags: ["React", "TypeScript", "Tailwind CSS", "Publishing UI", "E-Book Store"],
    demoUrl: "https://livingwordpublications.netlify.app",
    githubUrl: "https://github.com/shuvendu-Web/living-word-publications",
    featured: true,
    metrics: "Digital Publishing House",
  },
  {
    id: "maharadascha-restaurant",
    title: "Maharadascha Fine Dining",
    category: "website UI",
    description: "Exotic royal dining experience website with online table reservation, interactive food & wine menu, and heritage atmosphere.",
    longDescription: "Gourmet restaurant website featuring sensory menu exploration, private dining booking system, chef specials, and location directions.",
    image: port9,
    tags: ["React", "TypeScript", "Tailwind CSS", "Restaurant UI", "Table Booking"],
    demoUrl: "https://najinfotech.com/Maharadascha-Restaurant/dev",
    githubUrl: "https://github.com/shuvendu-Web/maharadascha-restaurant",
    featured: true,
    metrics: "Royal Fine Dining",
  },
  {
    id: "high-on-innovation",
    title: "High on Innovation Tech Studio",
    category: "3d paralax website",
    description: "Next-gen creative technology studio web app with WebGL particle animations, interactive shaders, and immersive project portfolio.",
    longDescription: "Futuristic agency landing page with real-time 3D visual effects, interactive project showcase, and dynamic scroll physics.",
    image: port10,
    tags: ["React", "Three.js", "WebGL", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://oohighoninnovation.netlify.app",
    githubUrl: "https://github.com/shuvendu-Web/high-on-innovation",
    featured: true,
    metrics: "Creative 3D Tech Studio",
  },
  {
    id: "marketmate-ai",
    title: "MarketMate E-Commerce AI",
    category: "Sass project",
    description: "Smart retail & e-commerce analytics SaaS platform with automated inventory insights, price tracking, and sales forecasting.",
    longDescription: "MarketMate gives online sellers real-time competitor tracking, automated stock alerts, sales performance analytics, and AI revenue optimization.",
    image: port11,
    tags: ["React", "TypeScript", "Tailwind CSS", "SaaS Analytics", "Chart.js"],
    demoUrl: "https://marketmate-v1.netlify.app",
    githubUrl: "https://github.com/shuvendu-Web/marketmate",
    featured: true,
    metrics: "Retail Analytics Suite",
  },
  {
    id: "dino-game-free",
    title: "Dino Game Free Arcade",
    category: "Sass project",
    description: "Retro arcade runner web game with custom audio synthesis, high-score leaderboards, and smooth 60fps browser physics.",
    longDescription: "Classic offline runner reimagined in modern HTML5 Canvas & React with power-ups, skin unlockables, sound effects, and online leaderboards.",
    image: port12,
    tags: ["React", "Canvas API", "TypeScript", "Tailwind CSS", "Web Audio", "Game Dev"],
    demoUrl: "https://dino-game-free.netlify.app",
    githubUrl: "https://github.com/shuvendu-Web/dino-game-free",
    featured: true,
    metrics: "Retro Browser Arcade",
  },
  {
    id: "royal-india-cuisine",
    title: "Royal India Luxury Cuisine",
    category: "website UI",
    description: "Authentic luxury Indian dining platform featuring royal heritage aesthetic, online takeaway ordering, and banquet reservations.",
    longDescription: "Warm, opulent dining portal built for Royal India featuring interactive dish selection, dietary filters, online table booking, and customer reviews.",
    image: port13,
    tags: ["React", "TypeScript", "Tailwind CSS", "Restaurant UI", "E-Commerce"],
    demoUrl: "https://royalindia-d1.netlify.app/",
    githubUrl: "https://github.com/shuvendu-Web/royal-india",
    featured: true,
    metrics: "Royal Heritage Cuisine",
  },
];

export const PORTFOLIO_DATA = {
  personal: {
    name: "Shuvendu Dhenki",
    title: "UI/UX Designer, Web & Mobile App Designer",
    tagline: "Shuvendu Dhenki is a UI/UX designer specializing in website design, web design, mobile app design, user experience, user interfaces and digital products.",
    bio: "Shuvendu Dhenki is a UI/UX designer specializing in website design, web design, mobile app design, user experience, user interfaces and digital products with 10+ years of experience designing and building responsive websites, SaaS web applications, mobile app user interfaces, and conversion-focused digital experiences using React.js, Next.js, TypeScript, Tailwind CSS, Bootstrap, Figma, and WordPress. Immediately available, open to relocation and international opportunities.",
    location: "Kolkata, India (Open to Relocation & International)",
    status: "Immediately available, open to relocation and international opportunities",
    email: "shuvendu.dhenki@gmail.com",
    phone: "+91 9804523216",
    whatsappUrl: "https://wa.me/919804523216",
    telegramUrl: "https://t.me/919804523216",
    github: "https://github.com/shuvendu-Web",
    linkedin: "https://linkedin.com/in/shuvendu-dhenki-1b734b8a",
    twitter: "https://twitter.com",
    resumeUrl: "/Shuvendu_Dhenki_Resume_Ui.pdf",
    stats: [
      { label: "Years Experience", value: "10+" },
      { label: "Projects Completed", value: "40+" },
      { label: "Open Source Stars", value: "1.2k+" },
      { label: "Code Contributions", value: "2.4k" },
    ],
  },
  projects: [...baseProjects, ...postProjects] as Project[],

  skillCategories: [
    {
      title: "Frontend & UI Engineering",
      icon: "Layout",
      skills: [
        { name: "React.js / Next.js", level: 96 },
        { name: "TypeScript / JavaScript", level: 94 },
        { name: "Vue.js / Angular / Svelte", level: 85 },
        { name: "Tailwind CSS / Bootstrap", level: 98 },
        { name: "Material UI / Shadcn/ui", level: 92 },
        { name: "Framer Motion & Responsive Design", level: 95 },
      ],
    },
    {
      title: "UI/UX & Design",
      icon: "Palette",
      skills: [
        { name: "Figma (UI Design & Prototyping)", level: 98 },
        { name: "Canva & Brand Assets", level: 95 },
        { name: "Adobe XD & Photoshop", level: 90 },
        { name: "Design Systems & Component Libraries", level: 96 },
        { name: "User Research & Wireframing", level: 92 },
        { name: "Micro-Animations & Interaction Design", level: 94 },
      ],
    },
    {
      title: "Auth, OAuth & Payments",
      icon: "ShieldCheck",
      skills: [
        { name: "JWT Auth & OAuth 2.0", level: 45 },
        { name: "Google & GitHub OAuth Integrations", level: 48 },
        { name: "RBAC & Secure Auth Flow", level: 42 },
        { name: "Razorpay Payment Gateway", level: 50 },
        { name: "Webhooks & Subscriptions", level: 44 },
      ],
    },
    {
      title: "Mobile, CMS & E-Commerce",
      icon: "Smartphone",
      skills: [
        { name: "Flutter & Dart (Android / iOS)", level: 65 },
        { name: "WordPress (Custom Themes/Plugins)", level: 70 },
        { name: "Shopify (Theme Dev / Liquid)", level: 58 },
        { name: "Webflow & Webflow CMS", level: 62 },
        { name: "State Management (Redux/Zustand/TanStack)", level: 45 },
      ],
    },
    {
      title: "Build, Testing & Deployment",
      icon: "Cloud",
      skills: [
        { name: "Docker & Containerization", level: 35 },
        { name: "Vite / Webpack / Turbopack", level: 48 },
        { name: "Testing (Jest / Vitest / Playwright)", level: 38 },
        { name: "Git / GitHub / GitLab", level: 50 },
        { name: "Vercel / Netlify / Firebase", level: 45 },
        { name: "AWS & Cloudflare Integrations", level: 32 },
      ],
    },
  ] as SkillCategory[],

  experiences: [
    {
      period: "May 2019 – Present",
      role: "Senior Web & Graphics Designer",
      company: "CodeClouds Pvt. Ltd.",
      location: "Kolkata, India",
      description: [
        "Lead frontend and design work across client and agency web projects, building responsive websites and SaaS web applications with React.js, JavaScript, Bootstrap, Tailwind CSS, and WordPress.",
        "Incorporate AI-assisted development workflows — prompt engineering, AI code generation, AI-assisted debugging — to accelerate delivery timelines and improve code quality.",
        "Design high-fidelity UI/UX in Figma and translate designs into production-ready, accessible, cross-browser-compatible interfaces.",
      ],
      technologies: ["React.js", "JavaScript", "Tailwind CSS", "Bootstrap", "WordPress", "Figma", "AI Workflows"],
      logo: codecloudsLogo,
    },
    {
      period: "August 2017 – May 2019",
      role: "Senior Web & Graphics Designer",
      company: "Shyam FutureTech (Shyam Steel Venture Company)",
      location: "Kolkata, India",
      description: [
        "Owned web design and development for the company's digital presence, combining graphic design with front-end implementation.",
        "Built responsive, brand-aligned web pages and marketing assets.",
        "Mentored team members on design-to-code workflows.",
      ],
      technologies: ["HTML5/CSS3", "JavaScript", "UI/UX Design", "Graphic Design", "Responsive Design"],
      logo: shyamLogo,
    },
    {
      period: "March 2015 – August 2017",
      role: "Web & Graphics Designer",
      company: "Induji Technologies Private Limited",
      location: "Kolkata, India",
      description: [
        "Began career designing and developing websites and graphics for client projects.",
        "Built a foundation in HTML, CSS, JavaScript, and visual design principles that shaped a long-term front-end development career.",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Photoshop", "Web Graphics"],
      logo: indujiLogo,
    },
  ] as Experience[],

  testimonials: [
    {
      quote: "Alex is one of those rare engineers who bridges the gap between deep technical architecture and pixel-perfect design. The interactive grid hero he built for our product blew away our stakeholders.",
      name: "Sarah Jenkins",
      role: "VP of Product",
      company: "Vanguard Tech Labs",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote: "Delivered our complex AI workspace ahead of schedule with flawless code quality and remarkable UI performance. Highly recommended!",
      name: "Marcus Vance",
      role: "CTO",
      company: "Nexus Software",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
  ] as Testimonial[],
};
