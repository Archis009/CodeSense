
import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Shield, User } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary w-fit">
          Settings
        </h1>
        <p className="text-text-muted dark:text-slate-400">
          Manage your account preferences and application settings.
        </p>
      </div>

      <div className="grid gap-6">
        {[
          { icon: User, label: 'Profile Settings', desc: 'Manage your personal information' },
          { icon: Bell, label: 'Notifications', desc: 'Configure how you want to be notified' },
          { icon: Shield, label: 'Security', desc: 'Password and authentication settings' },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 flex items-center gap-4 rounded-xl bg-surface dark:bg-dark-card border border-surface dark:border-slate-800 shadow-sm hover:border-primary/50 transition-colors cursor-pointer group"
            onClick={() => {
              if (item.label === 'Profile Settings') {
                navigate('/dashboard/settings/profile');
              }
            }}
          >
            <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-text-main dark:text-white">
                {item.label}
              </h3>
              <p className="text-sm text-text-muted dark:text-slate-400">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
