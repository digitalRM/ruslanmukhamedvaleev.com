"use client";

import Nav from "@/components/ui/nav";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Nav />

      <main className="flex-1 px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-12 mb-16">
          <div className="col-span-2">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-8">
              About Me
            </h1>
            <div className="space-y-6 text-lg">
              <p className="">
                I&apos;m Ruslan Mukhamedvaleev, a student researcher and
                developer who focuses on the intersection of language and
                technology, particularly in computational linguistics, digital
                language protection, and language accessibility tools.
              </p>
              <p>
                My work spans research, technology, development, design,
                community service, and advocacy. I focus on creating impactful
                solutions that help people communicate more effectively and
                protect linguistic diversity.
              </p>
              <p>
                I co-founded Koel Labs, a research-driven startup building
                dialect-sensitive language learning tools, and worked
                extensively on projects to preserve Ukrainian language and
                literature. I&apos;m passionate about using tech + design to
                solve real-world problems, especially those related to language
                and accessibility.
              </p>
              <p>
                When I&apos;m not coding or researching, I curate vintage
                design, mentor other students, build robots, or advocate for
                inclusive education policies through my work with the Washington
                Youth Legislative Advisory Council.
              </p>
            </div>
          </div>

          <div className="relative h-auto">
            <div className="border border-black">
              <div className=" relative m-4 h-[500px]">
                <Image
                  src="/ruslanShot.png"
                  alt="Ruslan Mukhamedvaleev"
                  fill
                  className="object-cover border border-black h-full object-bottom"
                />
              </div>
              <div className="p-4 border-t border-black">
                <p className="text-sm text-neutral-600">
                  Currently working on Koel Labs, a research-focused startup
                  building the first dialect-sensitive language learning tool.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-20">
          <h2 className="text-2xl font-medium mb-8 tracking-tight border-b border-black pb-3">
            Research Interests
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-black p-6">
              <h3 className="text-xl font-medium mb-4">
                Computational Linguistics
              </h3>
              <p className="text-sm">
                Exploring how computational methods can be applied to language
                analysis, processing, and generation. Particularly interested in
                phonemic transcription and dialect-sensitive language models.
              </p>
            </div>

            <div className="border border-black p-6">
              <h3 className="text-xl font-medium mb-4">
                Language Preservation
              </h3>
              <p className="text-sm">
                Using digital tools to document, preserve, and revitalize
                languages, especially those under threat. Working on projects to
                protect Ukrainian literature and poetry in digital archives.
              </p>
            </div>

            <div className="border border-black p-6">
              <h3 className="text-xl font-medium mb-4">
                Human-Computer Interaction
              </h3>
              <p className="text-sm">
                Designing interfaces and tools that make technology more
                accessible and user-friendly, with a focus on language learning
                applications and tools for people with speech differences.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-8 tracking-tight border-b border-black pb-3">
            Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="font-medium mb-3">Programming</h3>
              <ul className="space-y-2 text-sm">
                <li>Python (Machine Learning, Data Analysis)</li>
                <li>JavaScript/TypeScript</li>
                <li>React/Next.js</li>
                <li>Java/C++</li>
                <li>SQL</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">Design</h3>
              <ul className="space-y-2 text-sm">
                <li>UI/UX Design</li>
                <li>Brand Development</li>
                <li>Typography</li>
                <li>Figma/Adobe Creative Suite</li>
                <li>Data Visualization</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">Research</h3>
              <ul className="space-y-2 text-sm">
                <li>Data Collection & Analysis</li>
                <li>Machine Learning</li>
                <li>Academic Writing</li>
                <li>Poster & Presentation Design</li>
                <li>Literature Review</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">Languages</h3>
              <ul className="space-y-2 text-sm">
                <li>English (Native)</li>
                <li>Russian (Native)</li>
                <li>Ukrainian (Basic)</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
