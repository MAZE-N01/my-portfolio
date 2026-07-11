import React, { useEffect, useRef, useState } from "react";
import {
  Mail,
  MessageCircle,
  Menu,
  X,
  ArrowUpRight,
  GraduationCap,
  Award,
  Building2,
  Eye,
  HeartPulse,
  Users,
  Globe,
} from "lucide-react";

/* Brand icons (removed from lucide-react v1) */
const Github = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);
const Linkedin = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

/* ============================== TOKENS ============================== */
/* Near-black base — blue is spent deliberately on the planet, the primary
   action, and small labels only. Everything structural is neutral. */

const C = {
  void: "#020304",
  deep: "#040507",
  panel: "#08090C",
  panelBorder: "rgba(255,255,255,0.07)",
  panelBorderHover: "rgba(255,255,255,0.20)",
  orbit: "#2F6FEA",
  orbitBright: "#5B93FF",
  signal: "#5EEAFF",
  star: "#F3F5F9",
  haze: "#B0B8C7",
  hazeDim: "#7A8292",
};

const FONT_DISPLAY = "'Space Grotesk', sans-serif";
const FONT_BODY = "'IBM Plex Sans', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

/* ============================== DATA ============================== */

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const EXPERIENCE = [
  {
    role: "Artificial Intelligence Engineer Intern",
    org: "Orange Digital Center",
    date: "Nov 2024 — Dec 2024",
    points: [
      "Developed and fine-tuned machine learning models for real-world applications",
      "Collaborated on building scalable AI solutions following industry best practices",
      "Applied advanced AI algorithms with preprocessing, feature engineering, and evaluation",
    ],
  },
  {
    role: "AI Training Specialist",
    org: "Outlier — Freelance, Remote",
    date: "Oct 2024 — Present",
    points: [
      "Supported the development of AI systems by analyzing datasets and improving model responses",
      "Applied data-driven techniques to optimize model performance and output quality",
      "Ensured reliability and consistency of AI outputs through evaluation and refinement processes",
    ],
  },
  {
    role: "Artificial Intelligence Trainee",
    org: "Instant Software Solutions",
    date: "Oct 2023 — Jul 2024",
    points: [
      "Built strong foundations in AI and its mathematical principles",
      "Applied machine learning and deep learning techniques in practical scenarios",
      "Developed understanding of Computer Vision and Natural Language Processing systems",
    ],
  },
  {
    role: "AI & Data Science Trainee",
    org: "DEPI — IBM Program",
    date: "Oct 2024 — May 2025",
    points: [
      "Applied data science methodologies and machine learning techniques on real datasets",
      "Worked with MLOps tools including MLflow and Hugging Face for model lifecycle management",
      "Developed data visualization solutions and strengthened communication & freelancing skills",
    ],
  },
  {
    role: "AI & Data Science Trainee",
    org: "Microsoft Student Club — EELU",
    date: "Oct 2024 — Feb 2025",
    points: [
      "Applied machine learning and data analysis techniques on real datasets",
      "Built interactive dashboards using Power BI to visualize business insights",
      "Delivered presentations explaining analytical findings and model outputs",
    ],
  },
  {
    role: "Data Analysis Trainee",
    org: "Mechanism AI",
    date: "May 2023 — Jul 2023",
    points: [
      "Cleaned, processed, and transformed raw data into structured datasets",
      "Conducted exploratory data analysis to identify trends and patterns",
      "Designed visual dashboards to communicate analytical insights effectively",
    ],
  },
];

const PROJECT_ACCENTS = [
  { from: "#2F6FEA", to: "#5EEAFF" },
  { from: "#2F6FEA", to: "#5EEAFF" },
  { from: "#2F6FEA", to: "#5EEAFF" },
  { from: "#2F6FEA", to: "#5EEAFF" },
];

