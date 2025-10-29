"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
const people = [
  {
    id: 1,
    name: "Iqbal Hasan",
    role: "Team Leader & Developer",
    email: "iamekbal75@gmail.com",
    profile:
      "iqbal.jpg",
  },
  {
    id: 2,
    name: "Abdul Alim ",
    role: "Member & Developer",
    email: "newton@example.com",
    profile:
      "alimvai.jpg",
  },
  {
    id: 3,
    name: "Salman Ahmed",
    role: "Member & Developer",
    email: "curie@example.com",
    profile:
      "salman.jpg",
  },
  
  {
    id: 8,
    name: "Rakib Hasan",
    role: "Member & Developer",
    email: "feynman@example.com",
    profile:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiz7DeuUmHN7TiT3xf7cV7UPBJNDtEvjNZcgMmNElTmOJYaec6zQI0UiLU04jZP6hqkeLcrnaC5NP4WC_zRQzP3_QhLumNxyzPOsC-WEmWQyYsadq1Eg_V_jEjDfCdddeQgJjY_OOB1KLMj6o2ShA6ycHwM91I430Yr9tkYTn6759jDmcGAsONOACbi/w1200-h630-p-k-no-nu/richard%20feynman%20quotes%20atheism%20religion%20science.png",
  },
];
const safeImage = (e) => {
  const target = e.target;
  target.src = "https://placehold.co/100x100/E0E7FF/4338CA?text=Error";
};
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const checkScreenSize = () => setIsMobile(window.innerWidth < breakpoint);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);
  return isMobile;
};
export default function OrbitCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isMobile = useIsMobile();
  const containerRadius = isMobile ? 130 : 200;
  const profileSize = isMobile ? 60 : 80;
  const containerSize = containerRadius * 2 + 100;
  const getRotation = React.useCallback(
    (index) => (index - activeIndex) * (360 / people.length),
    [activeIndex]
  );
  const next = () => setActiveIndex((i) => (i + 1) % people.length);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + people.length) % people.length);
  const handleProfileClick = React.useCallback(
    (index) => {
      if (index === activeIndex) return;
      setActiveIndex(index);
    },
    [activeIndex]
  );
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") prev();
      else if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <div className="flex flex-col items-center p-4 relative  transition-colors duration-300">
      <div
        className="relative flex items-center justify-center"
        style={{
          width: containerSize,
          height: containerSize,
        }}
      >
        {}
        <div
          className="absolute rounded-full border border-gray-300 dark:border-gray-700"
          style={{
            width: containerRadius * 2,
            height: containerRadius * 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {}
        <AnimatePresence mode="wait">
          <motion.div
            key={people[activeIndex].id}
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="z-10  backdrop-blur-sm shadow-xl dark:shadow-2xl dark:shadow-gray-900/50 rounded-xl p-3 md:p-4 w-48 md:w-52 text-center border "
          >
            <motion.img
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.3,
                delay: 0.1,
              }}
              src={people[activeIndex].profile}
              alt={people[activeIndex].name}
              onError={safeImage}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto -mt-10 md:-mt-12 border-4 border-white dark:border-black object-cover shadow-md"
            />
            <motion.div
              initial={{
                opacity: 0,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: 0.15,
              }}
            >
              <h2 className="mt-2 text-base md:text-lg font-bold ">
                {people[activeIndex].name}
              </h2>
              <div className="flex items-center justify-center text-xs md:text-sm text-gray-600  mt-1">
                <Briefcase size={12} className="mr-1" />
                <span className="truncate">{people[activeIndex].role}</span>
              </div>
              <div className="flex items-center justify-center text-xs text-gray-500  mt-0.5">
                <Mail size={12} className="mr-1" />
                <span className="truncate">{people[activeIndex].email}</span>
              </div>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                delay: 0.2,
              }}
              className="flex justify-center items-center mt-3 space-x-2"
            >
              <button
                onClick={prev}
                className="p-1.5 rounded-full bg-[#FF7B6B] "
              >
                <ChevronLeft
                  size={16}
                  className="text-gray-700 dark:text-gray-300"
                />
              </button>
              <button className="px-4 py-1 text-sm rounded-full bg-[#FF7B6B] text-white">
                Connect
              </button>
              <button
                onClick={next}
                className="p-1.5 rounded-full bg-[#FF7B6B]"
              >
                <ChevronRight
                  size={16}
                  className="text-gray-700 dark:text-gray-300"
                />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {}
        {people.map((p, i) => {
          const rotation = getRotation(i);
          return (
            <motion.div
              key={p.id}
              animate={{
                transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
              }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              style={{
                width: profileSize,
                height: profileSize,
                position: "absolute",
                top: `calc(50% - ${profileSize / 2}px)`,
                left: `calc(50% - ${profileSize / 2}px)`,
              }}
            >
              {}
              <motion.div
                animate={{
                  rotate: -rotation,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="w-full h-full"
              >
                <motion.img
                  src={p.profile}
                  alt={p.name}
                  onError={safeImage}
                  onClick={() => handleProfileClick(i)}
                  whileHover={{
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className={`w-full h-full object-cover rounded-full cursor-pointer transition-all duration-300 ${
                    i === activeIndex
                      ? "border-4 border-indigo-500 dark:border-indigo-400 shadow-lg"
                      : "border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500"
                  }`}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
