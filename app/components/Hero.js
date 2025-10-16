"use client"
import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { FiGlobe } from "react-icons/fi";

const Hero = () => {
  return (
    <>
      <div className='flex flex-col bg-[url(/bg1.jpg)] bg-cover bg-center h-[70vh] w-full font-bold text-blue-100 rounded-lg shadow-lg'>
        <div className='bg-green-950/50 backdrop-blur-none p-10 h-full rounded-lg'>
          <hr className='text-emerald-500'/>
          <span className='text-2xl font-bold flex items-center gap-2'><FiGlobe /> <Typewriter words={['HELLO WORLD']} loop={1} cursor cursorStyle='!' typeSpeed={70} deleteSpeed={50} delaySpeed={1000} /></span>
          <hr className='text-emerald-500'/>
          <div className='text-4xl py-8'>
            <Typewriter words={["Hey! I'm Vedprakash 👋"]} loop={1} cursor cursorStyle='.' typeSpeed={70} deleteSpeed={50} delaySpeed={1000} />
          </div>
          <Typewriter words={['I love coding', 'I am a fullstack web developer']} loop={0} cursor cursorStyle='.' typeSpeed={70} deleteSpeed={50} delaySpeed={1000} />
          <div className='pt-5'>Welcome to my portfolio website!</div>
          <div className='flex justify-between py-10'>
            <div className='w-[30%] bg-white/10 backdrop-blur-md p-5 rounded-lg'>
              <span>I am a passionate developer with experience in building web applications using modern technologies.</span>
            </div>
            <div className='w-[30%] bg-white/10 backdrop-blur-md p-5 rounded-lg'>
              <span>Feel free to explore my projects and skills showcased here.</span>
              <span>Let&apos;s connect and create something amazing together!</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
