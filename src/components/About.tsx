import React, { useRef, useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  User,
  Zap,
  Palette,
  Cpu,
  Smartphone,
  Sparkles,
  LayoutTemplate,
  Brain,
  Wand2,
  ShieldCheck,
  CreditCard,
  Layers,
  Globe,
  Cloud,
  KeyRound,
  CheckCircle2,
  FileText,
  Bot,
} from "lucide-react";
import {
  SiHtml5,
  SiCss,
  SiSass,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiBootstrap,
  SiTailwindcss,
  SiMui,
  SiGit,
  SiGithub,
  SiWordpress,
  SiFigma,
  SiRedux,
  SiReactquery,
  SiGraphql,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFlask,
  SiFastapi,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiPrisma,
  SiSupabase,
  SiFirebase,
  SiRazorpay,
  SiFlutter,
  SiDart,
  SiShopify,
  SiWebflow,
  SiVite,
  SiWebpack,
  SiNpm,
  SiYarn,
  SiPnpm,
  SiBun,
  SiJest,
  SiCypress,
  SiEslint,
  SiPrettier,
  SiVercel,
  SiNetlify,
  SiCloudflare,
  SiGoogle,
  SiNvidia,
  SiDocker,
} from "react-icons/si";
import shuvenduImg from "@/assets/shuvendu.jpg";

interface SkillConfig {
  icon: React.ComponentType<{ className?: string }>;
  textColor: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
  glowRgb?: string;
}

