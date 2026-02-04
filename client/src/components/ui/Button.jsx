import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-primary hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30',
  secondary: 'bg-secondary hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/30',
  outline: 'border-2 border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary',
  ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-6 py-3.5 text-lg font-semibold',
  icon: 'p-2',
};

const Button = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  isLoading, 
  ...props 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative inline-flex items-center justify-center rounded-[10px] font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </motion.button>
  );
};

export default Button;
