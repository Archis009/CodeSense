import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Lock, ArrowRight, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const Login = () => {
  return (
    <div className="min-h-screen flex bg-light-bg dark:bg-dark-bg text-slate-900 dark:text-slate-100">
      {/* Left Side - Form */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2 p-8 flex flex-col justify-center"
      >
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl">CodeSense</span>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full gap-2 justify-center">
              <Github className="w-5 h-5" />
              Continue with GitHub
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-light-bg dark:bg-dark-bg px-2 text-slate-500">
                  Or continue with email
                </span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input 
                icon={Mail} 
                type="email" 
                placeholder="name@example.com" 
                className="h-12"
              />
              <div className="space-y-1">
                <Input 
                  icon={Lock} 
                  type="password" 
                  placeholder="Password" 
                  className="h-12"
                />
                <div className="flex justify-between items-center text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-primary hover:text-indigo-500 font-medium">Forgot password?</a>
                </div>
              </div>

              <Button className="w-full h-12 text-lg">
                Sign In
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-semibold hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-cyan-600/20" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-900 to-transparent z-10" />
        
        {/* Animated Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        />

        <div className="relative z-20 max-w-lg">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
            <div className="space-y-4">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex gap-2">
                  <span className="text-purple-400">const</span>
                  <span className="text-blue-400">analyzeCode</span>
                  <span className="text-white">=</span>
                  <span className="text-yellow-300">async</span>
                  <span className="text-white">()</span>
                  <span className="text-purple-400">=&gt;</span>
                  <span className="text-white">{`{`}</span>
                </div>
                <div className="pl-4">
                  <span className="text-purple-400">const</span>
                  <span className="text-white">issues</span>
                  <span className="text-white">=</span>
                  <span className="text-purple-400">await</span>
                  <span className="text-white">ai.scan(project);</span>
                </div>
                <div className="pl-4">
                  <span className="text-purple-400">return</span>
                  <span className="text-white">issues.fix();</span>
                </div>
                <div className="text-white">{`}`}</div>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>Analysis Complete (100%)</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
