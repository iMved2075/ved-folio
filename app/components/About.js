"use client";

import React from 'react'
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from 'react-icons/si'
import { MdEmail } from 'react-icons/md'
import { FaGithub } from 'react-icons/fa'

const highlights = [
  { icon: SiReact, label: 'React/Next.js UI development' },
  { icon: SiNodedotjs, label: 'Node.js & Express APIs' },
  { icon: SiMongodb, label: 'MongoDB data modeling' },
  { icon: SiExpress, label: 'Authentication & REST best practices' },
]

const About = () => {
  return (
    <div className="w-full rounded-lg border border-slate-800 bg-slate-900/40 p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Who am I?</h2>
          <p className="mt-2 text-slate-300">
            I&apos;m Ved, a MERN-focused developer who enjoys building clean UIs and robust APIs. I love
            shipping features end-to-end—designing responsive interfaces, crafting REST endpoints,
            and modeling data for reliability and performance.
          </p>

          <ul className="mt-3 flex flex-col sm:grid-cols-2 gap-5 space-y-3">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-slate-200">
                <Icon size={16} className="text-teal-400" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-center gap-2">
            <a
              href="mailto:imved2075@gmail.com"
              className="inline-flex items-center gap-2 rounded-md bg-teal-600/90 hover:bg-teal-500 px-3 py-2 text-xs font-medium text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <MdEmail size={14} /> Contact
            </a>
            <a
              href="https://github.com/iMved2075"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-slate-800 hover:bg-slate-700 px-3 py-2 text-xs font-medium text-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <FaGithub size={14} /> GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
