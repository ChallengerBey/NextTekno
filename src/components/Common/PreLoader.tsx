"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PreLoader = () => {
  const [loadingStage, setLoadingStage] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    const stages = [20, 40, 60, 80, 100];
    const timers = stages.map((stage, index) => 
      setTimeout(() => setLoadingStage(stage), index * 200)
    );

    const completeTimer = setTimeout(() => setShowComplete(true), 1200);

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      clearTimeout(completeTimer);
    };
  }, []);

  const dots = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="fixed left-0 top-0 z-[999999] flex h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="relative">
        {/* Main Loader Animation */}
        <div className="relative w-32 h-32">
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-blue-200"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Middle Ring */}
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-purple-200 border-t-transparent border-r-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner Ring */}
          <motion.div
            className="absolute inset-4 rounded-full border-4 border-pink-200 border-b-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center Logo/Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
          </motion.div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {dots.map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.1,
              }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-gray-200 rounded-full mt-6 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${loadingStage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Loading Text */}
        <div className="text-center mt-4">
          <motion.p
            className="text-gray-600 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {loadingStage < 40 && "Yükleniyor..."}
            {loadingStage >= 40 && loadingStage < 70 && "Hazırlanıyor..."}
            {loadingStage >= 70 && loadingStage < 100 && "Neredeyse hazır..."}
            {loadingStage >= 100 && "Hazır! ✨"}
          </motion.p>
        </div>

        {/* Success Animation */}
        <AnimatePresence>
          {showComplete && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PreLoader;
