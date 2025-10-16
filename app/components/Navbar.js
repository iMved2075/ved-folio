"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Typewriter } from 'react-simple-typewriter'
import { FaFilePdf } from 'react-icons/fa'
import ResumeModal from './ResumeModal'

const Navbar = () => {
    const [theme, setTheme] = useState('dark');
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
    
    return (
        <>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mb-6'>
                <div className='flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 pb-4 md:pb-10'>
                    <div className="logo">
                        <span className='italic text-lg font-bold'>i</span>
                        <span className='italic text-2xl font-extrabold'>M</span>
                        <span className='italic text-xl font-bold text-emerald-500'><Typewriter words={['ved']} loop={1} cursor cursorStyle='.' typeSpeed={70} deleteSpeed={50} delaySpeed={1000} /></span>
                    </div>
                    <div className="nav-links flex flex-wrap gap-4 sm:gap-6 md:gap-10 font-semibold text-sm md:text-base justify-center">
                        <Link href={'#home'} className='transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm py-2 px-3 md:px-4 rounded-lg'>Home</Link>
                        <Link href={'#projects'} className='transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm py-2 px-3 md:px-4 rounded-lg'>Projects</Link>
                        <Link href={'#about'} className='transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm py-2 px-3 md:px-4 rounded-lg'>About</Link>
                    </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                    <button
                        onClick={() => setIsResumeModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-white transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 shadow-lg hover:shadow-teal-500/50"
                    >
                        <FaFilePdf size={14} className="hidden sm:block" />
                        <span className="sm:hidden">Resume</span>
                        <span className="hidden sm:inline">View Resume</span>
                    </button>
                    <button
                        className={`flex items-center rounded-full transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-200' : 'bg-gray-700'}`}
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        aria-label="Toggle theme"
                    >
                        <span className={`text-lg md:text-xl rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-emerald-500' : ''}`}>🌙</span>
                        <span className={`text-lg md:text-xl rounded-full transition-all duration-300 ${theme === 'light' ? 'bg-emerald-500' : ''}`}>🌞</span>
                    </button>
                </div>
            </div>
            
            {/* Resume Modal */}
            <ResumeModal 
                isOpen={isResumeModalOpen} 
                onClose={() => setIsResumeModalOpen(false)} 
            />
        </>
    )
}

export default Navbar
