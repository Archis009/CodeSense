import React, { useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-css';
import { Copy, Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const CodeBlock = ({ code, language = 'javascript', className }) => {
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative group rounded-xl overflow-hidden bg-[#1e1e1e]", className)}>
      <div className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          title="Copy code"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <Check className="w-4 h-4 text-green-400" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <Copy className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
      <pre className={cn("!m-0 !rounded-xl !bg-[#1e1e1e] scrollbar-hide", `language-${language}`)}>
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
