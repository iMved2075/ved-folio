"use client";

import React from 'react'
import { FaGithub, FaLinkedin, FaArrowUp } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="mt-10 border-t border-slate-800 pt-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-300">
          © {currentYear} <span className="font-semibold text-white">Vedprakash Patel</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/iMved2075"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-slate-800 hover:bg-slate-700 px-3 py-2 text-xs text-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label="GitHub"
          >
            <FaGithub size={14} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/vedprakash-patel-525bb9250/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-slate-800 hover:bg-slate-700 px-3 py-2 text-xs text-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={14} />
            LinkedIn
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-md bg-teal-600/90 hover:bg-teal-500 px-3 py-2 text-xs text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label="Back to top"
          >
            <FaArrowUp size={14} />
            Top
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
