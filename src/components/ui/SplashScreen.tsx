"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onFinish, 600);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  const text = "Not A Virus"; // second word (animated)
  const letters = text.split("");

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] text-white overflow-hidden z-[9999]"
        >
          {/* Logo with animated second word */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex text-5xl md:text-6xl font-light tracking-wide"
          >
            <span className="text-gray-400 mr-3">404</span>
            <motion.span className="flex">
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 0 }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-sm md:text-base text-gray-500 mt-4 tracking-wider"
          >
            AI Clinical Copilot
          </motion.p>

          {/* Soft background glow */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-[180px] h-[180px] bg-cyan-400 blur-[100px] rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
