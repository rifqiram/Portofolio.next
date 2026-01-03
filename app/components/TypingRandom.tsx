"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
const word = ["RIFQI RAMADHAN", "BEGGINER WEB DEVELOPER", "FRONTEND DEVELOPER"];

export default function TypingRandom() {
    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [cycle, setCycle] = useState(0);

    const currentWord = word[index];
    useEffect(() => {
        let iteration = 0;
        let interval: NodeJS.Timeout | null = null;
        
        if (isVisible) {
          interval = setInterval(() => {
            setDisplayText(
              currentWord
                .split("")
                .map((char, i) => {
                    if(char === " ") return " ";
                  if (i < iteration) return currentWord[i];
                  return characters[Math.floor(Math.random() * characters.length)];
                })
                .join("")
            );
        
            if (iteration >= currentWord.length) {
              if (interval) clearInterval(interval);
            } 
            iteration += 1 / 3;
          }, 30);
        }

        return () => interval && clearInterval(interval);
    }, [isVisible, currentWord, cycle]);

    useEffect(() => {
        const timer = setInterval(() => {
            setIsVisible(false); 
      
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % word.length);
                setCycle((prev) => prev + 1); 
                setIsVisible(true);
            }, 1000); 
        }, 7000); 
        
        return () => clearInterval(timer);
    }, []);

    return (
      <div className="inline-block" style={{ minWidth: '300px'}}>
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)", y: -10 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="font-mono inline-block text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
              {displayText}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    );
}