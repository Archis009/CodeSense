import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({ 
  className, 
  icon: Icon, 
  error, 
  ...props 
}, ref) => {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-slate-400" />
        </div>
      )}
      <input
        ref={ref}
        className={cn(
          'block w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm',
          'focus:border-primary focus:ring-primary focus:ring-1 sm:text-sm transition-all duration-200',
          'placeholder:text-slate-400 dark:placeholder:text-slate-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          Icon ? 'pl-10' : '',
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