const PROJECTS = [
  {
    tag: "AUTOMATION",
    icon: Building2,
    title: "AI-Powered Real Estate Automation Platform",
    subtitle: "Graduation Project",
    desc: "Contributed to building an autonomous voice agent integrated with a smart CRM to automate client calls, qualify leads, and connect buyers and sellers through real-time data and intelligent matching.",
    tags: ["Voice AI", "CRM Integration", "Lead Qualification", "Automation"],
    featured: true,
  },
  {
    tag: "COMPUTER VISION",
    icon: Eye,
    title: "Transfer Learning with ResNet-18",
    subtitle: "Image Classification",
    desc: "Fine-tuned a pre-trained ResNet-18 model using transfer learning to improve image classification accuracy on a custom dataset.",
    tags: ["Transfer Learning", "ResNet-18", "CNNs"],
  },
  {
    tag: "MEDICAL IMAGING",
    icon: HeartPulse,
    title: "Chest CT Scan Image Classification",
    subtitle: "Applied Deep Learning",
    desc: "Developed a deep learning model to classify chest CT scan images, demonstrating applied AI for medical image analysis.",
    tags: ["Deep Learning", "Medical Imaging", "CNNs"],
  },
  {
    tag: "CLUSTERING",
    icon: Users,
    title: "E-Commerce Customer Segmentation",
    subtitle: "Unsupervised Learning",
    desc: "Performed unsupervised clustering on e-commerce customer behavior data to identify meaningful segments for business insights.",
    tags: ["Unsupervised Learning", "Clustering", "Customer Analytics"],
  },
];

const SKILLS = [
  {
    title: "Programming Languages & Databases",
    short: "Languages & DB",
    items: ["Python", "Java", "C++", "C#", "Dart", "SQL", "SQLite", "PostgreSQL", "MongoDB", "Redis", "HTML", "CSS", "React.js", "Tailwind CSS"],
  },
  {
    title: "Machine Learning & Deep Learning",
    short: "ML / Deep Learning",
    items: ["Supervised & Unsupervised Learning", "CNNs", "RNNs", "Transformers", "YOLO", "LoRA Fine-Tuning", "Attention Mechanisms", "Model Evaluation"],
  },
  {
    title: "NLP & LLM Engineering",
    short: "NLP / LLM",
    items: ["Prompt Engineering", "Language Modeling", "Tokenization", "Semantic Search", "RAG", "Agentic RAG"],
  },
  {
    title: "MLOps & Deployment",
    short: "MLOps",
    items: ["Git", "GitHub", "Docker", "Jupyter", "VS Code", "MLflow", "Hugging Face", "NLTK"],
  },
  {
    title: "Data Analysis",
    short: "Data Analysis",
    items: ["Matplotlib", "Seaborn", "Power BI", "Pandas", "NumPy", "Data Scraping", "Data Modeling"],
  },
  {
    title: "Soft Skills",
    short: "Soft Skills",
    items: ["Analytical Thinking", "Problem Solving", "Critical Thinking", "Communication", "Attention to Detail"],
  },
];

const CERTS = [
  "IBM AI & Data Science Program — DEPI",
  "Artificial Intelligence Diploma — Instant Software Solutions",
  "Advanced AI Training — Orange Digital Center",
  "Data Analysis Workshop — Mechanism AI",
];

const CONTACT = {
  email: "mazenemad812211@gmail.com",
  whatsapp: "+20 10 1889 0210",
  whatsappLink: "https://wa.me/201018890210",
  linkedin: "https://www.linkedin.com/in/mazenemad615/",
  github: "https://github.com/MAZE-N01",
  location: "El Shorouk City, Cairo, Egypt",
};

/* Globe math & geography removed — replaced by background image hero */



/* ============================== VISUAL COMPONENTS ============================== */

