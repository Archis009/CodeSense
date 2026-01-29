import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Settings, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  Code2
} from 'lucide-react';
import { cn } from '../../utils/cn';

const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const links = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: PlusCircle, label: 'New Analysis', path: '/dashboard/new' },
    { icon: History, label: 'History', path: '/dashboard/history' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <motion.div 
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      className="relative h-screen bg-white dark:bg-dark-bg border-r border-slate-200 dark:border-slate-800 flex flex-col z-20"
    >
      {/* Header */}
      <div className="h-16 flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="min-w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <motion.span 
            animate={{ opacity: collapsed ? 0 : 1 }}
            className={cn("font-bold text-xl whitespace-nowrap", collapsed && "hidden")}
          >
            CodeSense
          </motion.span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            )}
          >
            <link.icon className={cn("w-5 h-5 min-w-5", collapsed ? "mx-auto" : "")} />
            {!collapsed && (
              <span className="font-medium whitespace-nowrap overflow-hidden">
                {link.label}
              </span>
            )}
            
            {/* Tooltip for collapsed state */}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                {link.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5 mx-auto" /> : <ChevronLeft className="w-5 h-5" />}
          {!collapsed && <span>Collapse</span>}
        </button>
        
        <button className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors">
          <LogOut className={cn("w-5 h-5", collapsed ? "mx-auto" : "")} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
