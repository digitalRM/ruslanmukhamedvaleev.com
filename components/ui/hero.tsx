"use client";
import { motion } from "framer-motion";
import Tetris, { TetrisRef } from "./tetris";
import { Button } from "./button";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import captions from "../../public/portfolio/captions.json";

// Generate available image numbers: 1-38 and 53-84
const availableNumbers = [
  ...Array.from({ length: 38 }, (_, i) => i + 1), // 1-38
  ...Array.from({ length: 32 }, (_, i) => i + 53), // 53-84
];

function generateRandomWork() {
  // Always include 7 and 8
  const requiredNumbers = [7, 8];

  // Get remaining available numbers (excluding 7 and 8)
  const remainingNumbers = availableNumbers.filter(
    (num) => !requiredNumbers.includes(num)
  );

  // Shuffle remaining numbers
  const shuffled = remainingNumbers.sort(() => Math.random() - 0.5);

  // Take 25 more numbers (27 total - 2 required = 25)
  const selectedNumbers = [...requiredNumbers, ...shuffled.slice(0, 25)];

  // Shuffle all selected numbers
  const finalSelection = selectedNumbers.sort(() => Math.random() - 0.5);

  // Split into 3 rows of 9 each
  const rowOne = finalSelection.slice(0, 9).map((num) => ({
    src: `${num}.png`,
    caption:
      captions[num.toString() as keyof typeof captions] ||
      `Portfolio Item ${num}`,
  }));

  const rowTwo = finalSelection.slice(9, 18).map((num) => ({
    src: `${num}.png`,
    caption:
      captions[num.toString() as keyof typeof captions] ||
      `Portfolio Item ${num}`,
  }));

  const rowThree = finalSelection.slice(18, 27).map((num) => ({
    src: `${num}.png`,
    caption:
      captions[num.toString() as keyof typeof captions] ||
      `Portfolio Item ${num}`,
  }));

  return { rowOne, rowTwo, rowThree };
}

// Static initial data for SSR (will be replaced after hydration)
const getInitialWorkData = () => {
  const staticSelection = [
    7, 8, 1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27,
  ];

  const rowOne = staticSelection.slice(0, 9).map((num) => ({
    src: `${num}.png`,
    caption:
      captions[num.toString() as keyof typeof captions] ||
      `Portfolio Item ${num}`,
  }));

  const rowTwo = staticSelection.slice(9, 18).map((num) => ({
    src: `${num}.png`,
    caption:
      captions[num.toString() as keyof typeof captions] ||
      `Portfolio Item ${num}`,
  }));

  const rowThree = staticSelection.slice(18, 27).map((num) => ({
    src: `${num}.png`,
    caption:
      captions[num.toString() as keyof typeof captions] ||
      `Portfolio Item ${num}`,
  }));

  return { rowOne, rowTwo, rowThree };
};

