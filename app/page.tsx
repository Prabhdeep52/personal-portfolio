"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Github,
  Mail,
  Linkedin,
  Folder,
  Star,
  GitFork,
  Terminal,
  Minimize2,
  Square,
  X,
  ChevronRight,
  Code,
  User,
  FolderOpen,
  Settings,
  Phone,
  HelpCircle,
  Zap,
} from "lucide-react"

export default function TerminalPortfolio() {
  const [currentSection, setCurrentSection] = useState("")
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const [commandExecuted, setCommandExecuted] = useState(false)
  const [roleText, setRoleText] = useState("")
  const [roleTypingComplete, setRoleTypingComplete] = useState(false)

  const fullRoleText = "Full Stack and App Developer"

  const commands = [
    { cmd: "resume", section: "about", desc: "My resume", icon: User },
    { cmd: "who_am_i", section: "about", desc: "My information ", icon: User },
    { cmd: "ls projects/", section: "projects", desc: "Project repositories", icon: FolderOpen },
    { cmd: "ls skills/", section: "skills", desc: "Show technical skills", icon: Settings },
    { cmd: "curl contact.json", section: "contact", desc: "Fetch contact information", icon: Phone },
    { cmd: "clear", section: "clear", desc: "Clear terminal screen", icon: Terminal },
    { cmd: "help", section: "help", desc: "Show available commands", icon: HelpCircle },
  ]

  // Quick command buttons for easy access



  const quickCommands = [
    {
      cmd: "who_am_i",
      section: "about",
      label: "About",
      icon: User,
      color: "text-blue-400 border-blue-400/50 hover:bg-blue-400/10",
    },
    {
      cmd: "ls projects/",
      section: "projects",
      label: "Projects",
      icon: FolderOpen,
      color: "text-green-400 border-green-400/50 hover:bg-green-400/10",
    },
    {
      cmd: "ls skills/",
      section: "skills",
      label: "Skills",
      icon: Settings,
      color: "text-purple-400 border-purple-400/50 hover:bg-purple-400/10",
    },
    {
      cmd: "curl contact.json",
      section: "contact",
      label: "Contact",
      icon: Phone,
      color: "text-cyan-400 border-cyan-400/50 hover:bg-cyan-400/10",
    },
  ]

  const projects = [
       {
      name:"StreamForge",
      description:"A distributed Event Streaming pipeline build using Go , Kafka , PostgreSQL ",
      language:"Golang",
      stars:0,
      forks:0,
      topics:["Golang" , "Kafka" , "PostgreSQL"],
      link:"https://github.com/Prabhdeep52/StreamForge", 
      image:"../assets/streamforge.png"
    },
    {
      name:"ContextFlow", 
      description:" Advanced RAG system with hierarchical document processing with precise source attribution. ",
      language:"Python",
      stars:0,
      forks:0,
      topics:["Python","Langchain" , "RAG","Hierarchical Retrieval"],
      link:"https://github.com/Prabhdeep52/ContextFlow",
      image:"../assets/rag.png"
    },
    {
      name: "multiplayer_scribble_game",
      description:
        "Multiplayer game built using sockets where one user draws a word and others guess it. Correct guesses earn points.",
      language: "Dart",
      stars: 1,
      forks: 0,
      topics: ["flutter", "websockets", "realtime", "multiplayer"],
      link: "https://github.com/Prabhdeep52/multiplayer_scribble_game",
      image: "../assets/scribble.png",
    },
    {
      name: "ResQ-Connect",
      description:
        "Realtime disaster response communication app that connects rescue agencies and volunteers for efficient coordination.",
      language: "Dart",
      stars: 0,
      forks: 0,
      topics: ["flutter", "sockets", "disaster-relief", "realtime"],
      link: "https://github.com/Prabhdeep52/ResQ-Connect",
      image: "../assets/resq.png",
      imageAlt: "ResQ-Connect",
    },
    {
      name: "Aurora",
      description:
        "Navigation and virtual assistant for visually impaired users. It uses voice to describe surroundings.",
      language: "Dart",
      stars: 0,
      forks: 0,
      topics: ["flutter", "accessibility", "voice", "navigation"],
      link: "https://github.com/Prabhdeep52/Aurora",
      image: "none",
    },
    {
      name: "goBank",
      description:
        "Banking API built using Golang for secure money transfers, withdrawals, and deposits with token-based authentication.",
      language: "Go",
      stars: 0,
      forks: 0,
      topics: ["golang", "api", "jwt", "banking", "postgresql"],
      link: "https://github.com/Prabhdeep52/goBank",
      image: "none",
    },
 
  ]

  const skills = {
    languages: ["Golang" ,"C/C++", "Dart","JavaScript", "Python", "Java", "TypeScript"],
    frameworks: ["Flutter", "Express", "Gorilla Mux", "React", "Next.js"],
    tools: ["PostgreSQL", "Redis", "Docker", "Git", "Socket.IO", "WebSockets", "AWS", "Firebase"],
    concepts: ["Data Structures and Algorithm", "JWT Authentication"],
  }

  // Role typing animation effect
  useEffect(() => {
    let timeout: NodeJS.Timeout
    let currentIndex = 0

    const typeRole = () => {
      if (currentIndex < fullRoleText.length) {
        setRoleText(fullRoleText.slice(0, currentIndex + 1))
        currentIndex++
        timeout = setTimeout(typeRole, 80) // Adjust speed here (100ms per character)
      } else {
        setRoleTypingComplete(true)
      }
    }

    // Start typing after a small delay
    timeout = setTimeout(typeRole, 1000)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const executeCommand = (section: string) => {
    if (section === "clear") {
      setCurrentSection("")
      setCommandExecuted(false)
      setTypedText("")
      setInputValue("")
      setShowSuggestions(false)
      return
    }

    setCurrentSection(section)
    setCommandExecuted(true)
    setTypedText("")
    setInputValue("")
    setShowSuggestions(false)
  }

  const handleInputFocus = () => {
    setShowSuggestions(true)
  }

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 200)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setShowSuggestions(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return

    const filteredCommands = commands.filter((cmd) => cmd.cmd.toLowerCase().includes(inputValue.toLowerCase()))

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedSuggestion((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedSuggestion((prev) => (prev > 0 ? prev - 1 : filteredCommands.length - 1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (filteredCommands[selectedSuggestion]) {
        executeCommand(filteredCommands[selectedSuggestion].section)
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  const filteredCommands = commands.filter((cmd) => cmd.cmd.toLowerCase().includes(inputValue.toLowerCase()))

  const renderSection = () => {
    switch (currentSection) {
      case "about":
        return (
          <div className="space-y-4">
            <div className="text-green-400">
            </div>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="break-words">
                <span className="text-cyan-400">Name:</span> <span className="text-white">Prabhdeep Singh</span>
              </div>
              <div className="break-words">
                <span className="text-cyan-400">Role:</span>{" "}
                <span className="text-white">Full Stack & App Developer</span>
              </div>
              <div className="break-words">
                <span className="text-cyan-400">Location:</span> <span className="text-white">India</span>
              </div>
              <div className="break-words">
                <span className="text-cyan-400">Education:</span>{" "}
                <span className="text-gray-300 ">
                   Btech in Electronics and Computer Engineering from VIT Chennai.
                </span>
              </div>
              <div className="break-words">
                <span className="text-cyan-400">Status:</span>{" "}
                <span className="text-green-400">Available for hire</span>
              </div>
              </div>
                      <Button
          variant="outline"
          size="sm"
          onClick={() =>
            window.open(
              "https://drive.google.com/file/d/13mgeYjNxKuZnUVhnnXyYeTjzBfci8kOS/view?usp=sharing/",
              "_blank"
            )
          }
          className="text-red-400 border-red-400/50 hover:bg-red-400/10 bg-transparent border transition-all duration-200 hover:scale-105 text-xs sm:text-sm font-mono group"
        >
          Click to download Resume
        </Button>
            </div>
       
        )

      case "projects":
        return (
          <div className="space-y-4">
            <div className="text-green-400 text-xs sm:text-sm">
              <span className="text-cyan-400">total</span> {projects.length} repositories
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="bg-gray-800/50 border-gray-700 hover:border-green-400/50 transition-colors"
                >
                  <CardContent className="p-3 sm:p-4">
                    {project.image !== "none" && (
                      <div className="mb-4">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.name} preview`}
                          className="w-full h-32 sm:h-40 object-cover rounded-lg border border-gray-600"
                        />
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-2 gap-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Folder className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 font-mono text-xs sm:text-sm hover:underline cursor-pointer truncate"
                        >
                          {project.name}
                        </a>
                      </div>
                      <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 hover:text-white"
                          onClick={() => window.open(project.link, "_blank")}
                        >
                          <Github className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm mb-3 leading-relaxed">{project.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-3 sm:gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              project.language === "Python"
                                ? "bg-blue-500"
                                : project.language === "TypeScript"
                                  ? "bg-blue-600"
                                  : project.language === "JavaScript"
                                    ? "bg-yellow-500"
                                    : "bg-cyan-500"
                            }`}
                          />
                          <span className="text-xs">{project.language}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          {project.stars}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          {project.forks}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.topics.map((topic, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-xs bg-blue-900/30 text-blue-300 border-blue-700/50 px-1.5 py-0.5"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "skills":
        return (
          <div className="space-y-6">
            <div className="text-green-400 text-xs sm:text-sm mb-4">
              <span className="text-cyan-400">├─</span> Technical Skills Overview
            </div>

            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <div key={category} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="text-cyan-400 font-mono text-sm sm:text-base font-bold">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
                  <Badge variant="outline" className="text-xs text-cyan-400 border-cyan-400/50">
                    {items.length} items
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 ml-4">
                  {items.map((skill, index) => (
                    <Card
                      key={index}
                      className="bg-gray-800/40 border-gray-700/50 hover:border-green-400/50 hover:bg-gray-800/60 transition-all duration-200 group"
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 group-hover:bg-cyan-400 transition-colors"></div>
                          <span className="text-gray-300 group-hover:text-white text-xs sm:text-sm font-mono transition-colors">
                            {skill}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {categoryIndex < Object.entries(skills).length - 1 && (
                  <div className="flex items-center gap-2 mt-4">
                    <div className="text-gray-600 text-xs">└─</div>
                    <div className="flex-1 h-px bg-gray-700/50"></div>
                  </div>
                )}
              </div>
            ))}

            <div className="mt-6 p-4 bg-gray-800/30 border border-gray-700/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 text-sm font-mono">Quick Stats</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-green-400 text-lg font-bold">{Object.values(skills).flat().length}</div>
                  <div className="text-gray-400 text-xs">Total Skills</div>
                </div>
                <div className="space-y-1">
                  <div className="text-blue-400 text-lg font-bold">{skills.languages.length}</div>
                  <div className="text-gray-400 text-xs">Languages</div>
                </div>
                <div className="space-y-1">
                  <div className="text-purple-400 text-lg font-bold">{skills.frameworks.length}</div>
                  <div className="text-gray-400 text-xs">Frameworks</div>
                </div>
                <div className="space-y-1">
                  <div className="text-yellow-400 text-lg font-bold">{skills.tools.length}</div>
                  <div className="text-gray-400 text-xs">Tools</div>
                </div>
              </div>
            </div>
          </div>
        )

      case "contact":
        return (
          <div className="space-y-4">
            <div className="text-green-400 font-mono text-xs sm:text-sm overflow-x-auto">
              <pre>
                {`{
  "email": "deepprabh832@gmail.com",
  "github": "https://github.com/Prabhdeep52",
  "linkedin": "https://linkedin.com/in/Prabhdeep52",
  "Leetcode" : "https://leetcode.com/Prabhdeep52/",
}`}
              </pre>
            </div>
            <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-4 mt-6">
              <Button
                onClick={() => window.open("mailto:deepprabh832@gmail.com", "_blank")}
                variant="outline"
                size="sm"
                className="border-green-400/50 text-green-400 hover:bg-green-400/10 bg-transparent text-xs sm:text-sm"
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Email</span>
                <span className="sm:hidden">Mail</span>
              </Button>
              <Button
                onClick={() => window.open("https://github.com/Prabhdeep52", "_blank")}
                variant="outline"
                size="sm"
                className="border-blue-400/50 text-blue-400 hover:bg-blue-400/10 bg-transparent text-xs sm:text-sm"
              >
                <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">GitHub</span>
                <span className="sm:hidden">Git</span>
              </Button>
              <Button
                onClick={() => window.open("https://linkedin.com/in/Prabhdeep52", "_blank")}
                variant="outline"
                size="sm"
                className="border-blue-600/50 text-blue-600 hover:bg-blue-600/10 bg-transparent text-xs sm:text-sm"
              >
                <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">LinkedIn</span>
                <span className="sm:hidden">In</span>
              </Button>
              <Button
                onClick={() => window.open("https://leetcode.com/Prabhdeep52", "_blank")}
                variant="outline"
                size="sm"
                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 bg-transparent text-xs sm:text-sm"
              >
                <Code className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Leetcode</span>
                <span className="sm:hidden">Leetcode</span>
              </Button>
            </div>
          </div>
        )

      case "help":
        return (
          <div className="space-y-4">
            <div className="text-green-400 text-xs sm:text-sm mb-4">Available commands:</div>
            <div className="space-y-2">
              {commands.map((command, index) => (
                <div key={index} className="flex items-center gap-4 text-xs sm:text-sm">
                  <span className="text-cyan-400 font-mono min-w-0 flex-shrink-0">{command.cmd}</span>
                  <span className="text-gray-400">-</span>
                  <span className="text-gray-300">{command.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )
  

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      {/* Terminal Window Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Terminal className="w-4 h-4" />
            <span className="text-sm text-gray-300">prabhdeep@portfolio:~</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
            <Minimize2 className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
            <Square className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-4xl">
        {/* Welcome Message */}
        <div className="mb-8">
          <div className="text-green-400 text-xs sm:text-sm mb-4 overflow-x-auto">
            <pre className="hidden sm:block">
              {`
██████╗ ██████╗  █████╗ ██████╗ ██╗  ██╗██████╗ ███████╗███████╗██████╗ 
██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║  ██║██╔══██╗██╔════╝██╔════╝██╔══██╗
██████╔╝██████╔╝███████║██████╔╝███████║██║  ██║█████╗  █████╗  ██████╔╝
██╔═══╝ ██╔══██╗██╔══██║██╔══██╗██╔══██║██║  ██║██╔══╝  ██╔══╝  ██╔═══╝ 
██║     ██║  ██║██║  ██║██████╔╝██║  ██║██████╔╝███████╗███████╗██║     
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝╚═╝     
`}
            </pre>
            <pre
              className="sm:hidden text-center"
              style={{
                fontSize: "clamp(6px, 2.5vw, 10px)",
                lineHeight: 1.1,
              }}
            >
              {`
██████╗ ██████╗  █████╗ ██████╗ ██╗  ██╗██████╗ ███████╗███████╗██████╗ 
██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║  ██║██╔══██╗██╔════╝██╔════╝██╔══██╗
██████╔╝██████╔╝███████║██████╔╝███████║██║  ██║█████╗  █████╗  ██████╔╝
██╔═══╝ ██╔══██╗██╔══██║██╔══██╗██╔══██║██║  ██║██╔══╝  ██╔══╝  ██╔═══╝ 
██║     ██║  ██║██║  ██║██████╔╝██║  ██║██████╔╝███████╗███████╗██║     
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝╚═╝     
`}
            </pre>
          </div>
          <div className="mb-4">
            <div className="text-cyan-400 text-sm sm:text-lg font-bold tracking-wider flex items-center">
              {roleText}
              {!roleTypingComplete && <span className="text-cyan-400 animate-pulse ml-1">|</span>}
            </div>
          </div>
          <div className="text-gray-300 text-xs sm:text-sm">
            Myself Prabhdeep , a Passionate Full Stack and App Developer with a knack for building scalable backend systems and APIs. 
            Welcome to my portfolio and type any command or click on Quick Links below to know more about me. 
          </div>
        </div>

        {/* Terminal Input */}
        <div className="mb-6 sm:mb-8 relative">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-cyan-400 text-xs sm:text-sm">prabhdeep@portfolio:~$</span>
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command... (try 'help' or start typing)"
                  className="bg-transparent border-none text-green-400 font-mono text-xs sm:text-sm focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                />
                {showCursor && !inputValue && (
                  <span className="absolute left-0 top-0 text-green-400 animate-pulse pointer-events-none">|</span>
                )}
              </div>
            </div>

            {/* Command Suggestions */}
            {showSuggestions && filteredCommands.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredCommands.map((command, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors ${
                      index === selectedSuggestion
                        ? "bg-green-400/20 text-green-400"
                        : "text-gray-300 hover:bg-gray-700/50"
                    }`}
                    onClick={() => executeCommand(command.section)}
                  >
                    <ChevronRight className="w-3 h-3 text-cyan-400" />
                    <div className="flex-1">
                      <div className="font-mono text-xs sm:text-sm">{command.cmd}</div>
                      <div className="text-xs text-gray-400">{command.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Command Buttons */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-xs sm:text-sm font-mono">Quick Links</span>
            <div className="flex-1 h-px bg-gradient-to-r from-yellow-400/30 to-transparent"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {quickCommands.map((command, index) => {
              const IconComponent = command.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => executeCommand(command.section)}
                  className={`${command.color} bg-transparent border transition-all duration-200 hover:scale-105 text-xs sm:text-sm font-mono group`}
                >
                  <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 group-hover:animate-pulse" />
                  <span className="hidden sm:inline">{command.label}</span>
                  <span className="sm:hidden">{command.label}</span>
                </Button>
              )
            })}
          </div>

          <div className="flex items-center justify-center mt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("clear")}
              className="text-gray-400 hover:text-red-400 hover:bg-red-400/10 text-xs font-mono transition-colors"
            >
              <Terminal className="w-3 h-3 mr-1" />
              clear
            </Button>
            <span className="text-gray-600 mx-2">|</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("help")}
              className="text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 text-xs font-mono transition-colors"
            >
              <HelpCircle className="w-3 h-3 mr-1" />
              help
            </Button>
            <span className="text-gray-600 mx-2">|</span>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open("https://drive.google.com/file/d/13mgeYjNxKuZnUVhnnXyYeTjzBfci8kOS/view?usp=sharing/", "_blank")}
              className="text-gray-400 hover:text-red-400 hover:bg-red-400/10 text-xs font-mono transition-colors"
            >
              <Terminal className="w-3 h-3 mr-1" />
              Resume
            </Button>
          </div>
        </div>

        {/* Command Output - Only show when a command has been executed */}
        {commandExecuted && currentSection && (
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-3 sm:p-6">
            <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm overflow-x-auto">
              <span className="text-green-400 whitespace-nowrap">
                {commands.find((cmd) => cmd.section === currentSection)?.cmd || ""}
              </span>
              {showCursor && <span className="text-green-400 animate-pulse">|</span>}
            </div>

            <div className="border-l-2 border-green-400/30 pl-2 sm:pl-4">{renderSection()}</div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-center text-gray-500 text-xs">
          <div>Last login: {new Date().toLocaleString()}</div>
          <div className="mt-2">Built with Next.js • Styled with Tailwind CSS</div>
        </div>
      </div>
    </div>
  )
}
