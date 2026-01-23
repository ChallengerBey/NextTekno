"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  onClick?: () => void;
}

const AnimatedCard = ({
  children,
  className = "",
  hover = true,
  delay = 0,
  onClick,
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      whileHover={hover ? {
        y: -5,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      } : {}}
      className={`bg-white rounded-xl shadow-sm transition-all duration-300 ${hover ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Hover Gradient Overlay */}
      {hover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-600/0 rounded-xl"
          whileHover={{
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)",
          }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
