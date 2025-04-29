import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

// For realistic terminal look
const terminalData = [
    { type: 'command', text: '> ./analyze_performance.sh', delay: 300 },
    { type: 'log', text: 'Starting performance analysis...', delay: 225 },
    { type: 'log', text: 'Collecting backend metrics...', delay: 300 },
    { type: 'calculation', text: 'Calculating average response time...', delay: 375 },
    { type: 'metric', text: 'Average Response Time: 235ms', delay: 225 },
    { type: 'calculation', text: 'Analyzing throughput patterns...', delay: 375 },
    { type: 'metric', text: 'Throughput: 320 req/s', delay: 225 },
    { type: 'calculation', text: 'Checking CPU utilization...', delay: 300 },
    { type: 'metric', text: 'CPU Usage: 45%', delay: 225 },
    { type: 'calculation', text: 'Checking memory consumption...', delay: 300 },
    { type: 'metric', text: 'Memory Usage: 75%', delay: 225 },
    { type: 'calculation', text: 'Analyzing error logs...', delay: 375 },
    { type: 'metric', text: 'Error Rate: 0.5%', delay: 225 },
    { type: 'calculation', text: 'Checking database connection pool...', delay: 300 },
    { type: 'metric', text: 'DB Connection Pool: 85% utilized', delay: 225 },
    { type: 'calculation', text: 'Measuring cache hit ratio...', delay: 300 },
    { type: 'metric', text: 'Cache Hit Ratio: 92%', delay: 225 },
    { type: 'calculation', text: 'Analyzing concurrent users impact...', delay: 375 },
    { type: 'metric', text: 'Concurrent Users: 1000 active sessions', delay: 225 },
    { type: 'log', text: 'Performance analysis complete.', delay: 300 },
    { type: 'calculation', text: 'Calculating final performance score...', delay: 450 },
    { type: 'log', text: 'System health status: EXCELLENT', delay: 300 },
    { type: 'command', text: '> _', delay: 150 }
];

const VisualizationPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [displayedLines, setDisplayedLines] = useState<any[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showScoreOverlay, setShowScoreOverlay] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Load terminal data sequentially with typing effect
  useEffect(() => {
    if (currentLineIndex < terminalData.length) {
      const baseDelay = terminalData[currentLineIndex].delay;
      // Reduce the fixed delay to make animation faster
      const delay = baseDelay + Math.random() * 50 + 100;
      
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, terminalData[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
        
        // Show score overlay when the score is displayed
        if (terminalData[currentLineIndex].type === 'score') {
          // Add extra delay for the score display
          setTimeout(() => {
            setShowScoreOverlay(true);
          }, 300);
        }
        
        // Auto-scroll to bottom of terminal
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex]);

  // Handle video ending
  const handleVideoEnded = () => {
    setVideoEnded(true);
    
    // Display the score overlay after a short delay when the video ends
    setTimeout(() => {
      setShowScoreOverlay(true);
    }, 500);
  };

  return (
    <div className={`h-screen overflow-hidden ${theme === 'light' ? 'bg-gradient-to-br from-blue-50/80 via-cyan-50/80 to-slate-50/80' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50'} text-gray-700 flex flex-col`}>
      {/* Header */}
      <div className={`border-b border-cyan-200 py-2 px-4 flex items-center justify-between ${theme === 'light' ? 'bg-gradient-to-r from-blue-50/90 to-cyan-50/90' : 'bg-gradient-to-r from-blue-50 to-cyan-50'}`}>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 rounded-full hover:bg-white/60 transition-colors"
            onClick={() => navigate('/evaluation-results')}
          >
            <ArrowLeft size={18} className="text-blue-600" />
          </motion.button>
          <h1 className="text-lg font-bold text-blue-700">System Performance Visualization</h1>
        </div>
        <div className="flex items-center gap-3">
          <Terminal size={16} className="text-cyan-600" />
          <span className="text-gray-700 text-xs mr-4">Performance Metrics</span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/suggester')}
            className={`flex items-center gap-1.5 ${theme === 'light' ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500' : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600'} text-white text-xs px-3 py-1.5 rounded-lg shadow-sm`}
          >
            <TrendingUp size={14} />
            View Recommendations
          </motion.button>
        </div>
      </div>

      {/* Content - fills remaining height */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Left side - Video player */}
        <div className={`relative rounded-lg overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-white/90'} border border-blue-100 flex items-center justify-center shadow-md`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-cyan-50/30 to-slate-50/30"></div>
          <video
            className="max-h-full max-w-full object-contain relative z-10"
            style={{ height: 'calc(100vh - 5rem)' }}
            src="./src/videos/Frontend_6.mp4"
            autoPlay
            muted
            onEnded={handleVideoEnded}
          >
            Your browser does not support the video tag.
          </video>
          {videoEnded && !showScoreOverlay && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center flex-col z-20">
              <h3 className="text-lg font-bold mb-1 text-blue-700">Analysis Complete</h3>
              <p className="text-cyan-600 text-sm mb-2">Processing performance data...</p>
            </div>
          )}
          
          {/* Score overlay */}
          {showScoreOverlay && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-white/75 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className={`${theme === 'light' ? 'bg-white' : 'bg-white/90'} border-2 border-cyan-200 rounded-lg p-5 flex flex-col items-center shadow-lg`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className="text-blue-700 text-lg font-bold mb-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  Performance Score
                </motion.div>
                <motion.div 
                  className={`${theme === 'light' ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500' : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600'} bg-clip-text text-transparent text-5xl font-bold flex items-center justify-center mb-1`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  <span className="text-gray-900">0.</span>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.2 }}
                  >
                    9
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.2 }}
                  >
                    6
                  </motion.span>
                </motion.div>
                <motion.div 
                  className={`${theme === 'light' ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500' : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600'} text-white text-xs mt-2 px-4 py-1 rounded-full`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.3 }}
                >
                  EXCEPTIONAL
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Right side - Terminal */}
        <div className={`relative rounded-lg overflow-hidden ${theme === 'light' ? 'bg-gray-800' : 'bg-gray-900'} border ${theme === 'light' ? 'border-gray-700' : 'border-gray-800'} flex flex-col shadow-xl`}>
          <div className={`${theme === 'light' ? 'bg-gray-700' : 'bg-gray-800'} px-3 py-1 flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-gray-400" />
              <span className="text-xs font-mono text-gray-400">backend-metrics-terminal</span>
            </div>
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
          </div>
          
          <div 
            ref={terminalRef}
            className="p-3 font-mono text-xs flex-1 overflow-y-auto"
            style={{ height: 'calc(100vh - 5.5rem)' }}
          >
            {displayedLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`mb-1.5 ${
                  line.type === 'command' ? `${theme === 'light' ? 'text-green-300' : 'text-green-400'}` :
                  line.type === 'log' ? 'text-gray-400' :
                  line.type === 'calculation' ? `${theme === 'light' ? 'text-blue-300' : 'text-blue-400'}` :
                  line.type === 'metric' ? `${theme === 'light' ? 'text-yellow-300 font-bold' : 'text-yellow-400 font-bold'}` :
                  line.type === 'score' ? `${theme === 'light' ? 'text-green-200 font-semibold text-base' : 'text-green-300 font-semibold text-base'}` : ''
                }`}
              >
                {line.text}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export {VisualizationPage};