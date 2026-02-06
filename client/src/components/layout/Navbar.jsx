import React, { useState, useEffect } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Input from '../ui/Input';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const updateUser = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
      } else {
        setUser(null);
      }
    };

    updateUser();
    window.addEventListener('user-updated', updateUser);
    window.addEventListener('storage', updateUser);

    return () => {
      window.removeEventListener('user-updated', updateUser);
      window.removeEventListener('storage', updateUser);
    };
  }, []);
  return (
    <header className="h-16 px-6 bg-surface/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-accent dark:border-slate-800 flex items-center justify-end sticky top-0 z-10">

      <div className="flex items-center gap-4">
        {user && (
          <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/dashboard/settings/notifications')}>
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-dark-bg"></span>
          </Button>
        )}
        
        {user ? (
          <div className="flex items-center gap-3 pl-4 border-l border-accent dark:border-slate-700">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-text-main">{user.name}</p>
              <p className="text-xs text-text-muted">Pro Plan</p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/dashboard/settings/profile')}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px] cursor-pointer"
            >
              <div className="w-full h-full rounded-full bg-surface dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-text-muted dark:text-slate-300" />
                )}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="pl-4 border-l border-accent dark:border-slate-700 flex gap-2">
            <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/signup')}>Register</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
