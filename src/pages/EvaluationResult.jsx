import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FileDown, ChevronLeft, ArrowRight, BarChart2, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample data for the 15 result blocks
const evaluationResults = [
  {
    id: 1,
    backend: 2,
    frontend: 5,
    backendScore: 96.9,
    frontendScore: 95.6,
    analysis: "Robust backend performance is demonstrated by rapid response times and efficient data processing. The frontend UI shows excellent visual consistency and responsive design adaptability across devices."
  },
  {
    id: 2,
    backend: 1,
    frontend: 3,
    backendScore: 94.2,
    frontendScore: 92.8,
    analysis: "The authentication service performs with high reliability. UI animations are smooth with consistent frame rates, providing an engaging user experience."
  },
  {
    id: 3,
    backend: 3,
    frontend: 1,
    backendScore: 91.7,
    frontendScore: 89.4,
    analysis: "Data processing service shows excellent throughput with minimal latency. Frontend typography is highly readable with excellent contrast ratios."
  },
  {
    id: 4,
    backend: 2,
    frontend: 4,
    backendScore: 93.5,
    frontendScore: 90.2,
    analysis: "Backend cache hit ratio optimization results in faster data retrieval. Frontend image quality is optimized for both performance and visual clarity."
  },
  {
    id: 5,
    backend: 1,
    frontend: 2,
    backendScore: 97.2,
    frontendScore: 88.9,
    analysis: "API gateway shows excellent request routing efficiency. The pixel precision of UI elements meets design specifications with minimal variance."
  },
  {
    id: 6,
    backend: 3,
    frontend: 3,
    backendScore: 89.8,
    frontendScore: 93.7,
    analysis: "Backend concurrency handling shows good scalability under load. Frontend color contrast ratios exceed accessibility standards across all UI elements."
  },
  {
    id: 7,
    backend: 1,
    frontend: 1,
    backendScore: 95.3,
    frontendScore: 96.1,
    analysis: "Authentication service demonstrates excellent security measures. Frontend visual consistency creates a cohesive experience across all application modules."
  },
  {
    id: 8,
    backend: 2,
    frontend: 2,
    backendScore: 92.6,
    frontendScore: 91.9,
    analysis: "Backend memory usage is optimized for resource efficiency. White space balance in the UI creates clear visual hierarchy and comfortable reading experience."
  },
  {
    id: 9,
    backend: 3,
    frontend: 5,
    backendScore: 90.4,
    frontendScore: 94.5,
    analysis: "Data processing service handles complex transformations efficiently. Dark mode implementation shows excellent contrast and readability in all lighting conditions."
  },
  {
    id: 10,
    backend: 1,
    frontend: 4,
    backendScore: 98.1,
    frontendScore: 90.8,
    analysis: "API gateway demonstrates excellent error handling and recovery. Button and link designs provide clear affordances with appropriate hover states."
  },
  {
    id: 11,
    backend: 2,
    frontend: 1,
    backendScore: 93.9,
    frontendScore: 92.3,
    analysis: "Backend CPU utilization remains stable even under heavy workloads. Frontend typography selection enhances readability across different content types."
  },
  {
    id: 12,
    backend: 3,
    frontend: 4,
    backendScore: 91.2,
    frontendScore: 89.7,
    analysis: "Data processing service maintains high availability with minimal downtime. Responsive design adapts seamlessly across device sizes maintaining functional integrity."
  },
  {
    id: 13,
    backend: 1,
    frontend: 5,
    backendScore: 96.4,
    frontendScore: 93.2,
    analysis: "Authentication service handles concurrent authentication requests efficiently. Theme support implementation allows seamless switching with no visual glitches."
  },
  {
    id: 14,
    backend: 2,
    frontend: 3,
    backendScore: 94.7,
    frontendScore: 95.0,
    analysis: "Backend queue management prevents bottlenecks during traffic spikes. Animation timing and easing functions create a polished, professional feel."
  },
  {
    id: 15,
    backend: 3,
    frontend: 2,
    backendScore: 92.8,
    frontendScore: 91.5,
    analysis: "Data processing service shows consistent performance across varied data types. UI component spacing maintains visual harmony throughout the application."
  }
];