const Hero = () => {
  const [isTetrisVisible, setIsTetrisVisible] = useState(false);
  const [workData, setWorkData] = useState(() => getInitialWorkData());
  const tetrisRef = useRef<TetrisRef>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const headingText =
    "Ruslan Mukhamedvaleev is a researcher, student, and developer focused on design, machine learning, and web development.";
  const words = headingText.split(" ");

  useEffect(() => {
    setWorkData(generateRandomWork());
  }, []);

  const openModal = useCallback((imageSrc: string) => {
    if (!modalRef.current) return;

    const modalImage = modalRef.current.querySelector(
      "img"
    ) as HTMLImageElement;
    if (modalImage) {
      modalImage.src = `/portfolio/${imageSrc}`;
    }

    modalRef.current.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Animate in
    gsap.fromTo(
      modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(
      modalImage,
      { scale: 0.7 },
      { scale: 0.9, duration: 0.4, ease: "back.out(1.7)" }
    );
  }, []);

  const closeModal = useCallback(() => {
    if (!modalRef.current) return;

    const modalImage = modalRef.current.querySelector(
      "img"
    ) as HTMLImageElement;

    // Animate out
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        if (modalRef.current) {
          modalRef.current.style.display = "none";
          document.body.style.overflow = "auto";
        }
      },
    });
    gsap.to(modalImage, {
      scale: 0.9,
      duration: 0.2,
      ease: "power2.in",
    });
  }, []);

  // Toggle Tetris visibility with T key and handle modal close with Escape
  useEffect(() => {
    const handleToggle = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        tetrisRef.current?.resetGame();
        setIsTetrisVisible((prev) => !prev);
      }
      if (
        (e.key === "r" || e.key === "R") &&
        isTetrisVisible &&
        tetrisRef.current
      ) {
        e.preventDefault();
        tetrisRef.current.resetGame();
      }

      if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        window.open("https://www.ruslan.in", "_blank");
      }

      if (e.key === "w" || e.key === "W") {
        e.preventDefault();
        window.open("/work", "_blank");
      }
    };

    window.addEventListener("keydown", handleToggle);
    return () => window.removeEventListener("keydown", handleToggle);
  }, [isTetrisVisible, closeModal]);

  return (
    <div className="flex flex-col w-full min-h-fit h-screen max-h-[2100px]">
      <div className="flex-1 flex flex-col px-4 md:px-8 mt-16 z-[100] relative backdrop-blur-2xl bg-white/50 max-h-[100vh] overflow-hidden">
        {/* Main heading */}
        <div className="w-full md:w-3/4 text-balance mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tighter open-runde-medium z-[100] relative">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: "blur(4px)", translateY: 15 }}
                animate={{ opacity: 1, filter: "blur(0px)", translateY: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.04,
                  ease: "circInOut",
                }}
                className="inline-block mr-[0.25em] ease-[cubic-bezier(0.65,0,0.35,1)]"
              >
                {word + " "}
              </motion.span>
            ))}
          </h1>
        </div>
        <div className="z-[100] relative flex sm:flex-row flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, filter: "blur(4px)", translateY: 15 }}
            animate={{ opacity: 1, filter: "blur(0px)", translateY: 0 }}
            transition={{
              duration: 0.5,
              delay: words.length * 0.04 + 0.2,
              ease: "circInOut",
            }}
          >
            <Link href="/work">
              <Button
                variant="outline"
                className="text-sm shadow-none tracking-tight rounded-[14px] px-2.5 cursor-pointer w-full sm:w-auto flex justify-between backdrop-blur-lg bg-white/40"
              >
                Explore Work{" "}
                <kbd className="rounded-lg open-runde-medium border border-neutral-200 px-1 py-0.5 text-xs -mr-0.5 ml-7 bg-white/40">
                  W
                </kbd>
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, filter: "blur(4px)", translateY: 15 }}
            animate={{ opacity: 1, filter: "blur(0px)", translateY: 0 }}
            transition={{
              duration: 0.5,
              delay: words.length * 0.04 + 0.35,
              ease: "circInOut",
            }}
          >
            <a href="https://www.ruslan.in" target="_blank">
              <Button
                variant="outline"
                className="text-sm shadow-none tracking-tight rounded-[14px] px-2.5 cursor-pointer w-full sm:w-auto flex justify-between backdrop-blur-lg bg-white/40"
              >
                View Resume{" "}
                <kbd className="rounded-lg open-runde-medium border border-neutral-200 px-1.5 py-0.5 text-xs -mr-0.5 ml-6 bg-white/40">
                  P
                </kbd>
              </Button>
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, filter: "blur(4px)", translateY: 15 }}
            animate={{ opacity: 1, filter: "blur(0px)", translateY: 0 }}
            transition={{
              duration: 0.5,
              delay: words.length * 0.04 + 0.5,
              ease: "circInOut",
            }}
          >
            <Button
              variant="outline"
              onClick={() => {
                tetrisRef.current?.resetGame();
                setIsTetrisVisible((prev) => !prev);
              }}
              className="text-sm open-runde-medium rounded-[14px] px-2.5 shadow-none tracking-tight cursor-pointer w-full justify-between sm:w-auto backdrop-blur-lg bg-white/40 sm:flex hidden"
            >
              Play Tetris{" "}
              <kbd className="rounded-lg open-runde-medium border border-neutral-200 px-1.5 py-0.5 text-xs -mr-0.5 ml-10 bg-white/40">
                T
              </kbd>
            </Button>
          </motion.div>
        </div>
        <motion.div
          className="flex flex-col gap-4 mb-2 overflow-visible mt-16 z-[100] relative"
          animate={{
            opacity: isTetrisVisible ? 0 : 1,
            filter: isTetrisVisible ? "blur(2px)" : "blur(0px)",
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          {/* Row 1 */}
          <div className="relative w-full h-[242px] overflow-visible">
            <motion.div
              className="flex gap-2 absolute"
              initial={{ x: 0, opacity: 0 }}
              animate={{
                x: [0, -(408 * workData.rowOne.length)],
                opacity: 1,
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60,
                  ease: "linear",
                },
                opacity: {
                  duration: 0.8,
                  delay: 1.5,
                  ease: "easeOut",
                },
              }}
            >
              {[...workData.rowOne, ...workData.rowOne].map((work, index) => (
                <div key={`${work.src}-${index}`} className="flex-shrink-0">
                  <img
                    src={`/600/${work.src}`}
                    alt={work.caption}
                    width={400}
                    className="rounded-xl cursor-pointer transition-transform duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(work.src);
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="relative w-full h-[242px] overflow-visible">
            <motion.div
              className="flex gap-2 absolute"
              initial={{ x: -(408 * workData.rowTwo.length), opacity: 0 }}
              animate={{
                x: [-(408 * workData.rowTwo.length), 0],
                opacity: 1,
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60,
                  ease: "linear",
                },
                opacity: {
                  duration: 0.8,
                  delay: 1.75,
                  ease: "easeOut",
                },
              }}
            >
              {[...workData.rowTwo, ...workData.rowTwo].map((work, index) => (
                <div key={`${work.src}-${index}`} className="flex-shrink-0">
                  <img
                    src={`/600/${work.src}`}
                    alt={work.caption}
                    width={400}
                    className="rounded-xl cursor-pointer transition-transform duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(work.src);
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 3 */}
          <div className="relative w-full h-[242px] overflow-visible">
            <motion.div
              className="flex gap-2 absolute"
              initial={{ x: 0, opacity: 0 }}
              animate={{
                x: [0, -(408 * workData.rowThree.length)],
                opacity: 1,
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60,
                  ease: "linear",
                },
                opacity: {
                  duration: 0.8,
                  delay: 2,
                  ease: "easeOut",
                },
              }}
            >
              {[...workData.rowThree, ...workData.rowThree].map(
                (work, index) => (
                  <div key={`${work.src}-${index}`} className="flex-shrink-0">
                    <img
                      src={`/600/${work.src}`}
                      alt={work.caption}
                      width={400}
                      className="rounded-xl cursor-pointer transition-transform duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(work.src);
                      }}
                    />
                  </div>
                )
              )}
            </motion.div>
          </div>
        </motion.div>

        <Tetris
          ref={tetrisRef}
          isVisible={isTetrisVisible}
          onVisibilityChange={setIsTetrisVisible}
        />
      </div>

      {/* Modal for zoomed images */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-[200] hidden items-center justify-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(4px)",
        }}
        onClick={closeModal}
      >
        <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
          {/* Zoomed image */}
          <img
            alt="Portfolio item"
            className="max-w-full max-h-full object-contain cursor-pointer"
            style={{
              borderRadius: "16px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            }}
            onClick={closeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