function Starfield() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let width, height, dpr, stars, nebulae;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function init() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor((width * height) / 7800);
      stars = Array.from({ length: count }, () => {
        const big = Math.random() > 0.94;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: big ? Math.random() * 0.9 + 1.3 : Math.random() * 0.9 + 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: 0.25 + Math.random() * 0.6,
          big,
        };
      });
      nebulae = [
        { x: width * 0.18, y: height * 0.22, r: Math.max(width, height) * 0.42, c: "70,90,160" },
        { x: width * 0.85, y: height * 0.7, r: Math.max(width, height) * 0.38, c: "50,70,130" },
        { x: width * 0.55, y: height * 0.05, r: Math.max(width, height) * 0.3, c: "90,60,140" },
      ];
    }
    init();
    window.addEventListener("resize", init);

    let t = 0;
    function draw() {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      for (const n of nebulae) {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        g.addColorStop(0, `rgba(${n.c},0.05)`);
        g.addColorStop(1, `rgba(${n.c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }

      for (const s of stars) {
        const a = reduceMotion ? 0.55 : 0.3 + 0.55 * Math.abs(Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235,242,255,${a})`;
        ctx.fill();
        if (s.big) {
          ctx.fillStyle = `rgba(235,242,255,${a * 0.18})`;
          ctx.fillRect(s.x - 5, s.y - 0.4, 10, 0.8);
          ctx.fillRect(s.x - 0.4, s.y - 5, 0.8, 10);
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}



/* ============================== REVEAL WRAPPER ============================== */

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.95s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.95s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: show ? "auto" : "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ============================== UI PRIMITIVES ============================== */

function Eyebrow({ children }) {
  return (
    <div
      style={{
        fontFamily: FONT_MONO,
        fontSize: 12,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: C.signal,
        marginBottom: 14,
        fontWeight: 500,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children, style = {} }) {
  return (
    <h2
      style={{
        fontFamily: FONT_DISPLAY,
        fontWeight: 600,
        fontSize: "clamp(28px, 3.6vw, 40px)",
        color: C.star,
        letterSpacing: "-0.01em",
        marginBottom: 16,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function Chip({ children }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: FONT_MONO,
        fontSize: 12.5,
        color: C.haze,
        border: `1px solid ${C.panelBorder}`,
        borderRadius: 999,
        padding: "6px 13px",
        background: "rgba(94,234,255,0.03)",
        transition: "border-color 0.25s ease, color 0.25s ease",
      }}
      className="skill-chip"
    >
      {children}
    </span>
  );
}

function IconButton({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="icon-btn"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 42,
        height: 42,
        borderRadius: 12,
        border: `1px solid ${C.panelBorder}`,
        color: C.star,
        background: "rgba(255,255,255,0.02)",
      }}
    >
      {children}
    </a>
  );
}

/* ============================== NAV ============================== */

function Nav({ menuOpen, setMenuOpen }) {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(2,3,4,0.78)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: `1px solid ${C.panelBorder}`,
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 24px" }}
      >
        <a
          href="#home"
          onClick={(e) => scrollTo(e, "home")}
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 18,
            color: C.star,
            display: "flex",
            alignItems: "center",
            gap: 11,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: C.signal,
              boxShadow: `0 0 10px 2px ${C.signal}`,
              display: "inline-block",
              animation: "pulseDot 2.4s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: C.star, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Portfolio
          </span>
        </a>

        <nav className="hidden md:flex" style={{ gap: 30 }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => scrollTo(e, l.id)}
              className="nav-link"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 14.5,
                color: C.haze,
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            color: C.star,
            background: "transparent",
            border: "none",
            padding: 6,
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            borderTop: `1px solid ${C.panelBorder}`,
            background: C.void,
            padding: "10px 24px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { scrollTo(e, l.id); setMenuOpen(false); }}
              style={{
                fontFamily: FONT_BODY,
                fontSize: 15.5,
                color: C.star,
                textDecoration: "none",
                padding: "12px 4px",
                borderBottom: `1px solid ${C.panelBorder}`,
                cursor: "pointer",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

/* ============================== HERO ============================== */

const HERO_IMAGE = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format&fit=crop";

function Hero() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        scrollMarginTop: 0,
      }}
    >
      {/* Background Earth image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src={HERO_IMAGE}
          alt="Earth from space at night"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            display: "block",
          }}
        />
        {/* Dark gradient overlays to make text readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(2,3,4,0.65) 0%, rgba(2,3,4,0.30) 35%, rgba(2,3,4,0.50) 60%, rgba(2,3,4,1) 92%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 55%, transparent 30%, rgba(2,3,4,0.65) 80%)",
          }}
        />
      </div>

      {/* Content overlaid on the image */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 860,
          margin: "0 auto",
          padding: "120px 24px 80px",
          textAlign: "center",
        }}
      >
        <Reveal>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 12.5,
              letterSpacing: "0.18em",
              color: C.signal,
              textTransform: "uppercase",
              marginBottom: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "#4ADE80",
                boxShadow: "0 0 8px 1px #4ADE80",
                animation: "pulseDot 2.4s ease-in-out infinite",
              }}
            />
            Available for opportunities
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontSize: "clamp(40px, 7vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: C.star,
              marginBottom: 22,
              textShadow: "0 4px 40px rgba(0,0,0,0.6)",
            }}
          >
            Mazen Emad
            <br />
            <span style={{ color: C.orbitBright }}>Fawzy</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: "clamp(16px, 1.8vw, 19px)",
              lineHeight: 1.65,
              color: "rgba(200,210,222,0.92)",
              maxWidth: 600,
              margin: "0 auto 38px",
              textShadow: "0 2px 16px rgba(0,0,0,0.5)",
            }}
          >
            Artificial Intelligence Engineer specializing in NLP, machine
            learning, and applied AI — building end-to-end multimodal
            models and production-grade AI pipelines.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="flex flex-wrap" style={{ gap: 14, marginBottom: 40, justifyContent: "center" }}>
            <a href="#projects" className="btn-primary">
              View Projects
              <ArrowUpRight size={17} />
            </a>
            <a href="#contact" className="btn-ghost">
              Get in Touch
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="flex items-center" style={{ gap: 12, justifyContent: "center" }}>
            <IconButton href={CONTACT.github} label="GitHub">
              <Github size={18} />
            </IconButton>
            <IconButton href={CONTACT.linkedin} label="LinkedIn">
              <Linkedin size={18} />
            </IconButton>
            <IconButton href={`mailto:${CONTACT.email}`} label="Email">
              <Mail size={18} />
            </IconButton>
          </div>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          animation: "bounceDown 2s ease-in-out infinite",
        }}
      >
        <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: C.hazeDim, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 24, background: `linear-gradient(180deg, ${C.hazeDim}, transparent)` }} />
      </div>
    </section>
  );
}

