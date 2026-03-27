import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

export default function Card({ 
  children, 
  className = "", 
  hover = true,
  glass = false,
  onClick 
}: CardProps) {
  const baseClasses = `
    rounded-2xl p-6 transition-all duration-300 ease-in-out
    ${glass 
      ? 'bg-white/30 backdrop-blur-lg border border-white/20' 
      : 'bg-white border border-gray-200'
    }
    ${hover ? 'hover:scale-105 hover:shadow-xl cursor-pointer' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={baseClasses}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
