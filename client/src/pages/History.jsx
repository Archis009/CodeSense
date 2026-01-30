
import React from 'react';
import { motion } from 'framer-motion';
import { History as HistoryIcon, Search } from 'lucide-react';

const History = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary w-fit">
            Analysis History
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            View past analyses and reports.
          </p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search history..."
            className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-card-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all w-full md:w-64"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-12 text-center rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 shadow-sm"
      >
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
          <HistoryIcon className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
          No History Found
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          You haven't run any analyses yet. Start a new analysis to see it here.
        </p>
      </motion.div>
    </div>
  );
};

export default History;