const skillConfigMap: Record<string, SkillConfig> = {
  // Frontend
  HTML5: { icon: SiHtml5, textColor: "text-[#ff6a42]", bgColor: "bg-[#e34f26]/15", borderColor: "border-[#e34f26]/40", iconColor: "text-[#e34f26]", glowRgb: "227, 79, 38" },
  CSS3: { icon: SiCss, textColor: "text-[#38bdf8]", bgColor: "bg-[#1572b6]/15", borderColor: "border-[#1572b6]/40", iconColor: "text-[#29b6f6]", glowRgb: "21, 114, 182" },
  Sass: { icon: SiSass, textColor: "text-[#f472b6]", bgColor: "bg-[#cc6699]/15", borderColor: "border-[#cc6699]/40", iconColor: "text-[#cc6699]", glowRgb: "204, 102, 153" },
  "JavaScript (ES6+)": { icon: SiJavascript, textColor: "text-[#facc15]", bgColor: "bg-[#f7df1e]/15", borderColor: "border-[#f7df1e]/40", iconColor: "text-[#f7df1e]", glowRgb: "247, 223, 30" },
  JavaScript: { icon: SiJavascript, textColor: "text-[#facc15]", bgColor: "bg-[#f7df1e]/15", borderColor: "border-[#f7df1e]/40", iconColor: "text-[#f7df1e]", glowRgb: "247, 223, 30" },
  TypeScript: { icon: SiTypescript, textColor: "text-[#60a5fa]", bgColor: "bg-[#3178c6]/15", borderColor: "border-[#3178c6]/40", iconColor: "text-[#3178c6]", glowRgb: "49, 120, 198" },
  "React.js": { icon: SiReact, textColor: "text-[#38bdd8]", bgColor: "bg-[#61dafb]/15", borderColor: "border-[#61dafb]/40", iconColor: "text-[#61dafb]", glowRgb: "97, 218, 251" },
  "Next.js": { icon: SiNextdotjs, textColor: "text-white", bgColor: "bg-slate-800/90", borderColor: "border-slate-700", iconColor: "text-white", glowRgb: "14, 165, 233" },
  "Vue.js": { icon: SiVuedotjs, textColor: "text-[#41b883]", bgColor: "bg-[#41b883]/15", borderColor: "border-[#41b883]/40", iconColor: "text-[#41b883]", glowRgb: "65, 184, 131" },
  Angular: { icon: SiAngular, textColor: "text-[#dd0031]", bgColor: "bg-[#dd0031]/15", borderColor: "border-[#dd0031]/40", iconColor: "text-[#dd0031]", glowRgb: "221, 0, 49" },
  Svelte: { icon: SiSvelte, textColor: "text-[#ff3e00]", bgColor: "bg-[#ff3e00]/15", borderColor: "border-[#ff3e00]/40", iconColor: "text-[#ff3e00]", glowRgb: "255, 62, 0" },
  "Tailwind CSS": { icon: SiTailwindcss, textColor: "text-[#38bdf8]", bgColor: "bg-[#38bdf8]/15", borderColor: "border-[#38bdf8]/40", iconColor: "text-[#38bdf8]", glowRgb: "56, 189, 248" },
  Bootstrap: { icon: SiBootstrap, textColor: "text-[#c084fc]", bgColor: "bg-[#7952b3]/15", borderColor: "border-[#7952b3]/40", iconColor: "text-[#a855f7]", glowRgb: "121, 82, 179" },
  "Material UI": { icon: SiMui, textColor: "text-[#007fff]", bgColor: "bg-[#007fff]/15", borderColor: "border-[#007fff]/40", iconColor: "text-[#007fff]", glowRgb: "0, 127, 255" },
  "Shadcn/ui": { icon: Layers, textColor: "text-slate-100", bgColor: "bg-slate-800", borderColor: "border-slate-600", iconColor: "text-slate-200", glowRgb: "14, 165, 233" },
  "Framer Motion": { icon: Sparkles, textColor: "text-[#ec4899]", bgColor: "bg-[#ec4899]/15", borderColor: "border-[#ec4899]/40", iconColor: "text-[#ec4899]", glowRgb: "236, 72, 153" },
  "Responsive Web Design": { icon: Smartphone, textColor: "text-sky-300", bgColor: "bg-sky-500/15", borderColor: "border-sky-400/40", iconColor: "text-sky-400", glowRgb: "14, 165, 233" },

  // AI & Models
  "Claude AI": { icon: Brain, textColor: "text-amber-300", bgColor: "bg-amber-500/15", borderColor: "border-amber-400/40", iconColor: "text-amber-400", glowRgb: "245, 158, 11" },
  ChatGPT: { icon: Cpu, textColor: "text-emerald-300", bgColor: "bg-emerald-500/15", borderColor: "border-emerald-400/40", iconColor: "text-emerald-400", glowRgb: "16, 185, 129" },
  "OpenAI Codex": { icon: Sparkles, textColor: "text-emerald-300", bgColor: "bg-emerald-500/15", borderColor: "border-emerald-400/40", iconColor: "text-emerald-400", glowRgb: "16, 185, 129" },
  "GitHub Copilot": { icon: SiGithub, textColor: "text-[#38bdf8]", bgColor: "bg-sky-500/15", borderColor: "border-sky-400/40", iconColor: "text-sky-400", glowRgb: "56, 189, 248" },
  "Cursor AI": { icon: Wand2, textColor: "text-purple-300", bgColor: "bg-purple-500/15", borderColor: "border-purple-400/40", iconColor: "text-purple-400", glowRgb: "168, 85, 247" },
  "Gemini AI": { icon: Sparkles, textColor: "text-sky-300", bgColor: "bg-sky-500/15", borderColor: "border-sky-400/40", iconColor: "text-sky-400", glowRgb: "56, 189, 248" },
  "Antigravity IDE": { icon: Zap, textColor: "text-cyan-300", bgColor: "bg-cyan-500/15", borderColor: "border-cyan-400/40", iconColor: "text-cyan-400", glowRgb: "6, 182, 212" },
  "nvidia Nemotron 3": { icon: SiNvidia, textColor: "text-[#76b900]", bgColor: "bg-[#76b900]/15", borderColor: "border-[#76b900]/40", iconColor: "text-[#76b900]", glowRgb: "118, 185, 0" },
  "Prompt Engineering": { icon: Wand2, textColor: "text-amber-300", bgColor: "bg-amber-500/15", borderColor: "border-amber-400/40", iconColor: "text-amber-400", glowRgb: "245, 158, 11" },
  "Context Engineering": { icon: Brain, textColor: "text-sky-300", bgColor: "bg-sky-500/15", borderColor: "border-sky-400/40", iconColor: "text-sky-400", glowRgb: "14, 165, 233" },
  "AI Code Generation": { icon: Bot, textColor: "text-emerald-300", bgColor: "bg-emerald-500/15", borderColor: "border-emerald-400/40", iconColor: "text-emerald-400", glowRgb: "16, 185, 129" },
  "AI Workflow Automation": { icon: Zap, textColor: "text-rose-300", bgColor: "bg-rose-500/15", borderColor: "border-rose-400/40", iconColor: "text-rose-400", glowRgb: "244, 63, 94" },

  // UI/UX
  Figma: { icon: SiFigma, textColor: "text-[#a855f7]", bgColor: "bg-[#f24e1e]/15", borderColor: "border-[#a855f7]/40", iconColor: "text-[#f24e1e]", glowRgb: "242, 78, 30" },
  Canva: { icon: LayoutTemplate, textColor: "text-[#00c4cc]", bgColor: "bg-[#00c4cc]/15", borderColor: "border-[#00c4cc]/40", iconColor: "text-[#00c4cc]", glowRgb: "0, 196, 204" },
  "Adobe XD": { icon: Palette, textColor: "text-[#ff61f6]", bgColor: "bg-[#ff61f6]/15", borderColor: "border-[#ff61f6]/40", iconColor: "text-[#ff61f6]", glowRgb: "255, 97, 246" },

  // State & Data
  "Redux / Redux Toolkit": { icon: SiRedux, textColor: "text-[#764abc]", bgColor: "bg-[#764abc]/15", borderColor: "border-[#764abc]/40", iconColor: "text-[#764abc]", glowRgb: "118, 74, 188" },
  Zustand: { icon: Layers, textColor: "text-amber-300", bgColor: "bg-amber-500/15", borderColor: "border-amber-400/40", iconColor: "text-amber-400", glowRgb: "245, 158, 11" },
  "React Query / TanStack Query": { icon: SiReactquery, textColor: "text-[#ff4154]", bgColor: "bg-[#ff4154]/15", borderColor: "border-[#ff4154]/40", iconColor: "text-[#ff4154]", glowRgb: "255, 65, 84" },
  Axios: { icon: Globe, textColor: "text-cyan-300", bgColor: "bg-cyan-500/15", borderColor: "border-cyan-400/40", iconColor: "text-cyan-400", glowRgb: "6, 182, 212" },
  "REST APIs": { icon: Globe, textColor: "text-emerald-300", bgColor: "bg-emerald-500/15", borderColor: "border-emerald-400/40", iconColor: "text-emerald-400", glowRgb: "16, 185, 129" },
  GraphQL: { icon: SiGraphql, textColor: "text-[#e10098]", bgColor: "bg-[#e10098]/15", borderColor: "border-[#e10098]/40", iconColor: "text-[#e10098]", glowRgb: "225, 0, 152" },

  // Backend & Database
  "Node.js": { icon: SiNodedotjs, textColor: "text-[#68a063]", bgColor: "bg-[#68a063]/15", borderColor: "border-[#68a063]/40", iconColor: "text-[#68a063]", glowRgb: "104, 160, 99" },
  "Express.js": { icon: SiExpress, textColor: "text-slate-100", bgColor: "bg-slate-800", borderColor: "border-slate-600", iconColor: "text-slate-200", glowRgb: "14, 165, 233" },
  Python: { icon: SiPython, textColor: "text-[#3776ab]", bgColor: "bg-[#3776ab]/15", borderColor: "border-[#3776ab]/40", iconColor: "text-[#3776ab]", glowRgb: "55, 118, 171" },
  Flask: { icon: SiFlask, textColor: "text-slate-200", bgColor: "bg-slate-800", borderColor: "border-slate-600", iconColor: "text-slate-300", glowRgb: "100, 116, 139" },
  FastAPI: { icon: SiFastapi, textColor: "text-[#009688]", bgColor: "bg-[#009688]/15", borderColor: "border-[#009688]/40", iconColor: "text-[#009688]", glowRgb: "0, 150, 136" },
  PostgreSQL: { icon: SiPostgresql, textColor: "text-[#336791]", bgColor: "bg-[#336791]/15", borderColor: "border-[#336791]/40", iconColor: "text-[#336791]", glowRgb: "51, 103, 145" },
  MySQL: { icon: SiMysql, textColor: "text-[#00758f]", bgColor: "bg-[#00758f]/15", borderColor: "border-[#00758f]/40", iconColor: "text-[#00758f]", glowRgb: "0, 117, 143" },
  MongoDB: { icon: SiMongodb, textColor: "text-[#47a248]", bgColor: "bg-[#47a248]/15", borderColor: "border-[#47a248]/40", iconColor: "text-[#47a248]", glowRgb: "71, 162, 72" },
  "Prisma ORM": { icon: SiPrisma, textColor: "text-[#2d3748]", bgColor: "bg-slate-700/50", borderColor: "border-slate-500", iconColor: "text-slate-200", glowRgb: "51, 65, 85" },
  Supabase: { icon: SiSupabase, textColor: "text-[#3ecf8e]", bgColor: "bg-[#3ecf8e]/15", borderColor: "border-[#3ecf8e]/40", iconColor: "text-[#3ecf8e]", glowRgb: "62, 207, 142" },
  Firebase: { icon: SiFirebase, textColor: "text-[#ffca28]", bgColor: "bg-[#ffca28]/15", borderColor: "border-[#ffca28]/40", iconColor: "text-[#ffca28]", glowRgb: "255, 202, 40" },

  // Authentication & OAuth 2.0
  "JWT Authentication": { icon: KeyRound, textColor: "text-[#d63aff]", bgColor: "bg-[#d63aff]/15", borderColor: "border-[#d63aff]/40", iconColor: "text-[#d63aff]", glowRgb: "214, 58, 255" },
  "OAuth 2.0": { icon: ShieldCheck, textColor: "text-sky-300", bgColor: "bg-sky-500/15", borderColor: "border-sky-400/40", iconColor: "text-sky-400", glowRgb: "14, 165, 233" },
  "Google OAuth Login": { icon: SiGoogle, textColor: "text-[#4285f4]", bgColor: "bg-[#4285f4]/15", borderColor: "border-[#4285f4]/40", iconColor: "text-[#4285f4]", glowRgb: "66, 133, 244" },
  "GitHub OAuth Login": { icon: SiGithub, textColor: "text-white", bgColor: "bg-slate-800", borderColor: "border-slate-600", iconColor: "text-white", glowRgb: "15, 23, 42" },

  // Payments
  Razorpay: { icon: SiRazorpay, textColor: "text-[#0c2340]", bgColor: "bg-[#0284c7]/20", borderColor: "border-sky-400/50", iconColor: "text-sky-400", glowRgb: "14, 165, 233" },
  "Payment Gateway Integration": { icon: CreditCard, textColor: "text-emerald-300", bgColor: "bg-emerald-500/15", borderColor: "border-emerald-400/40", iconColor: "text-emerald-400", glowRgb: "16, 185, 129" },

  // Mobile
  Flutter: { icon: SiFlutter, textColor: "text-[#02569b]", bgColor: "bg-[#02569b]/15", borderColor: "border-[#02569b]/40", iconColor: "text-[#40d0fd]", glowRgb: "64, 208, 253" },
  Dart: { icon: SiDart, textColor: "text-[#0175c2]", bgColor: "bg-[#0175c2]/15", borderColor: "border-[#0175c2]/40", iconColor: "text-[#0175c2]", glowRgb: "1, 117, 194" },

  // CMS
  WordPress: { icon: SiWordpress, textColor: "text-[#21759b]", bgColor: "bg-[#21759b]/15", borderColor: "border-[#21759b]/40", iconColor: "text-[#21759b]", glowRgb: "33, 117, 155" },
  Shopify: { icon: SiShopify, textColor: "text-[#96bf48]", bgColor: "bg-[#96bf48]/15", borderColor: "border-[#96bf48]/40", iconColor: "text-[#96bf48]", glowRgb: "150, 191, 72" },
  Webflow: { icon: SiWebflow, textColor: "text-[#4353ff]", bgColor: "bg-[#4353ff]/15", borderColor: "border-[#4353ff]/40", iconColor: "text-[#4353ff]", glowRgb: "67, 83, 255" },

  // Build & Tools
  Vite: { icon: SiVite, textColor: "text-[#646cff]", bgColor: "bg-[#646cff]/15", borderColor: "border-[#646cff]/40", iconColor: "text-[#646cff]", glowRgb: "100, 108, 255" },
  Webpack: { icon: SiWebpack, textColor: "text-[#8dd6f9]", bgColor: "bg-[#8dd6f9]/15", borderColor: "border-[#8dd6f9]/40", iconColor: "text-[#8dd6f9]", glowRgb: "141, 214, 249" },
  npm: { icon: SiNpm, textColor: "text-[#cb3837]", bgColor: "bg-[#cb3837]/15", borderColor: "border-[#cb3837]/40", iconColor: "text-[#cb3837]", glowRgb: "203, 56, 55" },
  Yarn: { icon: SiYarn, textColor: "text-[#2c8ebb]", bgColor: "bg-[#2c8ebb]/15", borderColor: "border-[#2c8ebb]/40", iconColor: "text-[#2c8ebb]", glowRgb: "44, 138, 187" },
  pnpm: { icon: SiPnpm, textColor: "text-[#f69220]", bgColor: "bg-[#f69220]/15", borderColor: "border-[#f69220]/40", iconColor: "text-[#f69220]", glowRgb: "246, 146, 32" },
  Bun: { icon: SiBun, textColor: "text-amber-100", bgColor: "bg-amber-500/15", borderColor: "border-amber-400/40", iconColor: "text-amber-300", glowRgb: "245, 158, 11" },

  // Testing
  Jest: { icon: SiJest, textColor: "text-[#c21325]", bgColor: "bg-[#c21325]/15", borderColor: "border-[#c21325]/40", iconColor: "text-[#c21325]", glowRgb: "194, 19, 37" },
  Cypress: { icon: SiCypress, textColor: "text-slate-100", bgColor: "bg-slate-800", borderColor: "border-slate-600", iconColor: "text-emerald-400", glowRgb: "16, 185, 129" },
  Playwright: { icon: CheckCircle2, textColor: "text-[#45ba4b]", bgColor: "bg-[#45ba4b]/15", borderColor: "border-[#45ba4b]/40", iconColor: "text-[#45ba4b]", glowRgb: "69, 186, 75" },
  ESLint: { icon: SiEslint, textColor: "text-[#4b32c6]", bgColor: "bg-[#4b32c6]/15", borderColor: "border-[#4b32c6]/40", iconColor: "text-[#4b32c6]", glowRgb: "75, 50, 198" },
  Prettier: { icon: SiPrettier, textColor: "text-[#f7b93e]", bgColor: "bg-[#f7b93e]/15", borderColor: "border-[#f7b93e]/40", iconColor: "text-[#f7b93e]", glowRgb: "247, 185, 62" },

  // Deployment
  Git: { icon: SiGit, textColor: "text-[#f05032]", bgColor: "bg-[#f05032]/15", borderColor: "border-[#f05032]/40", iconColor: "text-[#f05032]", glowRgb: "240, 80, 50" },
  GitHub: { icon: SiGithub, textColor: "text-white", bgColor: "bg-slate-800", borderColor: "border-slate-600", iconColor: "text-white", glowRgb: "15, 23, 42" },
  Vercel: { icon: SiVercel, textColor: "text-white", bgColor: "bg-slate-800", borderColor: "border-slate-600", iconColor: "text-white", glowRgb: "14, 165, 233" },
  Netlify: { icon: SiNetlify, textColor: "text-[#00c7b7]", bgColor: "bg-[#00c7b7]/15", borderColor: "border-[#00c7b7]/40", iconColor: "text-[#00c7b7]", glowRgb: "0, 199, 183" },
  Cloudflare: { icon: SiCloudflare, textColor: "text-[#f38020]", bgColor: "bg-[#f38020]/15", borderColor: "border-[#f38020]/40", iconColor: "text-[#f38020]", glowRgb: "243, 128, 32" },
  AWS: { icon: Cloud, textColor: "text-[#ff9900]", bgColor: "bg-[#ff9900]/15", borderColor: "border-[#ff9900]/40", iconColor: "text-[#ff9900]", glowRgb: "255, 153, 0" },
  Docker: { icon: SiDocker, textColor: "text-[#2496ed]", bgColor: "bg-[#2496ed]/15", borderColor: "border-[#2496ed]/40", iconColor: "text-[#2496ed]", glowRgb: "36, 150, 237" },
};

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [cvCategory, setCvCategory] = useState<string>("All");

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  // Full-Stack Short CV Portfolio quick-view data with specified Claymorphism palette
  const cvShortCategories = [
    {
      label: "Frontend",
      clayClass: "clay-blue",
      badgeBg: "#99C2FF",
      textColor: "text-[#0f2b66]",
      icon: Sparkles,
      items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Responsive UI/UX", "Flutter"],
    },
    {
      label: "UI/UX & Design",
      clayClass: "clay-pink",
      badgeBg: "#FF84BA",
      textColor: "text-[#701a40]",
      icon: Palette,
      items: ["Figma", "Canva", "Wireframing", "Prototyping", "Design Systems"],
    },
    {
      label: "CMS & Platforms",
      clayClass: "clay-peach",
      badgeBg: "#FFEFE3",
      textColor: "text-[#7c2d12]",
      icon: LayoutTemplate,
      items: ["WordPress", "Shopify", "Webflow", "Shopify Liquid", "Webflow CMS"],
    },
    {
      label: "AI & Agents",
      clayClass: "clay-yellow",
      badgeBg: "#FFDF82",
      textColor: "text-[#713f12]",
      icon: Bot,
      items: ["Claude AI", "ChatGPT", "OpenAI Codex", "GitHub Copilot", "Cursor AI", "Gemini AI", "Antigravity IDE", "nvidia Nemotron 3", "Prompt Engineering", "Context Engineering", "AI Code Generation", "AI Workflow Automation"],
    },
    {
      label: "Backend & DB",
      clayClass: "clay-cyan",
      badgeBg: "#CFECF3",
      textColor: "text-[#0e4555]",
      icon: Globe,
      items: ["Node.js", "Express.js", "Python", "Flask", "FastAPI", "REST API", "PostgreSQL", "MySQL", "MongoDB", "Prisma", "Supabase", "Firebase"],
    },
    {
      label: "Authentication",
      clayClass: "clay-yellow",
      badgeBg: "#FFDF82",
      textColor: "text-[#713f12]",
      icon: ShieldCheck,
      items: ["JWT", "OAuth 2.0", "Google OAuth Login", "GitHub OAuth Login", "RBAC"],
    },
    {
      label: "Tools & DevOps",
      clayClass: "clay-lime",
      badgeBg: "#F6FFDC",
      textColor: "text-[#365314]",
      icon: Cloud,
      items: ["Git", "GitHub", "Docker", "npm", "Vite", "ESLint", "Prettier", "Jest", "Playwright", "Vercel", "AWS"],
    },
    {
      label: "Payments",
      clayClass: "clay-mint",
      badgeBg: "#DAF9DE",
      textColor: "text-[#114b25]",
      icon: CreditCard,
      items: ["Razorpay", "Payment Gateway Integration", "Webhooks", "Subscription Integration"],
    },
  ];

  return (
    <section id="about" className="relative w-full py-20 bg-[#f0f9ff] overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <article className="max-w-screen-md mx-auto text-center space-y-3">
          <TimelineContent
            as="div"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-glass-button text-sky-700 text-xs font-bold tracking-wider uppercase"
            animationNum={0}
            customVariants={revealVariants}
            timelineRef={sectionRef}
          >
            <User className="w-3.5 h-3.5" />
            <span>About Us</span>
          </TimelineContent>

          <TimelineContent
            as="h2"
            className="text-3xl sm:text-5xl font-black tracking-tight clay-headline-multicolor"
            animationNum={1}
            customVariants={revealVariants}
            timelineRef={sectionRef}
          >
            Shuvendu Dhenki — UI/UX Designer, Web & Mobile App Designer
          </TimelineContent>

          <TimelineContent
            as="p"
            className="mx-auto text-base sm:text-lg text-slate-600 max-w-3xl"
            animationNum={2}
            customVariants={revealVariants}
            timelineRef={sectionRef}
          >
            Shuvendu Dhenki is a UI/UX designer specializing in website design, web design, mobile app design, user experience, user interfaces and digital products.
          </TimelineContent>
        </article>

        {/* Top Profile Summary Card */}
        <div className="mt-10 mb-12">
          <TimelineContent
            animationNum={0}
            customVariants={revealVariants}
            timelineRef={sectionRef}
            className="relative bg-gradient-to-br from-sky-600 via-sky-700 to-blue-800 text-white overflow-hidden rounded-3xl border border-sky-400/40 p-6 sm:p-8 shadow-2xl shadow-sky-500/20"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff26_1px,transparent_1px),linear-gradient(to_bottom,#ffffff26_1px,transparent_1px)] bg-[size:40px_44px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Profile Image & Badge */}
              <div className="flex items-center gap-5 shrink-0">
                <img
                  src={shuvenduImg}
                  alt="Shuvendu Dhenki — UI/UX Designer & Web Designer CV"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white/80 shadow-2xl shadow-sky-950/40"
                />
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-extrabold text-white border border-white/30 tracking-wide uppercase mb-1">
                    <Zap className="w-3.5 h-3.5 text-sky-200" />
                    <span>10+ Years of Expertise</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {PORTFOLIO_DATA.personal.name}
                  </h3>
                  <p className="text-sm font-bold text-sky-200 uppercase tracking-wider">
                    UI/UX Designer, Web & Mobile App Designer
                  </p>
                </div>
              </div>

              {/* Summary Description */}
              <div data-lenis-prevent className="max-h-[220px] overflow-y-auto glass-scrollbar pr-2 space-y-2 text-sky-50 text-xs sm:text-sm leading-relaxed max-w-2xl">
                <p>
                  <strong className="text-white font-extrabold">Senior Full-Stack & UI/UX Developer</strong> with 10+ years of hands-on experience delivering enterprise web applications, SaaS platforms, cross-platform Flutter mobile apps, and custom CMS stores (WordPress, Shopify, Webflow).
                </p>
                <p>
                  Proficient in modern full-stack development using <span className="text-white font-bold">React, Next.js, Vue, Angular, Node.js, Express, Python (FastAPI/Flask), PostgreSQL, Supabase, Firebase, and Prisma ORM</span>. Expert in configuring <span className="text-white font-bold">Google & GitHub OAuth 2.0 authentication flows</span>, integrating <span className="text-white font-bold">Razorpay payment gateways with webhooks & subscriptions</span>, and writing clean automated test suites with Jest & Playwright.
                </p>
                <p className="pt-1 text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Immediately Available for Full-Time, Lead & International Roles.</span>
                </p>
              </div>
            </div>
          </TimelineContent>
        </div>

        {/* Short CV / Portfolio Quick-View Claymorphism Section */}
        <div className="mb-14">
          <TimelineContent
            animationNum={1}
            customVariants={revealVariants}
            timelineRef={sectionRef}
            className="clay-container p-6 sm:p-9 border-4 border-white shadow-2xl relative overflow-hidden"
          >
            {/* Header with 3D Clay Icon Badge */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8 border-b-2 border-slate-100 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl clay-badge clay-blue flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-[#0f2b66]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight clay-headline-multicolor">
                    Short CV / Portfolio Quick-View
                  </h3>
                </div>
              </div>

              {/* Claymorphism Category Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setCvCategory("All")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide transition-all cursor-pointer ${
                    cvCategory === "All"
                      ? "clay-badge clay-blue clay-button-active text-[#0f2b66] font-black"
                      : "clay-badge bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  All ({cvShortCategories.length})
                </button>
                {cvShortCategories.map((cat) => {
                  const isActive = cvCategory === cat.label;
                  const CatIcon = cat.icon;
                  return (
                    <button
                      key={cat.label}
                      onClick={() => setCvCategory(cat.label)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                        isActive
                          ? `clay-badge ${cat.clayClass} clay-button-active font-black`
                          : "clay-badge bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {CatIcon && <CatIcon className="w-3.5 h-3.5 shrink-0" />}
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Claymorphism 3D Multi-Color Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cvShortCategories
                .filter((cat) => cvCategory === "All" || cvCategory === cat.label)
                .map((cat, idx) => {
                  const CatIcon = cat.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-5 clay-card ${cat.clayClass} flex flex-col justify-between space-y-3 relative overflow-hidden`}
                    >
                      <div className="flex items-center justify-between border-b border-black/10 pb-2.5">
                        <span className="text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
                          {CatIcon && <CatIcon className="w-4 h-4 text-slate-900 shrink-0" />}
                          <span>{cat.label}</span>
                        </span>
                        <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-white/80 backdrop-blur-md shadow-xs">
                          {cat.items.length} Skills
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {cat.items.map((item, itemIdx) => {
                          const cfg = skillConfigMap[item];
                          const IconComp = cfg?.icon;
                          return (
                            <span
                              key={itemIdx}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black liquid-glass-badge text-slate-900 shadow-md cursor-default"
                              style={{ "--glow-rgb": cfg?.glowRgb || "14, 165, 233" } as React.CSSProperties}
                            >
                              {IconComp && <IconComp className="w-3.5 h-3.5 text-slate-800 shrink-0" />}
                              <span>{item}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Integrated AI-Assisted Workflows Card */}
            <div className="mt-8">
              <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 text-white rounded-3xl border border-sky-500/30 p-6 sm:p-8 shadow-2xl space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center justify-center font-bold">
                      <Cpu className="w-5 h-5 text-sky-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white">
                        AI-Assisted Development Workflows & Agents
                      </h4>
                      <p className="text-xs font-semibold text-sky-300">
                        Accelerated software engineering using autonomous AI coding tools & LLM pipelines
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                    <h5 className="text-xs font-extrabold text-sky-300 uppercase tracking-widest flex items-center gap-1.5">
                      <Wand2 className="w-3.5 h-3.5 text-sky-400" />
                      Engineering Workflows
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Prompt Engineering",
                        "Context Engineering",
                        "AI Code Generation",
                        "nvidia Nemotron 3",
                        "AI-Assisted Debugging",
                        "AI Code Review",
                        "AI Workflow Automation",
                        "Rapid UI Prototyping",
                        "Code Optimization",
                      ].map((wf, idx) => {
                        const cfg = skillConfigMap[wf];
                        const IconComp = cfg?.icon;
                        return (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black liquid-glass-badge text-slate-900 shadow-md cursor-default"
                            style={{ "--glow-rgb": cfg?.glowRgb || "14, 165, 233" } as React.CSSProperties}
                          >
                            {IconComp && <IconComp className="w-3.5 h-3.5 text-slate-800 shrink-0" />}
                            <span>{wf}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                    <h5 className="text-xs font-extrabold text-emerald-300 uppercase tracking-widest flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-emerald-400" />
                      AI IDEs & LLM Platforms
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {["Claude AI", "ChatGPT", "OpenAI Codex", "GitHub Copilot", "Cursor AI", "Gemini AI", "Antigravity IDE", "nvidia Nemotron 3"].map((tool, idx) => {
                        const cfg = skillConfigMap[tool];
                        const IconComp = cfg?.icon;
                        return (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black liquid-glass-badge text-slate-900 shadow-md cursor-default"
                            style={{ "--glow-rgb": cfg?.glowRgb || "16, 185, 129" } as React.CSSProperties}
                          >
                            {IconComp && <IconComp className="w-3.5 h-3.5 text-slate-800 shrink-0" />}
                            <span>{tool}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TimelineContent>
        </div>

        {/* Decorative Bottom Corner Marker */}
        <div className="relative border-b border-slate-200 mt-12 h-8 z-10 w-full">
          <div className="w-full h-full relative before:absolute before:-left-2 before:-bottom-2 before:w-4 before:h-4 before:bg-white before:shadow-sm before:border before:border-slate-300 after:absolute after:-right-2 after:-bottom-2 after:w-4 after:h-4 after:bg-white after:shadow-sm after:border after:border-slate-300" />
        </div>

      </div>
    </section>
  );
};

export default About;
