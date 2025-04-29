import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showIcon?: boolean;
  showUnderline?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showIcon = true, 
  showUnderline = false,
  className = ''
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Font size mapping
  const fontSizeMap = {
    sm: 'text-3xl md:text-4xl',
    md: 'text-4xl md:text-5xl',
    lg: 'text-5xl md:text-6xl',
    xl: 'text-6xl md:text-7xl lg:text-8xl'
  };

  // Icon size mapping
  const iconSizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14'
  };

  // Underline height mapping
  const underlineHeightMap = {
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2',
    xl: 'h-2.5'
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {showIcon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <Sparkles className={`${iconSizeMap[size]} ${isDarkMode ? 'text-blue-400' : 'text-cyan-500'}`} />
        </motion.div>
      )}
      <div className="relative text-center">
        <h1 className={`${fontSizeMap[size]} font-extrabold tracking-tight font-serif italic ${
          isDarkMode 
            ? 'text-white' 
            : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent'
        }`}>
          exe.ai
        </h1>
        {showUnderline && (
          <motion.span 
            className={`absolute -bottom-1.5 left-0 right-0 mx-auto w-full ${underlineHeightMap[size]} rounded-full ${
              isDarkMode 
                ? 'bg-blue-500' 
                : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500'
            }`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        )}
      </div>
    </div>
  );
};

export default Logo; 