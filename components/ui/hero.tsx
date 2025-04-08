"use client";
import Image from "next/image";
import Nav from "./nav";

const Hero = () => {
  return (
    <div className="flex flex-col w-full min-h-fit h-screen max-h-[1000px]">
      <Nav />

      <div className="flex-1 flex flex-col px-4 md:px-8 mt-16 md:mt-24">
        {/* Main heading */}
        <div className="w-full md:w-3/4 text-balance mb-6 md:mb-24 lg:mb-32">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tighter">
            Ruslan Mukhamedvaleev is a researcher, student, and developer
            focused on design, machine learning, and web development.
          </h1>
        </div>

        {/* Two column content */}
        <div className="flex flex-col md:flex-row md:space-x-8 mb-20">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <p className="text-sm md:text-base text-neutral-800 tracking-tight text-balance hidden sm:block">
              Design, Development, Machine Learning, Research, Language,
              Technology, Accessibility, NLP, HCI.
            </p>
          </div>

          <div className="w-full md:w-2/3">
            <p className="text-sm md:text-base text-neutral-800 max-w-2xl">
              Much of my work is centered on the intersection of language and
              technology, whether in computational linguistics, digital language
              protection, or language accessibility tools.
            </p>
          </div>
        </div>
      </div>
      {/* Full-width image */}
      <div className="w-full h-64 md:h-[600px] relative -mt-36 z-[-1] mb-4 overflow-hidden">
        <Image
          src="/clouds-st.svg"
          alt="Creative visual"
          fill
          className="object-cover min-w-[1900px] img img--hidden"
          onLoadingComplete={(image) => image.classList.remove("img--hidden")}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;
