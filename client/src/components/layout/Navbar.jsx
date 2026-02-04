import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Input from '../ui/Input';

const Navbar = () => {
  return (
    <header className="h-16 px-6 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-10">
      {/* Search */}
      <div className="w-96 hidden md:block">
        <Input 
          icon={Search} 
          placeholder="Search projects, analysis, or files..." 
          className="bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-dark-card"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-dark-bg"></span>
        </Button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{JSON.parse(localStorage.getItem('user'))?.name || 'User'}</p>
            <p className="text-xs text-slate-500">Pro Plan</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px] cursor-pointer"
          >
            <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <User className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
