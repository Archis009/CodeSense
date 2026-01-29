import React from 'react';
import { ArrowRight, Code, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl -z-10" />
      
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 text-indigo-500 text-sm font-semibold mb-6">
            New: AI Security Scanning 2.0 🚀
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Code Reviews on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">Autopilot</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            Instantly analyze your code for bugs, security vulnerabilities, and performance issues with our advanced AI engine.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="group" onClick={() => window.location.href = '/login'}>
              Start Free Analysis
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.location.href = '/dashboard'}>
              View Demo
            </Button>
          </div>
        </motion.div>

        {/* Feature Icons */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: Zap, title: "Instant Analysis", desc: "Results in seconds, not minutes" },
            { icon: Shield, title: "Bank-Grade Security", desc: "Enterprise level vulnerability checks" },
            { icon: Code, title: "Multi-Language", desc: "Support for 20+ programming languages" }
          ].map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
              <feature.icon className="w-10 h-10 text-indigo-500 mb-4 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
