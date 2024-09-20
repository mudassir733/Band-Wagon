"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

const slides = [
  {
    title: (
      <>
      Find Best Musicians <br></br> All Around your City
      </>
    ),
    description: "It is a long established fact that a reader will be distracted by the readable.",
    Image: "/images/Frame.png"
  },
  {
    title: "Connect with Local Talent",
    description: "Discover and collaborate with musicians in your area.",
     Image: "/images/Frame2.png"
  },
  {
    title: "Book Gigs and Events",
    description: "Easily organize and manage your musical events.",
     Image: "/images/Frame3.png"
  },
]

export default function OnboardingSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="bg-[#121212] w-full h-screen flex items-center overflow-hidden">
      <div className="w-full flex gap-[132px] items-center justify-center">
      <motion.div  key={currentSlide}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x:  50 }}
            transition={{ duration: 0.4 }}
            className="text-white p-8">
      {slides[currentSlide].Image && (
            <Image
              src={slides[currentSlide].Image}
              alt={slides[currentSlide].title}
              width={511} 
              height={512} 
            />
          )}

           </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-white p-8 "
          >
         
           <div className='flex flex-col gap-[18px] w-[379px]'>
           <h2 className="text-white text-[40px] font-bold font-['Lato'] leading-[48px]">{slides[currentSlide].title}</h2>
           <p className="w-[376px] text-neutral-400 text-[28px] font-medium font-['Lato'] leading-[34px]">{slides[currentSlide].description}</p>
           <div className="flex justify-between items-center pt-[30px]">
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentSlide ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="bg-green-500 text-white px-6 py-2 rounded-full flex items-center"
              >
                {currentSlide === slides.length - 1 ? 'Get Started' : 'Continue'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
           </div>
            
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}