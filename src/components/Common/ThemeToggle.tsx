"use client";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-gray-200 dark:bg-gray-600 rounded-full p-1 transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Tema değiştir"
    >
      <motion.div
        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: theme === "dark" ? 28 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {theme === "dark" ? (
          <Moon size={12} className="text-gray-700" />
        ) : (
          <Sun size={12} className="text-yellow-500" />
        )}
      </motion.div>
      
      {/* Icons in background */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <Sun size={14} className="text-gray-400" />
        <Moon size={14} className="text-gray-400" />
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
