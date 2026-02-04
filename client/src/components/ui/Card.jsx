import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

const Card = ({ className, children, hoverEffect = true, ...props }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5 } : {}}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(
        'bg-surface dark:bg-dark-card backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6',
        'hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 transition-shadow duration-300',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
