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
            <div className='flex justify-between'>
                <div className='flex justify-center items-center gap-10 pb-10'>
                    <div className="logo">
                        <span className='italic text-lg font-bold'>i</span>
                        <span className='italic text-2xl font-extrabold'>M</span>
                        <span className='italic text-xl font-bold text-emerald-500'><Typewriter words={['ved']} loop={1} cursor cursorStyle='.' typeSpeed={70} deleteSpeed={50} delaySpeed={1000} /></span>
                    </div>
                    <div className="nav-links flex gap-10 font-semibold">
                        <Link href={'#home'} className='transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm py-2 px-4 rounded-lg'>Home</Link>
                        <Link href={'#projects'} className='transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm py-2 px-4 rounded-lg'>Projects</Link>
                        <Link href={'#about'} className='transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm py-2 px-4 rounded-lg'>About</Link>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsResumeModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 px-4 py-2 text-sm font-medium text-white transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 shadow-lg hover:shadow-teal-500/50"
                    >
                        <FaFilePdf size={14} />
                        View Resume
                    </button>
                    <button
                        className={`flex items-center rounded-full transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-200' : 'bg-gray-700'}`}
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        aria-label="Toggle theme"
                    >
                        <span className={`text-xl rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-emerald-500' : ''}`}>🌙</span>
                        <span className={`text-xl rounded-full transition-all duration-300 ${theme === 'light' ? 'bg-emerald-500' : ''}`}>🌞</span>
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
