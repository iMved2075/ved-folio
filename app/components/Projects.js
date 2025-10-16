"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [iframeLoading, setIframeLoading] = useState({});
  const [showIframe, setShowIframe] = useState({});

  const featuredProjects = [
    {
      title: "GetMeFund",
      logo: "https://get-me-fund.vercel.app/coin_bounce.gif",
      description: "GetMeFund is a modern, open-source web app that allows creators to receive financial support from their fans. Built with Next.js, Stripe, and NextAuth, it offers a secure and seamless way for users to send and manage donations. Each creator gets a personalized page to showcase their work and accept contributions directly. The app features OAuth authentication (Google, GitHub, Facebook), a clean dashboard for tracking payments, and full Stripe webhook integration for real-time updates. With its elegant UI powered by Tailwind CSS and robust backend using MongoDB, GetMeFund is a simple yet powerful platform for creator monetization.",
      live: "https://get-me-fund.vercel.app/",
      github: "https://github.com/iMved2075/GetMeFund",
      technologies: [
        { name: 'Next.js', Icon: SiNextdotjs },
        { name: 'Stripe', Icon: SiStripe },
        { name: 'JavaScript', Icon: SiJavascript },
        { name: 'Node.js', Icon: SiNodedotjs },
        { name: 'NextAuth', Icon: SiNextdotjs },
        { name: 'MongoDB', Icon: SiMongodb },
        { name: 'Tailwind CSS', Icon: SiTailwindcss },
        { name: 'GitHub', Icon: SiGithub },
        { name: 'Git', Icon: SiGit },
        { name: 'Postman', Icon: SiPostman },
      ]
    },
    {
      title: "ElitePM",
      description: "ElitePM is a web application built with React and Vite, offering a Password Manager platform. It's built with Vite + React and uses the local storage of webpage for secure password storage. The UI styling is managed with Tailwind CSS, and the project includes ESLint configuration.",
      live: "https://elite-pm.vercel.app/",
      github: "https://github.com/iMved2075/ElitePM",
      technologies: [
        { name: 'React', Icon: SiReact },
        { name: 'Vite', Icon: SiVite },
        { name: 'Tailwind CSS', Icon: SiTailwindcss },
        { name: 'JavaScript', Icon: SiJavascript },
        { name: 'Express', Icon: SiExpress },
        { name: 'GitHub', Icon: SiGithub },
        { name: 'Git', Icon: SiGit },
      ]
    }
  ];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showModal]);

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

  const handleShowAll = () => {
    setShowModal(true);
    if (allProjects.length === 0) {
      fetchAllProjects();
    }
  };

  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Featured Projects</h2>
        <button
          onClick={handleShowAll}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
        >
          Show All Projects
        </button>
      </div>

      {/* Featured Projects */}
      <ul className="space-y-6">
        {featuredProjects.map((project, index) => (
          <li key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <div className='flex justify-between'>
              <Link href={project.live} target="_blank" className="flex items-center gap-3">
                <Image
                  src={!project.logo ? '/vercel.svg' : project.logo}
                  alt={`${project.title} Logo`}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded object-contain"
                  unoptimized
                />
                <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              </Link>
              <Link href={project.github} target="_blank" className="text-sm text-blue-500 hover:underline">
                View Code
              </Link>
            </div>
            <hr className="border-slate-700 mb-2" />
            <p className="text-sm text-gray-300 mb-3">{project.description}</p>
            
            {/* Live Preview Toggle */}
            <div className="mb-3">
              <button
                onClick={() => setShowIframe(prev => ({ ...prev, [index]: !prev[index] }))}
                className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-400 font-medium transition-colors"
              >
                {showIframe[index] ? '▼' : '▶'} Live Preview
              </button>
            </div>

            {/* Collapsible Iframe */}
            {showIframe[index] && (
              <div className="relative mb-4 rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
                {/* Loading State */}
                {iframeLoading[index] !== false && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 z-10">
                    <div className="text-center">
                      <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                      <p className="text-sm text-slate-400">Loading preview...</p>
                    </div>
                  </div>
                )}

                {/* Controls Bar */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-slate-400 ml-3 truncate max-w-[200px]">{project.live}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={project.live}
                      target="_blank"
                      className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                    >
                      Open Full →
                    </Link>
                  </div>
                </div>

                {/* Iframe */}
                <iframe
                  src={project.live}
                  width="100%"
                  height="500px"
                  className="w-full"
                  title={`${project.title} Live Preview`}
                  onLoad={() => setIframeLoading(prev => ({ ...prev, [index]: false }))}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                ></iframe>
              </div>
            )}

            <ul className="flex flex-wrap gap-2 mt-4">
              {project.technologies.map((technology) => (
                <li key={technology.name} className="group">
                  <span
                    className="inline-flex items-center gap-2 rounded-md bg-slate-700 px-3 py-1 text-xs text-slate-100 hover:bg-slate-700 transition transform hover:-translate-y-[1px] hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                    aria-label={technology.name}
                  >
                    {technology.Icon && <technology.Icon size={14} className="opacity-90 transition-transform duration-300 group-hover:rotate-6" />}
                    {technology.name}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 backdrop-blur-sm p-4"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="bg-gray-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 id="modal-title" className="text-2xl font-bold">All GitHub Projects</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border border-slate-800 rounded-lg p-4 animate-pulse">
                      <div className="h-6 w-48 bg-slate-700 rounded mb-3"></div>
                      <div className="h-4 w-full bg-slate-700 rounded mb-2"></div>
                      <div className="h-4 w-3/4 bg-slate-700 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {allProjects.length > 0 ? (
                    allProjects.map((project) => (
                      <div
                        key={project.id}
                        className="border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors bg-gray-800"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-bold">
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-blue-400 transition-colors"
                            >
                              {project.name}
                            </a>
                          </h3>
                          <div className="flex gap-4 text-sm text-slate-400">
                            {project.stars > 0 && (
                              <span className="flex items-center gap-1">
                                <FaStar size={14} className="text-yellow-500" /> {project.stars}
                              </span>
                            )}
                            {project.forks > 0 && (
                              <span className="flex items-center gap-1">
                                <FaCodeBranch size={14} /> {project.forks}
                              </span>
                            )}
                          </div>
                        </div>

                        {project.description && (
                          <p className="text-sm text-slate-300 mb-3">{project.description}</p>
                        )}

                        {/* Technologies/Languages */}
                        {project.languages && project.languages.length > 0 && (
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-2">
                              {project.languages.slice(0, 5).map((lang, i) => (
                                <span key={i} className="text-xs px-2 py-1 bg-slate-700 rounded-full">
                                  {lang.name} {lang.percentage}%
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Topics */}
                        {project.topics && project.topics.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.topics.map((topic, i) => (
                              <span key={i} className="text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full">
                                #{topic}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                          <div className="flex gap-3">
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
                    <p className="text-center text-slate-400">No projects found.</p>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-800 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
