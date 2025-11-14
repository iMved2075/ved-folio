"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Section from "./components/Section";
import { FaStar, FaCodeBranch, FaTimes } from 'react-icons/fa';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiGithub,
  SiGit,
  SiStripe,
  SiVite
} from 'react-icons/si'

// Lazy load components with loading fallback
const About = dynamic(() => import("./components/About"), {
  loading: () => <div className="animate-pulse h-32 bg-slate-800 rounded-lg"></div>,
});

const StatsDisplay = dynamic(() => import("./components/StatsDisplay"), {
  loading: () => <div className="animate-pulse h-32 bg-slate-800 rounded-lg"></div>,
});

const Projects = dynamic(() => import("./components/Projects"), {
  loading: () => <div className="animate-pulse h-48 bg-slate-800 rounded-lg"></div>,
});

const Certifications = dynamic(() => import("./components/Certifications"), {
  loading: () => <div className="animate-pulse h-64 bg-slate-800 rounded-lg"></div>,
});

const Skills = dynamic(() => import("./components/Skills"), {
  loading: () => <div className="animate-pulse h-40 bg-slate-800 rounded-lg"></div>,
});

const Contact = dynamic(() => import("./components/Contact"), {
  loading: () => <div className="animate-pulse h-32 bg-slate-800 rounded-lg"></div>,
});

const OpenAIBot = dynamic(() => import("./components/OpenAIBot"));

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [showProjects, setShowProjects] = useState(false)
  const [allProjects, setAllProjects] = useState([]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showProjects) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showProjects]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showProjects) {
        setShowProjects(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showProjects]);

  const fetchAllProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/github-projects');
      const data = await response.json();
      setAllProjects(data.repositories || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showProjects && allProjects.length === 0) {
      fetchAllProjects();
    }
  }, [showProjects]);

  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      setShowProjects(false);
    }
  };

  return (
    <div className="bg-background text-foreground px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 py-6 md:py-10 min-h-screen">
      {/* Modal */}
      {showProjects && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-6"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="bg-gradient-to-r from-black to-slate-900 border border-slate-800 rounded-2xl w-full max-w-[min(1100px,calc(100vw-1.5rem))] max-h-[calc(100vh-2rem)] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-black sticky top-0 z-10">
              <h2 id="modal-title" className="text-lg sm:text-xl lg:text-2xl font-bold">All GitHub Projects</h2>
              <button
                onClick={() => setShowProjects(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Close modal"
              >
                <FaTimes size={20} className="sm:hidden" />
                <FaTimes size={24} className="hidden sm:block" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="no-scrollbar flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-5 space-y-3 sm:space-y-4">
              {loading ? (
                <div className="space-y-3 sm:space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border border-slate-800 rounded-lg p-3 sm:p-4 animate-pulse">
                      <div className="h-5 sm:h-6 w-32 sm:w-48 bg-slate-700 rounded mb-2 sm:mb-3"></div>
                      <div className="h-3 sm:h-4 w-full bg-slate-700 rounded mb-2"></div>
                      <div className="h-3 sm:h-4 w-3/4 bg-slate-700 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {allProjects.length > 0 ? (
                    allProjects.map((project) => (
                      <div
                        key={project.id}
                        className="border border-slate-800 rounded-lg p-3 sm:p-4 hover:border-slate-700 transition-colors bg-gradient-to-r from-slate-900 to-black"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-2 sm:mb-3 gap-2">
                          <h3 className="text-base sm:text-lg font-bold">
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-blue-400 transition-colors"
                            >
                              {project.name}
                            </a>
                          </h3>
                          <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400">
                            {project.stars > 0 && (
                              <span className="flex items-center gap-1">
                                <FaStar size={12} className="text-yellow-500 sm:hidden" />
                                <FaStar size={14} className="text-yellow-500 hidden sm:block" />
                                {project.stars}
                              </span>
                            )}
                            {project.forks > 0 && (
                              <span className="flex items-center gap-1">
                                <FaCodeBranch size={12} className="sm:hidden" />
                                <FaCodeBranch size={14} className="hidden sm:block" />
                                {project.forks}
                              </span>
                            )}
                          </div>
                        </div>

                        {project.description && (
                          <p className="text-xs sm:text-sm text-slate-300 mb-2 sm:mb-3">{project.description}</p>
                        )}

                        {/* Technologies/Languages */}
                        {project.languages && project.languages.length > 0 && (
                          <div className="mb-2 sm:mb-3">
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {project.languages.slice(0, 5).map((lang, i) => (
                                <span key={i} className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-700 rounded-full">
                                  {lang.name} {lang.percentage}%
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Topics */}
                        {project.topics && project.topics.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                            {project.topics.map((topic, i) => (
                              <span key={i} className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-900/30 text-blue-400 rounded-full">
                                #{topic}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] sm:text-xs text-slate-400">
                          <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                          <div className="flex gap-2 sm:gap-3">
                            {project.homepage && (
                              <a
                                href={project.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                              >
                                Live Demo →
                              </a>
                            )}
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:underline"
                            >
                              GitHub →
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-slate-400 text-sm">No projects found.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Navbar />
      <main className="flex flex-col gap-6 md:gap-8 items-center sm:items-start min-h-screen">
        <Section id="home" title="Welcome">
          <Hero />
        </Section>
        <div className="flex flex-col lg:flex-row gap-5 w-full">
          <Section id="about" title="About Me">
            <About />
          </Section>
          <Section id="stats" title="GitHub Snapshot">
            <StatsDisplay />
          </Section>
        </div>
        <Section id="projects" title="Projects">
          <Projects showProjects={showProjects} setShowProjects={setShowProjects} />
        </Section>
        <Section id="certifications" title="Certifications">
          <Certifications />
        </Section>
        <Section id="skills" title="Skills">
          <Skills />
        </Section>
        <Section id="contact" title="Contact">
          <Contact />
        </Section>
      </main>
      <Footer />
      <OpenAIBot />
    </div>
  );
}
