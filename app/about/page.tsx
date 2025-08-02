"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  const headingText = "I'm Ruslan Mukhamedvaleev, it's nice to meet you!";
  const words = headingText.split(" ");

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col w-full mx-auto">
      <div className="flex-1 flex flex-col px-4 md:px-8 z-[100] pt-16 relative backdrop-blur-2xl bg-white/50 max-w-[1000px] mx-auto">
        <div className=" mx-auto">
          {/* Main heading */}
          <div className="w-full text-balance mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tighter open-runde-medium z-[100] relative">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, filter: "blur(4px)", translateY: 15 }}
                  animate={{ opacity: 1, filter: "blur(0px)", translateY: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.04 + 0.5,
                    ease: "circInOut",
                  }}
                  className="inline-block mr-[0.25em] ease-[cubic-bezier(0.65,0,0.35,1)]"
                >
                  {word + " "}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Main content grid */}
          <motion.div
            className="grid grid-cols-1 gap-8 mb-16 z-[100] relative"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div className=" space-y-6" variants={itemVariants}>
              <motion.div
                className="backdrop-blur-lg bg-white/40 rounded-lg border border-white/20"
                variants={itemVariants}
              >
                <p className="text-lg open-runde-regular text-balance">
                  I&apos;m a student, researcher, and developer who focuses on
                  the intersection of language and technology, particularly in
                  computational linguistics, digital language protection, and
                  language accessibility tools.
                </p>
              </motion.div>

              <motion.div
                className="backdrop-blur-lg bg-white/40 rounded-lg border border-white/20"
                variants={itemVariants}
              >
                <p className="text-lg open-runde-regular text-balance">
                  My work spans research, technology, development, design,
                  community service, and advocacy. I focus on creating impactful
                  solutions that help people communicate more effectively and
                  protect linguistic diversity.
                </p>
              </motion.div>

              <motion.div
                className="backdrop-blur-lg bg-white/40 rounded-lg border border-white/20"
                variants={itemVariants}
              >
                <p className="text-lg open-runde-regular text-balance">
                  I co-founded Koel Labs, a research-driven startup building
                  dialect-sensitive language learning tools, and worked
                  extensively on projects to preserve Ukrainian language and
                  literature. I&apos;m passionate about using tech + design to
                  solve real-world problems, especially those related to
                  language and accessibility.
                </p>
              </motion.div>

              <motion.div
                className="backdrop-blur-lg bg-white/40 rounded-lg border border-white/20"
                variants={itemVariants}
              >
                <p className="text-lg open-runde-regular text-balance">
                  When I&apos;m not coding or researching, I curate vintage
                  design, mentor other students, build robots, or advocate for
                  inclusive education policies through my work with the
                  Washington Youth Legislative Advisory Council.
                </p>
              </motion.div>
            </motion.div>

            <motion.div className="relative h-auto" variants={itemVariants}>
              <div className="backdrop-blur-lg bg-white/40 rounded-lg border border-white/20 overflow-hidden">
                <div className="relative h-[500px] lg:h-[900px] rounded-lg">
                  <Image
                    src="/ruslanShot.png"
                    alt="A photo of Ruslan Mukhamedvaleev in San Francisco in front of the bay bridge, at Mozilla's Demo Day event for Koel Labs"
                    fill
                    className="object-cover object-bottom"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Research Interests */}
          <motion.section className="mb-16 z-[100] relative">
            <motion.h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tighter open-runde-medium">
              Research Interests
            </motion.h2>

            <motion.div className="grid grid-cols-1 gap-6">
              <motion.div className="backdrop-blur-lg bg-white/40 border border-white/20">
                <h3 className="text-xl font-medium mb-4 open-runde-medium">
                  Computational Linguistics
                </h3>
                <p className="text-sm open-runde-regular leading-relaxed">
                  Exploring how computational methods can be applied to language
                  analysis, processing, and generation. Particularly interested
                  in phonemic transcription and dialect-sensitive language
                  models.
                </p>
              </motion.div>

              <motion.div className="backdrop-blur-lg bg-white/40 border border-white/20">
                <h3 className="text-xl font-medium mb-4 open-runde-medium">
                  Language Preservation
                </h3>
                <p className="text-sm open-runde-regular leading-relaxed">
                  Using digital tools to document, preserve, and revitalize
                  languages, especially those under threat. Working on projects
                  to protect Ukrainian literature and poetry in digital
                  archives.
                </p>
              </motion.div>

              <motion.div className="backdrop-blur-lg bg-white/40 border border-white/20">
                <h3 className="text-xl font-medium mb-4 open-runde-medium">
                  Human-Computer Interaction
                </h3>
                <p className="text-sm open-runde-regular leading-relaxed">
                  Designing interfaces and tools that make technology more
                  accessible and user-friendly, with a focus on language
                  learning applications and tools for people with speech
                  differences.
                </p>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Skills */}
          <motion.section className="pb-16 z-[100] relative">
            <motion.h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tighter open-runde-medium">
              Skills
            </motion.h2>

            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div className="backdrop-blur-lg bg-white/40 border border-white/20">
                <h3 className="font-medium mb-3 open-runde-medium">
                  Programming
                </h3>
                <ul className="space-y-2 text-sm open-runde-regular">
                  <li>Python (Machine Learning, Data Analysis)</li>
                  <li>JavaScript/TypeScript</li>
                  <li>React/Next.js</li>
                  <li>Java/C++</li>
                  <li>SQL</li>
                </ul>
              </motion.div>

              <motion.div className="backdrop-blur-lg bg-white/40 border border-white/20">
                <h3 className="font-medium mb-3 open-runde-medium">Design</h3>
                <ul className="space-y-2 text-sm open-runde-regular">
                  <li>UI/UX Design</li>
                  <li>Brand Development</li>
                  <li>Typography</li>
                  <li>Figma/Adobe Creative Suite</li>
                  <li>Data Visualization</li>
                </ul>
              </motion.div>

              <motion.div className="backdrop-blur-lg bg-white/40 border border-white/20">
                <h3 className="font-medium mb-3 open-runde-medium">Research</h3>
                <ul className="space-y-2 text-sm open-runde-regular">
                  <li>Data Collection & Analysis</li>
                  <li>Machine Learning</li>
                  <li>Academic Writing</li>
                  <li>Poster & Presentation Design</li>
                  <li>Literature Review</li>
                </ul>
              </motion.div>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
