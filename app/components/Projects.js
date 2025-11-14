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

const Projects = ({ showProjects, setShowProjects }) => {
  const [iframeLoading, setIframeLoading] = useState({});
  const [showIframe, setShowIframe] = useState({});

  const featuredProjects = [
    {
      title: "ved-folio",
      description: "ved-folio is a personal portfolio website built with Next.js and Tailwind CSS. It features a clean and modern design, showcasing projects, skills, and contact information. The site is fully responsive and optimized for performance, providing an excellent user experience across all devices. With smooth animations and easy navigation, ved-folio serves as a professional online presence for developers and creatives.",
      live: "https://ved-folio.vercel.app/",
      github: "https://github.com/iMved2075/ved-folio",
      technologies: [
        { name: 'Next.js', Icon: SiNextdotjs },
        { name: 'Tailwind CSS', Icon: SiTailwindcss },
        { name: 'JavaScript', Icon: SiJavascript },
        { name: 'React', Icon: SiReact },
        { name: 'GitHub', Icon: SiGithub },
        { name: 'Git', Icon: SiGit },
      ]
    },
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


  const handleShowAll = () => {
    setShowProjects(true);
  };


  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 text-foreground">
        <h2 className="text-lg sm:text-xl font-semibold">Featured Projects</h2>
        <button
          onClick={handleShowAll}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[color:var(--color-accent)] hover:opacity-90 text-white text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap"
        >
          Show All Projects
        </button>
      </div>

      {/* Featured Projects */}
      <ul className="space-y-6">
        {featuredProjects.map((project, index) => (
          <li key={index} className="border border-[color:var(--color-border)] bg-[color:var(--color-background)]/40 p-3 sm:p-4 rounded-lg shadow-md text-foreground">
            <div className='flex flex-col sm:flex-row justify-between gap-2 sm:gap-0'>
              <Link href={project.live} target="_blank" className="flex items-center gap-3">
                <Image
                  src={!project.logo ? '/vercel.svg' : project.logo}
                  alt={`${project.title} Logo`}
                  width={40}
                  height={40}
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded object-contain"
                  unoptimized
                />
                <h3 className="text-base sm:text-lg font-bold mb-0 sm:mb-2">{project.title}</h3>
              </Link>
              <Link href={project.github} target="_blank" className="text-xs sm:text-sm text-[color:var(--color-accent)] hover:underline self-start sm:self-center">
                View Code
              </Link>
            </div>
            <hr className="border-[color:var(--color-border)] my-2" />
            <p className="text-xs sm:text-sm opacity-80 mb-3">{project.description}</p>
            
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
              <div className="relative mb-4 rounded-lg overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-background)]">
                {/* Loading State */}
                {iframeLoading[index] !== false && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[color:var(--color-background)]/90 z-10">
                    <div className="text-center">
                      <div className="inline-block w-12 h-12 border-4 border-[color:var(--color-accent)] border-t-transparent rounded-full animate-spin mb-3"></div>
                      <p className="text-sm opacity-70">Loading preview...</p>
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
                    <span className="text-xs opacity-70 ml-3 truncate max-w-[200px]">{project.live}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={project.live}
                      target="_blank"
                      className="text-xs px-3 py-1 bg-[color:var(--color-accent)] hover:opacity-90 text-white rounded transition-colors"
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
                    className="inline-flex items-center gap-2 rounded-md bg-[color:var(--color-background)]/25 px-3 py-1 text-xs text-foreground hover:bg-[color:var(--color-background)]/35 transition transform hover:-translate-y-[1px] hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]"
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
    </>
  );
};

export default Projects;
