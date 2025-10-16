'use client';

import React, { useEffect, useRef, useState } from 'react'

const gradientMap = {
  home: 'from-indigo-600 to-purple-600',
  about: 'from-cyan-600 to-blue-600',
  stats: 'from-green-600 to-emerald-600',
  projects: 'from-orange-600 to-red-600',
  certifications: 'from-yellow-600 to-orange-600',
  skills: 'from-pink-600 to-rose-600',
  contact: 'from-violet-600 to-purple-600',
}

const Section = ({ id, title, children }) => {
  const gradient = gradientMap[id] || 'from-slate-600 to-slate-700'
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])
  
  return (
    <section 
      id={id} 
      ref={sectionRef}
      className={`w-full transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      {title && (
        <div className={`mb-3 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <div className={`h-[1px] flex-1 bg-gradient-to-r ${gradient} opacity-60 transition-all duration-1000 delay-300 ${
              isVisible ? 'scale-x-100' : 'scale-x-0'
            } origin-left`} />
          </div>
        </div>
      )}
      <div className={`relative rounded-lg border border-slate-800 bg-slate-900/40 p-4 overflow-hidden transition-all duration-700 delay-200 ${
        isVisible 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-95'
      }`}>
        {/* Gradient Background */}
        <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${gradient} opacity-10 blur-xl transition-opacity duration-1000 delay-500 ${
          isVisible ? 'opacity-10' : 'opacity-0'
        }`}></div>
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </section>
  )
}

export default Section


