"use client"
import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { FiGlobe } from "react-icons/fi";

const Hero = () => {
  return (
    <>
      <div className='relative flex flex-col bg-[url(/bg1.jpg)] bg-cover bg-center min-h-[50vh] md:h-[70vh] w-full font-bold text-foreground rounded-lg shadow-lg overflow-hidden'>
        <div className='absolute inset-0 bg-[color:var(--color-overlay)] z-0'></div>
        <div className='relative z-10 bg-[color:var(--color-accent)]/10 backdrop-blur-none p-4 sm:p-6 md:p-10 h-full rounded-lg'>
          <hr className='text-emerald-500'/>
          <span className='text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-2'>
            <FiGlobe /> 
            <Typewriter words={['HELLO WORLD']} loop={1} cursor cursorStyle='!' typeSpeed={70} deleteSpeed={50} delaySpeed={1000} />
          </span>
          <hr className='text-emerald-500'/>
          <div className='text-2xl sm:text-3xl md:text-4xl py-4 md:py-8'>
            <Typewriter words={["Hey! I'm Vedprakash 👋"]} loop={1} cursor cursorStyle='.' typeSpeed={70} deleteSpeed={50} delaySpeed={1000} />
          </div>
          <div className='text-sm sm:text-base md:text-lg'>
            <Typewriter words={['I love coding', 'I am a fullstack web developer']} loop={0} cursor cursorStyle='.' typeSpeed={70} deleteSpeed={50} delaySpeed={1000} />
          </div>
          <div className='pt-3 md:pt-5 text-sm md:text-base'>Welcome to my portfolio website!</div>
          <div className='flex flex-col md:flex-row justify-between gap-4 py-6 md:py-10'>
            <div className='w-full md:w-[48%] lg:w-[30%] bg-[color:var(--color-background)]/50 backdrop-blur-md p-4 md:p-5 rounded-lg'>
              <span className='text-xs sm:text-sm'>I am a passionate developer with experience in building web applications using modern technologies.</span>
            </div>
            <div className='w-full md:w-[48%] lg:w-[30%] bg-[color:var(--color-background)]/50 backdrop-blur-md p-4 md:p-5 rounded-lg'>
              <span className='text-xs sm:text-sm block mb-2'>Feel free to explore my projects and skills showcased here.</span>
              <span className='text-xs sm:text-sm'>Let&apos;s connect and create something amazing together!</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
