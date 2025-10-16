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
    <footer className="mt-10 border-t border-slate-800 pt-6 text-foreground">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm opacity-80">
          © {currentYear} <span className="font-semibold text-foreground">Vedprakash Patel</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/iMved2075"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[color:var(--color-background)]/20 hover:bg-[color:var(--color-background)]/30 px-3 py-2 text-xs text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]"
            aria-label="GitHub"
          >
            <FaGithub size={14} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/vedprakash-patel-525bb9250/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[color:var(--color-background)]/20 hover:bg-[color:var(--color-background)]/30 px-3 py-2 text-xs text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={14} />
            LinkedIn
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-md bg-[color:var(--color-accent)] hover:opacity-90 px-3 py-2 text-xs text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/60"
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
