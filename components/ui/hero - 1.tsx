"use client";

import { motion } from "motion/react";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

const Hero = () => {
  return (
    <header className="flex w-full h-screen relative justify-center items-center bg-white overflow-hidden px-4 sm:px-6 lg:px-8 bg-[url('/back.png')] bg-cover bg-center">
      <motion.main
        className="z-50 sm:text-center space-y-4 items-center flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 0 }}
      >
        <article
          itemScope
          itemType="https://schema.org/Person"
          className="flex flex-col items-center space-y-4"
        >
          <meta itemProp="url" content="https://www.ruslanmukhamedvaleev.com" />
          <meta itemProp="image" content="/openGraph.png" />
          <meta
            itemProp="sameAs"
            content="https://www.ruslanmukhamedvaleev.com"
          />
          <meta itemProp="sameAs" content="https://www.ruslan.in" />
          <meta itemProp="sameAs" content="https://github.com/digitalRM" />
          <meta
            itemProp="sameAs"
            content="https://www.linkedin.com/in/ruslan-muk/"
          />
          <meta
            itemProp="sameAs"
            content="https://www.instagram.com/ruslan_mk11/"
          />
          <meta
            itemProp="sameAs"
            content="https://builders.mozilla.org/profile/ruslan-mukhamedvaleev/"
          />
          <meta itemProp="sameAs" content="https://www.foym.org" />
          <meta
            itemProp="sameAs"
            content="https://www.behance.net/mukhamedvaleev"
          />
          <meta
            itemProp="sameAs"
            content="https://dribbble.com/RuslanMukhamedvaleev"
          />
          <meta itemProp="sameAs" content="https://x.com/mukhamedvaleev" />
          <meta
            itemProp="sameAs"
            content="https://scholar.google.com/citations?user=yci2oWcAAAAJ"
          />
          <meta itemProp="alumniOf" content="Kamiak High School" />

          <h1
            itemProp="name"
            className="text-3xl sm:text-5xl w-full sm:w-fit md:text-7xl z-50 text-black font-medium tracking-tighter"
          >
            <span itemProp="givenName">Ruslan</span>{" "}
            <span itemProp="familyName">Mukhamedvaleev</span>
          </h1>

          <p
            itemProp="description"
            className="text-md xs:text-center sm:text-xl md:text-2xl z-50 text-neutral-800 font-normal max-w-2xl mx-auto tracking-tighter"
          >
            Ruslan Mukhamedvaleev is a student researcher and developer focused
            on design, machine learning, and web development.
          </p>

          <nav
            className="flex flex-col sm:flex-row w-full sm:w-fit items-center gap-2"
            aria-label="Primary navigation"
          >
            <a
              href="https://www.ruslan.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs z-50 border border-neutral-800 hover:scale-110 transition-transform bg-black text-white rounded-full py-2 w-full sm:w-fit px-3 cursor-pointer"
              aria-label="View Portfolio (opens in new tab)"
            >
              View Portfolio
              <ArrowUpRightIcon
                className="w-3 h-3 ml-1 -mt-px inline-block"
                aria-hidden="true"
              />
            </a>
            <a
              href="mailto:ruslanmukhamedvaleev@gmail.com"
              className="text-xs z-50 hover:scale-110 transition-transform bg-white text-black rounded-full py-2 w-full sm:w-fit px-3 cursor-pointer"
              aria-label="Send email"
            >
              Email Me
              <ArrowRightIcon
                className="w-3 h-3 ml-1 -mt-px inline-block"
                aria-hidden="true"
              />
            </a>
          </nav>
        </article>
      </motion.main>
    </header>
  );
};

export default Hero;
