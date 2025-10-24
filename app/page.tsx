"use client";
import { Copy } from "lucide-react";

import { useState, useEffect } from "react";
import {
  MapPin,
  Briefcase,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Code,
  ChevronDown,
} from "lucide-react";
import GitHubContributionsPage from "@/components/canvas";

// ----------- Portfolio Component -----------
export default function MinimalPortfolio() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  // ----------- Projects and Skills -----------
  type Project = {
    name: string;
    description: string;
    language: string;
    topics: string[];
    link: string;
    image?: string;
  };

  const projects: Project[] = [
    {
      name: "StreamForge",
      description:
        "Fault-tolerant event-streaming system using Kafka for scalable message flow and PostgreSQL for persistence.",
      language: "Golang",
      topics: ["Kafka", "PostgreSQL"],
      link: "https://github.com/Prabhdeep52/StreamForge",
      image: "./assets/streamforge.png",
    },
    {
      name: "FinSight",
      description:
        "Financial research agent built using LangGraph that autonomously plans, executes, and streams server-sent events.",
      language: "Python",
      topics: ["Langchain", "FastAPI", "PostgreSQL", "Gemini"],
      link: "https://github.com/Prabhdeep52/FinSight",
      image: "./assets/finsight.png",
    },
    {
      name: "ContextFlow",
      description:
        "Advanced Retrieval-Augmented Generation (RAG) platform using Gemini and LangChain for hierarchical document processing.",
      language: "Python",
      topics: ["Langchain", "RAG", "Hierarchical Retrieval"],
      link: "https://github.com/Prabhdeep52/ContextFlow",
      image: "./assets/rag.png",
    },
    {
      name: "Scribble",
      description:
        "Real-time multiplayer drawing and guessing game powered by Socket.IO with competitive scoring and optimized MongoDB schemas.",
      language: "Dart",
      topics: ["Flutter", "WebSockets", "Dart", "Express"],
      link: "https://github.com/Prabhdeep52/multiplayer_scribble_game",
      image: "./assets/scribble2.png",
    },
    {
      name: "goBank",
      description:
        "Banking API built using Golang for secure money transfers, withdrawals, and deposits with JWT-based authentication.",
      language: "Golang",
      topics: ["Golang", "API", "JWT", "PostgreSQL"],
      link: "https://github.com/Prabhdeep52/goBank",
      image: "/assets/gobank.png",
    },
    {
      name: "ResQ-Connect",
      description:
        "Realtime disaster response communication app that connects rescue agencies and volunteers for efficient coordination.",
      language: "Dart",
      topics: ["Flutter", "Sockets", "Google Maps API"],
      link: "https://github.com/Prabhdeep52/ResQ-Connect",
      image: "./assets/resq.png",
    },
    {
      name: "Aurora",
      description:
        "Navigation and virtual assistant for visually impaired users that provides voice-based environmental awareness.",
      language: "Dart",
      topics: ["Flutter", "TTS", "Tensorflow"],
      link: "https://github.com/Prabhdeep52/Aurora",
      image: "./assets/aurora.png",
    },
  ];

  const skills = {
    languages: ["Python", "Golang", "Dart", "JavaScript", "TypeScript"],
    frameworks: ["Flutter", "Express", "Gorilla", "React", "Next.js"],
    tools: [
      "PostgreSQL",
      "Redis",
      "Docker",
      "Git",
      "Socket.IO",
      "AWS",
      "Firebase",
    ],
  };

  const handleToggle = (projectName: string) => {
    setExpandedProject((current) =>
      current === projectName ? null : projectName,
    );
  };
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 4);
  const hasMoreProjects = projects.length > 4;

  // ----------- UI -----------
  return (
    <div
      id="top"
      className="min-h-screen font-serif bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900 text-zinc-300"
    >
      <div className="fixed inset-0 pointer-events-none group">
        {/* Mouse-following glow */}
        <div
          className="absolute w-[28rem] h-[28rem] rounded-full blur-[100px] transition-all duration-700 ease-out group-hover:opacity-20"
          style={{
            left: `${mousePosition.x - 224}px`,
            top: `${mousePosition.y - 224}px`,
            background:
              "radial-gradient(circle at center, rgba(155, 175, 217, 0.25), rgba(16, 55, 131, 0.15))",
            opacity: 0.4, // base opacity
          }}
        />

        {/* Top-right ambient glow */}
        <div
          className="absolute top-[-10%] right-[-10%] w-[30rem] h-[30rem] rounded-full blur-[120px] opacity-40 animate-slowPulse transition-opacity duration-700 ease-out group-hover:opacity-20"
          style={{
            background:
              "radial-gradient(circle at center, rgba(155, 175, 217, 0.22), rgba(16, 55, 131, 0.10))",
          }}
        />

        {/* Bottom-left ambient glow */}
        <div
          className="absolute bottom-[-10%] left-[10%] w-[30rem] h-[30rem] rounded-full blur-[120px] opacity-40 animate-slowPulse transition-opacity duration-700 ease-out group-hover:opacity-20"
          style={{
            background:
              "radial-gradient(circle at center, rgba(155, 175, 217, 0.20), rgba(16, 55, 131, 0.10))",
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-zinc-800/50 bg-zinc-950/90 backdrop-blur-md transition-all duration-300">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-xs md:text-sm">
          <a href="#top" className="font-semibold tracking-widest text-white">
            ps
          </a>
          <div className="flex items-center gap-6 text-zinc-400 italic">
            <a href="#about" className="hover:text-white ">
              about
            </a>
            <a href="#skills" className="hover:text-white">
              skills
            </a>
            <a href="#projects" className="hover:text-white">
              projects
            </a>
            <a href="#contact" className="hover:text-white">
              contact
            </a>
          </div>
          <a
            href="https://drive.google.com/file/d/1UYSFEiYGKDHgMjjTy3hccWqnf97xzRkT/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md  border border-zinc-700/50 px-3 py-1 font-medium uppercase tracking-wide text-zinc-200 hover:border-zinc-500 hover:text-white hover:bg-zinc-900/50"
          >
            resume
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-16 md:py-20">
        {/* About */}
        <section id="about" className="mb-15 space-y-3">
          <div className="flex items-center gap-3 text-zinc-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm italic">India</span>
          </div>

          <div className="flex items-center gap-3 mb-5  text-zinc-400">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm italic">Software Developer</span>
          </div>

          <div className="">
            <h1 className="text-4xl mb-4  md:text-6xl text-white font-light leading-tight">
              Prabhdeep Singh
            </h1>
            <p className="text-md text-zinc-300 italic leading-relaxed max-w-2xl">
              Software Developer with a knack for building scalable backend
              systems and APIs. Currently doing BTech in Electronics and
              Computer Engineering from VIT Chennai. Available for hire.
            </p>
          </div>
        </section>

        {/* GitHub Contributions */}
        <a
          href="https://github.com/Prabhdeep52"
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-transform duration-300 hover:scale-[1.01] hover:opacity-90"
          title="View my GitHub profile"
        >
          <GitHubContributionsPage />
        </a>

        {/* Skills */}
        <section id="skills" className="mb-15 mt-15 space-y-8">
          <h2 className="text-2xl text-white italic font-light">skills</h2>
          <div className="space-y-1 text-zinc-400">
            <div>languages: {skills.languages.join(", ")}</div>
            <div>frameworks: {skills.frameworks.join(", ")}</div>
            <div>tools: {skills.tools.join(", ")}</div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="">
          <h2 className="text-2xl text-white italic font-light mb-10">
            project work
          </h2>
          {displayedProjects.map((p, index) => {
            const hasImage = Boolean(p.image);
            const isExpanded = expandedProject === p.name;

            return (
              <div key={p.name}>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block transition-all duration-300"
                >
                  <div className="flex gap-6 p-1 rounded-lg hover:bg-zinc-900/30">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between gap-1">
                        <div className="space-y-2 flex-1">
                          <h3 className="text-xl text-white">{p.name}</h3>
                          <div className="text-sm text-zinc-500">
                            {p.language}
                            {p.topics.length
                              ? " • " + p.topics.join(" · ")
                              : ""}
                          </div>
                        </div>
                        {hasImage && (
                          <button
                            type="button"
                            onClick={(event) => {
                              event.preventDefault();
                              handleToggle(p.name);
                            }}
                            className="flex items-center gap-1 text-xs uppercase tracking-wide text-zinc-500 hover:text-zinc-300 m-2"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                            />
                            {isExpanded ? "hide" : "show"}
                          </button>
                        )}

                        <ArrowUpRight className="w-4 h-4 text-zinc-600 opacity-0 group-hover:opacity-100" />
                      </div>
                      <p className="text-zinc-400 text-sm md:text-base">
                        {p.description}
                      </p>
                      {hasImage && isExpanded && (
                        <div className="mt-4 overflow-hidden rounded-lg">
                          <img
                            src={p.image || "/placeholder.svg"}
                            alt={`${p.name} preview`}
                            className="w-full max-w-sm rounded border border-zinc-800/50"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </a>
                {index < displayedProjects.length - 1 && (
                  <div className="border-b border-zinc-800/30 my-8" />
                )}
              </div>
            );
          })}

          {hasMoreProjects && (
            <div className="flex justify-center pt-8">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="px-5 py-2 rounded-lg border border-zinc-700/50 text-zinc-300 font-medium uppercase tracking-wide hover:border-zinc-500 hover:text-white hover:bg-zinc-900/50"
              >
                {showAllProjects ? "show less" : "view more projects"}
              </button>
            </div>
          )}
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="mt-24 space-y-6 border-t border-zinc-800/50 pt-12"
        >
          <p className="text-sm text-zinc-500 flex items-center gap-2">
            <Mail className="w-4 h-4" />

            <a
              href="mailto:deepprabh832@gmail.com"
              className="hover:text-zinc-300 transition-colors"
            >
              reach out → deepprabh832@gmail.com
            </a>

            <button
              onClick={() => {
                navigator.clipboard.writeText("deepprabh832@gmail.com");
              }}
              className="ml-2 text-zinc-500 hover:text-zinc-300 transition-colors"
              title="Copy email"
            >
              <Copy className="w-4 h-4" />
            </button>
          </p>

          <div className="flex items-center gap-6 text-zinc-500">
            <a
              href="https://github.com/Prabhdeep52"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-zinc-300"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/Prabhdeep52"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-zinc-300"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a
              href="https://leetcode.com/Prabhdeep52/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-zinc-300"
            >
              <Code className="w-4 h-4" /> LeetCode
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
