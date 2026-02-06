import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
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
import { authService } from '../../services/api';

const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const links = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: PlusCircle, label: 'New Analysis', path: '/dashboard/new' },
    { icon: History, label: 'History', path: '/dashboard/history' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <motion.div 
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      className="relative h-screen bg-surface dark:bg-dark-bg border-r border-accent dark:border-slate-800 flex flex-col z-20"
    >
      {/* Header */}
      <div className="h-16 flex items-center px-4 border-b border-accent dark:border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => window.location.href = '/dashboard'}>
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
                ? "bg-primary/20 text-primary-foreground font-semibold" 
                : "text-text-main dark:text-slate-400 hover:bg-background/10 dark:hover:bg-slate-800"
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
        
        {/* User Guide - Moved inside nav/below links to stay close */}
        {!collapsed && (
          <div className="pt-4 px-2">
            <div className="p-3 bg-indigo-50/50 dark:bg-slate-800/50 rounded-xl border border-indigo-100 dark:border-slate-700">
              <p className="text-xs font-semibold text-primary mb-2">🚀 How to Use</p>
              <ul className="text-[10px] text-text-muted dark:text-slate-400 space-y-1.5 list-disc pl-3">
                <li>Click <strong>New Analysis</strong> to start</li>
                <li>Paste code for better analysis</li>
                <li>View report in <strong>History</strong></li>
                <li>Update profile in <strong>Settings</strong></li>
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-accent dark:border-slate-800 space-y-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-3 py-2 text-text-main dark:text-slate-400 hover:bg-background/10 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5 mx-auto" /> : <ChevronLeft className="w-5 h-5" />}
          {!collapsed && <span>Collapse</span>}
        </button>
        
        <button 
          onClick={() => authService.logout()}
          className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors"
        >
          <LogOut className={cn("w-5 h-5", collapsed ? "mx-auto" : "")} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
