
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Smartphone, Mail } from 'lucide-react';
import Card from '../components/ui/Card';

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`
      w-11 h-6 flex items-center rounded-full p-1 transition-colors overflow-hidden
      ${checked ? 'bg-primary' : 'bg-slate-700'}
    `}
  >
    <motion.div
      animate={{ x: checked ? 20 : 0 }}
      className="bg-white w-4 h-4 rounded-full shadow-md"
    />
  </button>
);

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    marketingEmails: false,
    doNotDisturb: false,
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary w-fit">
          Notifications
        </h1>
        <p className="text-text-muted dark:text-slate-400">
          Configure how and when you want to be notified.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-surface dark:bg-dark-card border border-surface dark:border-slate-800">
          <h3 className="text-lg font-semibold text-text-main dark:text-white mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            General Alerts
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-main dark:text-white">Push Notifications</p>
                <p className="text-sm text-text-muted">Receive alerts on your device</p>
              </div>
              <Toggle 
                checked={settings.pushNotifications} 
                onChange={() => handleToggle('pushNotifications')} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-main dark:text-white">Email Notifications</p>
                <p className="text-sm text-text-muted">Receive analysis reports via email</p>
              </div>
              <Toggle 
                checked={settings.emailNotifications} 
                onChange={() => handleToggle('emailNotifications')} 
              />
            </div>
          </div>
        </Card>

        <Card className="bg-surface dark:bg-dark-card border border-surface dark:border-slate-800">
          <h3 className="text-lg font-semibold text-text-main dark:text-white mb-4 flex items-center gap-2">
            <Moon className="w-5 h-5 text-indigo-400" />
            Quiet Mode
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-text-main dark:text-white">Do Not Disturb</p>
              <p className="text-sm text-text-muted">Pause all notifications for 24 hours</p>
            </div>
            <Toggle 
              checked={settings.doNotDisturb} 
              onChange={() => handleToggle('doNotDisturb')} 
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotificationSettings;