/* ============================== ABOUT ============================== */

function About() {
  const focusAreas = [
    "Natural Language Processing",
    "Computer Vision",
    "MLOps & Deployment",
    "Applied Machine Learning",
  ];
  return (
    <section id="about" style={{ padding: "120px 24px 40px", scrollMarginTop: 90 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal>
          <Eyebrow>About</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: "clamp(18px, 2.2vw, 24px)",
              lineHeight: 1.6,
              color: C.star,
              maxWidth: 780,
              marginBottom: 28,
              fontWeight: 400,
            }}
          >
            I work across the full AI lifecycle — framing the problem,
            shaping the dataset, fine-tuning the model, and shipping
            something that still holds up in production. My focus sits at
            the intersection of NLP, computer vision, and MLOps: building
            multimodal systems that are as reliable to operate as they are
            interesting to build.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="flex flex-wrap" style={{ gap: 10 }}>
            {focusAreas.map((f) => (
              <Chip key={f}>{f}</Chip>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== EXPERIENCE ============================== */

function Experience() {
  return (
    <section id="experience" style={{ padding: "100px 24px 40px", scrollMarginTop: 90 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal>
          <Eyebrow>Experience</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionTitle>Where I've worked</SectionTitle>
        </Reveal>

        <div style={{ marginTop: 32, position: "relative" }}>
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              left: 5,
              top: 8,
              bottom: 8,
              width: 1,
              background: `linear-gradient(180deg, ${C.orbit}66, ${C.panelBorder})`,
            }}
          />
          <div className="flex flex-col" style={{ gap: 6 }}>
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.role + e.org} delay={i * 0.06}>
                <div
                  className="exp-card"
                  style={{
                    position: "relative",
                    paddingLeft: 32,
                    paddingTop: 22,
                    paddingBottom: 22,
                    borderBottom:
                      i === EXPERIENCE.length - 1 ? "none" : `1px solid ${C.panelBorder}`,
                  }}
                >
                  <span
                    className="hidden md:block"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 28,
                      width: 11,
                      height: 11,
                      borderRadius: 999,
                      background: C.void,
                      border: `2px solid ${C.signal}`,
                    }}
                  />
                  <div
                    className="flex flex-col md:flex-row md:items-baseline md:justify-between"
                    style={{ marginBottom: 10, gap: 6 }}
                  >
                    <h3
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontSize: 19,
                        fontWeight: 600,
                        color: C.star,
                      }}
                    >
                      {e.role}
                      <span style={{ color: C.hazeDim, fontWeight: 400 }}> — {e.org}</span>
                    </h3>
                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 12.5,
                        color: C.signal,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {e.date}
                    </span>
                  </div>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 8, listStyle: "none", margin: 0, padding: 0 }}>
                    {e.points.map((p, pi) => (
                      <li
                        key={pi}
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: 14.5,
                          lineHeight: 1.6,
                          color: C.haze,
                          paddingLeft: 18,
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 10,
                            width: 6,
                            height: 1.5,
                            borderRadius: 2,
                            background: C.signal,
                            opacity: 0.6,
                          }}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== PROJECTS ============================== */

function Projects() {
  return (
    <section id="projects" style={{ padding: "100px 24px 40px", scrollMarginTop: 90 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal>
          <Eyebrow>Projects</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionTitle>Selected work</SectionTitle>
        </Reveal>

        <div className="grid md:grid-cols-2" style={{ gap: 20, marginTop: 28 }}>
          {PROJECTS.map((p, i) => {
            const Icon = p.icon;
            const accent = PROJECT_ACCENTS[i % PROJECT_ACCENTS.length];
            return (
              <Reveal key={p.title} delay={i * 0.07}>
                <div
                  className="project-card"
                  style={{
                    border: `1px solid ${C.panelBorder}`,
                    borderRadius: 18,
                    background: C.panel,
                    height: "100%",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* Gradient accent bar at top */}
                  <div
                    style={{
                      height: 3,
                      background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                    }}
                  />

                  {/* Subtle radial glow in corner */}
                  <div
                    style={{
                      position: "absolute",
                      top: -40,
                      right: -40,
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${accent.from}12, transparent 70%)`,
                      pointerEvents: "none",
                    }}
                  />

                  <div style={{ padding: "22px 26px 26px", position: "relative" }}>
                    {/* Header row */}
                    <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
                      <div className="flex items-center" style={{ gap: 12 }}>
                        {/* Project number */}
                        <span
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 11,
                            color: accent.from,
                            opacity: 0.5,
                            fontWeight: 600,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {/* Icon */}
                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: 11,
                            background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}08)`,
                            border: `1px solid ${accent.from}30`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: accent.to,
                          }}
                        >
                          <Icon size={19} />
                        </div>
                      </div>
                      <div className="flex items-center" style={{ gap: 8 }}>
                        {p.featured && (
                          <span
                            className="featured-badge"
                            style={{
                              fontFamily: FONT_MONO,
                              fontSize: 10,
                              letterSpacing: "0.1em",
                              color: "#020304",
                              background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                              borderRadius: 999,
                              padding: "4px 10px",
                              fontWeight: 600,
                              textTransform: "uppercase",
                            }}
                          >
                            ★ Featured
                          </span>
                        )}
                        <span
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 11,
                            letterSpacing: "0.12em",
                            color: C.hazeDim,
                            border: `1px solid ${C.panelBorder}`,
                            borderRadius: 999,
                            padding: "5px 11px",
                          }}
                        >
                          {p.tag}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontSize: 19,
                        fontWeight: 600,
                        color: C.star,
                        marginBottom: 4,
                      }}
                    >
                      {p.title}
                    </h3>
                    <div
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 12,
                        color: accent.to,
                        marginBottom: 12,
                      }}
                    >
                      {p.subtitle}
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 14.5,
                        lineHeight: 1.6,
                        color: C.haze,
                        marginBottom: 16,
                      }}
                    >
                      {p.desc}
                    </p>

                    {/* Tech tags */}
                    {p.tags && (
                      <div className="flex flex-wrap" style={{ gap: 6 }}>
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontFamily: FONT_MONO,
                              fontSize: 11,
                              color: accent.to,
                              background: `${accent.from}12`,
                              border: `1px solid ${accent.from}25`,
                              borderRadius: 999,
                              padding: "4px 10px",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================== SKILLS ============================== */

function Skills() {
  const radarData = SKILLS.map((g) => ({ category: g.short, value: g.items.length }));

  return (
    <section id="skills" style={{ padding: "100px 24px 40px", scrollMarginTop: 90 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal>
          <Eyebrow>Skills</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionTitle>Toolkit</SectionTitle>
        </Reveal>

        <div className="grid lg:grid-cols-5" style={{ gap: 16, marginTop: 28 }}>
          <Reveal delay={0.05} style={{ gridColumn: "span 2 / span 2" }}>
            <div
              className="hidden lg:block"
              style={{
                border: `1px solid ${C.panelBorder}`,
                borderRadius: 16,
                padding: "22px 14px 10px",
                background: "rgba(255,255,255,0.015)",
                /* height removed to avoid empty space */
              }}
            >
              <h3
                style={{
                  fontFamily: FONT_BODY,
                  fontWeight: 600,
                  fontSize: 14.5,
                  color: C.star,
                  marginBottom: 4,
                  paddingLeft: 8,
                }}
              >
                Toolkit breadth
              </h3>
              <p
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 11.5,
                  color: C.hazeDim,
                  marginBottom: 4,
                  paddingLeft: 8,
                }}
              >
                Tools & techniques listed per category
              </p>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData} outerRadius="70%">
                  <PolarGrid stroke={C.panelBorder} />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: C.haze, fontSize: 11, fontFamily: FONT_BODY }}
                  />
                  <Radar
                    dataKey="value"
                    stroke={C.signal}
                    fill={C.signal}
                    fillOpacity={0.22}
                    strokeWidth={1.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Reveal>

          <div
            className="grid sm:grid-cols-2 lg:col-span-3"
            style={{ gap: 16, gridColumn: "span 3 / span 3" }}
          >
            {SKILLS.map((group, i) => (
              <Reveal key={group.title} delay={i * 0.05}>
                <div
                  style={{
                    border: `1px solid ${C.panelBorder}`,
                    borderRadius: 16,
                    padding: 22,
                    background: "rgba(255,255,255,0.015)",
                    height: "100%",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: FONT_BODY,
                      fontWeight: 600,
                      fontSize: 14.5,
                      color: C.star,
                      marginBottom: 14,
                    }}
                  >
                    {group.title}
                  </h3>
                  <div className="flex flex-wrap" style={{ gap: 8 }}>
                    {group.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== EDUCATION / CERTS / ACTIVITIES ============================== */

function Education() {
  return (
    <section id="education" style={{ padding: "100px 24px 40px", scrollMarginTop: 90 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal>
          <Eyebrow>Education</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionTitle>Background</SectionTitle>
        </Reveal>

        <div className="grid lg:grid-cols-3" style={{ gap: 16, marginTop: 28 }}>
          <Reveal delay={0.08}>
            <div className="info-card" style={{ gridColumn: "span 1" }}>
              <div className="info-card-icon">
                <GraduationCap size={19} />
              </div>
              <h3 className="info-card-title">Bachelor of Computer Science</h3>
              <p className="info-card-sub">Faculty of Computer Science, ElShorouk Academy — Cairo, Egypt</p>
              <div className="info-card-meta">
                <span>Oct 2022 — Jun 2026</span>
                <span>GPA 3.4 / 4.0</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="info-card">
              <div className="info-card-icon">
                <Award size={19} />
              </div>
              <h3 className="info-card-title">Certifications</h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
                {CERTS.map((c) => (
                  <li
                    key={c}
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 14,
                      color: C.haze,
                      lineHeight: 1.5,
                    }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="info-card">
              <div className="info-card-icon">
                <Globe size={19} />
              </div>
              <h3 className="info-card-title">ICPC — International Collegiate Programming Contest</h3>
              <p className="info-card-sub">July 2024</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.haze, lineHeight: 1.55, marginTop: 6 }}>
                Competed in programming challenges, collaborating with a team to solve complex problems under time constraints using C++.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================== CONTACT ============================== */

function Contact() {
  const methods = [
    { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MessageCircle, label: "WhatsApp", value: CONTACT.whatsapp, href: CONTACT.whatsappLink },
    { icon: Linkedin, label: "LinkedIn", value: "in/mazenemad615", href: CONTACT.linkedin },
    { icon: Github, label: "GitHub", value: "MAZE-N01", href: CONTACT.github },
  ];
  return (
    <section id="contact" style={{ padding: "100px 24px 60px", scrollMarginTop: 90 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionTitle style={{ maxWidth: 560 }}>
            Let's build something worth shipping.
          </SectionTitle>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 15.5,
              color: C.haze,
              maxWidth: 520,
              marginBottom: 36,
              lineHeight: 1.6,
            }}
          >
            Open to AI engineering roles, freelance projects, and
            collaborations in NLP, computer vision, and applied machine
            learning. Based in Cairo, working across time zones.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 14 }}>
          {methods.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.label} delay={0.12 + i * 0.05}>
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    border: `1px solid ${C.panelBorder}`,
                    borderRadius: 16,
                    padding: 20,
                    textDecoration: "none",
                    height: "100%",
                  }}
                >
                  <Icon size={19} color={C.signal} />
                  <div>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.hazeDim, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {m.label}
                    </div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.star, wordBreak: "break-word" }}>
                      {m.value}
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================== FOOTER ============================== */

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.panelBorder}`, padding: "26px 24px" }}>
      <div
        className="flex flex-col md:flex-row items-center justify-between"
        style={{ maxWidth: 1180, margin: "0 auto", gap: 12 }}
      >
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: C.hazeDim }}>
          © {new Date().getFullYear()} Mazen Emad Fawzy
        </div>
        <div className="flex items-center" style={{ gap: 10 }}>
          <IconButton href={CONTACT.github} label="GitHub">
            <Github size={16} />
          </IconButton>
          <IconButton href={CONTACT.linkedin} label="LinkedIn">
            <Linkedin size={16} />
          </IconButton>
          <IconButton href={`mailto:${CONTACT.email}`} label="Email">
            <Mail size={16} />
          </IconButton>
        </div>
      </div>
    </footer>
  );
}

/* ============================== ROOT ============================== */

function PortfolioSite() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        background: C.void,
        color: C.star,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        ::selection { background: rgba(94,234,255,0.28); color: #fff; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: ${C.void}; }
        ::-webkit-scrollbar-thumb { background: #1a2438; border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: #24314c; }
        a:focus-visible, button:focus-visible { outline: 2px solid ${C.signal}; outline-offset: 2px; }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @keyframes bounceDown {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }

        .nav-link { position: relative; transition: color 0.2s ease; }
        .nav-link:hover { color: ${C.star}; }
        .nav-link::after {
          content: ""; position: absolute; left: 0; bottom: -4px; width: 0; height: 1px;
          background: ${C.signal}; transition: width 0.25s ease;
        }
        .nav-link:hover::after { width: 100%; }

        .icon-btn { transition: border-color 0.25s ease, color 0.25s ease, transform 0.25s ease; }
        .icon-btn:hover { border-color: ${C.panelBorderHover} !important; color: ${C.signal} !important; transform: translateY(-2px); }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: ${FONT_BODY}; font-size: 14.5px; font-weight: 500;
          color: ${C.void}; background: ${C.signal};
          padding: 13px 22px; border-radius: 11px; text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px -8px rgba(94,234,255,0.55); }

        .btn-ghost {
          display: inline-flex; align-items: center;
          font-family: ${FONT_BODY}; font-size: 14.5px; font-weight: 500;
          color: ${C.star}; background: transparent; border: 1px solid ${C.panelBorder};
          padding: 13px 22px; border-radius: 11px; text-decoration: none;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .btn-ghost:hover { border-color: ${C.panelBorderHover}; transform: translateY(-2px); }

        .project-card { transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .project-card:hover {
          transform: translateY(-6px);
          border-color: ${C.panelBorderHover} !important;
          box-shadow: 0 20px 50px -20px rgba(59,124,255,0.5);
        }
        .featured-badge { animation: pulseDot 2.4s ease-in-out infinite; }

        .exp-card:hover h3 { color: ${C.signal}; }
        .exp-card h3 { transition: color 0.2s ease; }

        .skill-chip:hover { border-color: ${C.panelBorderHover} !important; color: ${C.star} !important; }

        .info-card {
          border: 1px solid ${C.panelBorder}; border-radius: 16px; padding: 24px;
          background: rgba(255,255,255,0.015); height: 100%;
          transition: border-color 0.25s ease;
        }
        .info-card:hover { border-color: ${C.panelBorderHover}; }
        .info-card-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(94,234,255,0.08); border: 1px solid ${C.panelBorder};
          display: flex; align-items: center; justify-content: center;
          color: ${C.signal}; margin-bottom: 16px;
        }
        .info-card-title { font-family: ${FONT_DISPLAY}; font-weight: 600; font-size: 16.5px; color: ${C.star}; margin-bottom: 6px; }
        .info-card-sub { font-family: ${FONT_BODY}; font-size: 13.5px; color: ${C.haze}; line-height: 1.5; }
        .info-card-meta { display: flex; justify-content: space-between; margin-top: 14px; font-family: ${FONT_MONO}; font-size: 12px; color: ${C.hazeDim}; }

        .contact-card { transition: transform 0.25s ease, border-color 0.25s ease; background: rgba(255,255,255,0.015); }
        .contact-card:hover { transform: translateY(-3px); border-color: ${C.panelBorderHover} !important; }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
      `}</style>

      <Starfield />
      <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Footer />
      </div>
    </div>
  );
}

export default PortfolioSite;
