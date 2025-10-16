"use client";

import React, { useEffect, useRef, useState } from 'react'
import { 
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiPostman,
  SiGithub,
  SiGit,
  SiJsonwebtokens,
} from 'react-icons/si'
import { MdOutlineApi } from 'react-icons/md'

const categories = [
  {
    title: 'Frontend',
    gradient: 'from-blue-600 to-cyan-600',
    skills: [
      { name: 'React', Icon: SiReact },
      { name: 'Next.js', Icon: SiNextdotjs },
      { name: 'Redux', Icon: SiRedux },
      { name: 'Tailwind CSS', Icon: SiTailwindcss },
      { name: 'JavaScript', Icon: SiJavascript },
    ],
  },
  {
    title: 'Backend',
    gradient: 'from-green-600 to-emerald-600',
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'Express', Icon: SiExpress },
      { name: 'REST APIs', Icon: MdOutlineApi },
      { name: 'Authentication (JWT)', Icon: SiJsonwebtokens },
    ],
  },
  {
    title: 'Database & DevOps',
    gradient: 'from-purple-600 to-pink-600',
    skills: [
      { name: 'MongoDB', Icon: SiMongodb },
      { name: 'Mongoose', Icon: SiMongoose },
      { name: 'Postman', Icon: SiPostman },
      { name: 'Git', Icon: SiGit },
      { name: 'GitHub', Icon: SiGithub },
    ],
  },
]

const Skills = () => {
  const sectionRefs = useRef([])
  const [visible, setVisible] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = entry.target.getAttribute('data-index')
          if (entry.isIntersecting) {
            setVisible((v) => ({ ...v, [idx]: true }))
          }
        })
      },
      { threshold: 0.15 }
    )

    sectionRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="w-full">
      <p className="text-sm text-slate-300 mb-3">Technologies I use.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, i) => (
          <section
            key={category.title}
            ref={(el) => (sectionRefs.current[i] = el)}
            data-index={i}
            style={{ transitionDelay: `${i * 100}ms` }}
            className={`relative rounded-lg border border-slate-800 bg-slate-900/40 p-4 transition-all duration-700 ease-out overflow-hidden ${
              visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {/* Gradient Background */}
            <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-br ${category.gradient} opacity-10`}></div>
            
            <div className="relative z-10">
              <h3 className="text-base font-bold mb-3">{category.title}</h3>
              <ul className="grid grid-cols-2 gap-2">
                {category.skills.map((skill, j) => (
                  <li key={skill.name} className="group">
                    <span
                      className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-100 hover:bg-slate-700 transition transform hover:-translate-y-[1px] hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                      aria-label={skill.name}
                    >
                      {skill.Icon && <skill.Icon size={14} className="opacity-90 transition-transform duration-300 group-hover:rotate-6" />}
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default Skills