const EvaluationResult = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  // Sort the evaluation results by total score (backend + frontend)
  const sortedResults = [...evaluationResults].sort(
    (a, b) => (b.backendScore + b.frontendScore) - (a.backendScore + a.frontendScore)
  );

  // Simulate loading delay
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    const timer = setTimeout(() => {
      setLoading(false);
      clearInterval(progressInterval);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  const handleDownload = () => {
    console.log("Downloading evaluation results...");
    // This would be implemented to actually download results as PDF or JSON
    alert("Download started! (This is just a demo)");
  };

  const handleVisualize = () => {
    navigate('/visualization');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen w-full ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'
      }`}>
        <div className="flex flex-col items-center max-w-md mx-auto p-8 rounded-xl shadow-lg">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-900"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{progress}%</span>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-4">Loading evaluation results...</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Analyzing system performance</p>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate average scores
  const avgBackendScore = evaluationResults.reduce((sum, result) => sum + result.backendScore, 0) / evaluationResults.length;
  const avgFrontendScore = evaluationResults.reduce((sum, result) => sum + result.frontendScore, 0) / evaluationResults.length;
  const overallScore = (avgBackendScore + avgFrontendScore) / 2;

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'
    }`}>
      {/* Sticky header */}
      <header className={`sticky top-0 z-10 shadow-sm py-4 ${
        isDarkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-white border-b border-gray-200'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-1.5 rounded-full ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              } transition-colors`}
              onClick={() => navigate('/')}
            >
              <ChevronLeft size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
            </motion.button>
            <div>
              <h1 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-blue-700'
              }`}>Evaluation Results</h1>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Performance analysis of your system</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVisualize}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              } transition-colors shadow-sm`}
            >
              <BarChart2 size={18} />
              <span>Visualize</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-blue-700 text-white hover:bg-blue-600' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-colors shadow-sm`}
            >
              <FileDown size={18} />
              <span>Download</span>
            </motion.button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Summary statistics */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`mb-8 p-6 rounded-xl ${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
          }`}
        >
          <h2 className={`text-xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>Performance Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Backend Average</h3>
              <div className="flex items-center">
                <span className={`text-3xl font-bold ${
                  avgBackendScore >= 95 ? 'text-emerald-500' : avgBackendScore >= 85 ? 'text-amber-500' : 'text-red-500'
                }`}>{avgBackendScore.toFixed(1)}</span>
                <span className="text-xs ml-1 text-gray-400 self-end mb-1">/100</span>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Frontend Average</h3>
              <div className="flex items-center">
                <span className={`text-3xl font-bold ${
                  avgFrontendScore >= 95 ? 'text-emerald-500' : avgFrontendScore >= 85 ? 'text-amber-500' : 'text-red-500'
                }`}>{avgFrontendScore.toFixed(1)}</span>
                <span className="text-xs ml-1 text-gray-400 self-end mb-1">/100</span>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Overall Performance</h3>
              <div className="flex items-center">
                <span className={`text-3xl font-bold ${
                  overallScore >= 95 ? 'text-emerald-500' : overallScore >= 85 ? 'text-amber-500' : 'text-red-500'
                }`}>{overallScore.toFixed(1)}</span>
                <span className="text-xs ml-1 text-gray-400 self-end mb-1">/100</span>
              </div>
              <div className="mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  overallScore >= 95 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                    : overallScore >= 85 
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {overallScore >= 95 ? 'Excellent' : overallScore >= 85 ? 'Good' : 'Needs Improvement'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>Detailed Results</h2>
          
          <div className={`px-3 py-1.5 rounded-lg text-sm ${
            isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            {evaluationResults.length} combinations
          </div>
        </div>

        {/* Best combination highlighted */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className={`relative rounded-lg overflow-hidden border-2 ${
            isDarkMode 
              ? 'bg-blue-900/20 border-blue-600' 
              : 'bg-blue-50 border-blue-400'
          }`}>
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"></div>
            
            <div className="p-4 flex items-center">
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-blue-600' : 'bg-blue-600'
              }`}>
                <span className="text-white text-sm font-bold">BEST</span>
              </div>
              
              <div className="flex-grow ml-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center">
                      <h3 className={`text-lg font-bold ${
                        isDarkMode ? 'text-white' : 'text-blue-800'
                      }`}>
                        Best Combination
                      </h3>
                      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-600/10 ${
                        isDarkMode ? 'text-blue-300' : 'text-blue-700'
                      }`}>
                        Backend {sortedResults[0].backend} + Frontend {sortedResults[0].frontend}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">Backend:</span>
                        <span className="text-sm font-bold text-emerald-500">{sortedResults[0].backendScore.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">Frontend:</span>
                        <span className="text-sm font-bold text-emerald-500">{sortedResults[0].frontendScore.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">Total:</span>
                        <span className="text-sm font-bold text-emerald-500">
                          {((sortedResults[0].backendScore + sortedResults[0].frontendScore) / 2).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 ${
                      isDarkMode 
                        ? 'bg-blue-700 text-white hover:bg-blue-600' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    } transition-colors shadow-sm`}
                    onClick={handleVisualize}
                  >
                    <BarChart2 className="h-4 w-4" />
                    <span>Visualize</span>
                  </motion.button>
                </div>
                
                <div className="mt-3">
                  <p className={`${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  } text-sm`}>
                    {sortedResults[0].analysis}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <h2 className={`text-xl font-bold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>Other Combinations</h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sortedResults.slice(1).map((result, index) => (
            <motion.div 
              key={result.id}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className={`rounded-lg shadow-sm overflow-hidden border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } hover:shadow-md transition-all`}
            >
              <div className={`p-3 border-b ${
                isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
              }`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${
                      isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      #{index + 2}
                    </span>
                    <div>
                      <h2 className={`text-base font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>Backend {result.backend} + Frontend {result.frontend}</h2>
                    </div>
                  </div>
                  
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    (result.backendScore + result.frontendScore) / 2 >= 95
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : (result.backendScore + result.frontendScore) / 2 >= 90
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {((result.backendScore + result.frontendScore) / 2).toFixed(1)}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-4 space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-xs font-medium ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>Backend Score</span>
                      <span className={`text-sm font-bold ${
                        result.backendScore >= 95 
                          ? 'text-emerald-500' 
                          : result.backendScore >= 85 
                            ? 'text-amber-500' 
                            : 'text-red-500'
                      }`}>{result.backendScore.toFixed(1)}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${result.backendScore}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full ${
                          result.backendScore >= 95 
                          ? 'bg-emerald-500' 
                          : result.backendScore >= 85 
                            ? 'bg-amber-500' 
                            : 'bg-red-500'
                        }`}
                      ></motion.div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-xs font-medium ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>Frontend Score</span>
                      <span className={`text-sm font-bold ${
                        result.frontendScore >= 95 
                          ? 'text-emerald-500' 
                          : result.frontendScore >= 85 
                            ? 'text-amber-500' 
                            : 'text-red-500'
                      }`}>{result.frontendScore.toFixed(1)}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${result.frontendScore}%` }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className={`h-full rounded-full ${
                          result.frontendScore >= 95 
                          ? 'bg-emerald-500' 
                          : result.frontendScore >= 85 
                            ? 'bg-amber-500' 
                            : 'bg-red-500'
                        }`}
                      ></motion.div>
                    </div>
                  </div>
                </div>

                <p className={`text-xs leading-relaxed ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                } line-clamp-3`}>
                  {result.analysis}
                </p>
                
                <div className="mt-3 flex justify-end">
                  <motion.button
                    whileHover={{ x: 3 }}
                    className={`text-xs font-medium flex items-center gap-1 ${
                      isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    View details
                    <ArrowRight size={12} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default EvaluationResult; 