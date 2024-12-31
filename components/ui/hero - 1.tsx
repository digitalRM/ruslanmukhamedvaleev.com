"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";

import Floating, { FloatingElement } from "@/components/ui/floating";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

const Hero = () => {
  return (
    <div className="flex w-full max-h-[1440px] min-h-[900px] h-screen relative justify-center items-center bg-white overflow-hidden">
      <motion.div
        className="z-50 text-center space-y-4 items-center flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 0 }}
      >
        <h1 className="text-5xl md:text-7xl z-50 text-black font-medium tracking-tighter">
          Ruslan Mukhamedvaleev
        </h1>
        <p className="text-2xl z-50 text-neutral-800 font-normal max-w-2xl mx-auto tracking-tighter">
          Ruslan Mukhamedvaleev is a student researcher and developer focused on
          design, machine learning, and web development.
        </p>
        <div className="flex items-center gap-2">
          <a
            href="https://www.ruslan.in"
            target="_blank"
            className="text-xs z-50 border border-neutral-800 hover:scale-110 transition-transform bg-black text-white rounded-full py-2 w-fit px-3 cursor-pointer"
          >
            View Portfolio
            <ArrowUpRightIcon className="w-3 h-3 ml-1 -mt-px inline-block" />
          </a>
          <a
            href="mailto:ruslanmukhamedvaleev@gmail.com"
            className="text-xs z-50 hover:scale-110 transition-transform bg-white text-black rounded-full py-2 w-fit px-3 cursor-pointer"
          >
            Email Me
            <ArrowRightIcon className="w-3 h-3 ml-1 -mt-px inline-block" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
