import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Rocket, ArrowRight, ChevronRight, Star, ArrowLeft, Filter, Zap, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

type Suggestion = {
  title: string;
  benefit: string;
  reason: string;
  category: 'performance' | 'marketing' | 'product' | 'tech';
  impact: 'high' | 'medium' | 'low';
};

// Enhanced suggestions with categories and impact levels
const suggestions: Suggestion[] = [
  {
    title: 'Other Accessories Based on YouTube Trends',
    benefit: 'Identify popular accessories to increase engagement and sales.',
    reason: 'Competitors like Speed and KSI are doing this effectively.',
    category: 'product',
    impact: 'high'
  },
  {
    title: 'Intelligent Chatbot for Personalized Engagement',
    benefit: 'Real-time, tailored assistance to enhance satisfaction and sales.',
    reason: 'AI chatbots offer 24/7 interaction and operational efficiency.',
    category: 'tech',
    impact: 'medium'
  },
  {
    title: 'Switch to AWS for Cost Optimization',
    benefit: 'Reduced costs and better scalability.',
    reason: 'AWS offers flexible pricing and high performance.',
    category: 'tech',
    impact: 'high'
  },
  {
    title: 'Launch an SEO Marketing Campaign',
    benefit: 'Improved search rankings, traffic, and reach.',
    reason: 'SEO boosts visibility and organic traffic.',
    category: 'marketing',
    impact: 'high'
  },
  {
    title: 'AI-Powered Product Recommendation Engine',
    benefit: 'Increases conversions with personalized product suggestions.',
    reason: 'AI analyzes behavior to enhance customer experience.',
    category: 'tech',
    impact: 'medium'
  },
  {
    title: 'Introduce Ripped Jeans as a New Product Line',
    benefit: 'Tap into current fashion trends for Gen Z appeal.',
    reason: 'Ripped jeans are trending among youth.',
    category: 'product',
    impact: 'medium'
  },
  {
    title: 'Integrate Reviews & UGC for Social Proof',
    benefit: 'Boosts trust and conversion through customer authenticity.',
    reason: 'UGC builds credibility and trust.',
    category: 'marketing',
    impact: 'medium'
  },
  {
    title: 'AR Try-On and Product Preview',
    benefit: 'Enhances visualization and reduces returns.',
    reason: 'AR lets users interact with products virtually.',
    category: 'tech',
    impact: 'high'
  },
  {
    title: 'Seasonal and Themed Product Launches',
    benefit: 'Drives engagement and revenue during key times.',
    reason: 'Seasonal trends align with consumer buying habits.',
    category: 'product',
    impact: 'medium'
  },
  {
    title: 'Monthly Cooking Subscription Box',
    benefit: 'Loyalty, recurring revenue, and branded experience.',
    reason: 'Subscriptions increase retention and excitement.',
    category: 'product',
    impact: 'high'
  },
];

// Icons for categories
const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'tech':
      return <Zap className="w-4 h-4" />;
    case 'marketing':
      return <TrendingUp className="w-4 h-4" />;
    case 'product':
      return <Star className="w-4 h-4" />;
    case 'performance':
      return <Rocket className="w-4 h-4" />;
    default:
      return <ChevronRight className="w-4 h-4" />;
  }
};

export const SuggestorPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [visibleSuggestions, setVisibleSuggestions] = useState<Suggestion[]>(suggestions.slice(0, 6));

  // Filter suggestions based on active filter
  useEffect(() => {
    if (!activeFilter) {
      setVisibleSuggestions(suggestions.slice(0, 6));
    } else {
      setVisibleSuggestions(
        suggestions.filter(s => 
          activeFilter === 'impact-high' 
            ? s.impact === 'high' 
            : activeFilter === s.category
        ).slice(0, 6)
      );
    }
  }, [activeFilter]);

  // Refresh animation and functionality
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Shuffle and get new suggestions
      const shuffled = [...suggestions].sort(() => 0.5 - Math.random());
      setVisibleSuggestions(shuffled.slice(0, 6));
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className={`min-h-screen ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50' 
        : 'bg-[#343541]'
    }`}>
      {/* Header */}
      <div className={`${
        theme === 'light'
          ? 'bg-white/80 backdrop-blur-sm border-b border-blue-100'
          : 'bg-[#40414F] border-b border-gray-700'
      } py-4 px-6 shadow-sm`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-1.5 rounded-full ${
                theme === 'light'
                  ? 'hover:bg-blue-50 text-blue-600'
                  : 'hover:bg-gray-700 text-gray-300'
              } transition-colors`}
              onClick={() => navigate('/visualization')}
            >
              <ArrowLeft size={20} />
            </motion.button>
            <div>
              <h1 className={`text-2xl font-bold ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent'
                  : 'text-white'
              }`}>Strategic Recommendations</h1>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>AI-powered suggestions to improve your business</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isRefreshing}
            onClick={handleRefresh}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all disabled:opacity-50 shadow-sm ${
              theme === 'light'
                ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white'
                : 'bg-blue-600 text-white'
            }`}
          >
            <motion.div
              animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.6, ease: "linear" }}
            >
              <RefreshCw className="w-5 h-5" />
            </motion.div>
            Generate New Ideas
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Filter Chips */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <div className={`flex-shrink-0 flex items-center gap-1 font-medium ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <Filter size={16} />
            <span>Filter by:</span>
          </div>
          
          {['tech', 'marketing', 'product', 'impact-high'].map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-all ${
                activeFilter === filter 
                  ? theme === 'light'
                    ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white shadow-md' 
                    : 'bg-blue-600 text-white shadow-md'
                  : theme === 'light'
                    ? 'bg-white/80 backdrop-blur-sm text-gray-700 border border-blue-100 shadow-sm hover:border-blue-200'
                    : 'bg-[#40414F] text-gray-300 border border-gray-700 shadow-sm hover:border-gray-600'
              }`}
            >
              {filter === 'impact-high' ? <Zap className="w-3.5 h-3.5" /> : <CategoryIcon category={filter} />}
              {filter === 'impact-high' ? 'High Impact' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Main Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter || 'all'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleSuggestions.map((suggestion, index) => (
              <motion.div
                key={`${suggestion.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className={`rounded-2xl shadow-sm p-6 relative 
                           hover:shadow-md transition-all h-full flex flex-col ${
                  theme === 'light'
                    ? 'bg-white/90 backdrop-blur-sm border border-blue-100'
                    : 'bg-[#40414F] border border-gray-700'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className={`text-xl font-semibold ${
                    theme === 'light' ? 'text-blue-700' : 'text-white'
                  }`}>{suggestion.title}</h2>
                  <Rocket className={`${
                    theme === 'light' ? 'text-blue-500' : 'text-blue-400'
                  } h-5 w-5`} />
                </div>
                
                <p className={`mb-5 text-sm ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  {suggestion.benefit} {suggestion.reason}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto mb-6">
                  <span className={`text-xs py-1 px-3 rounded-full capitalize ${
                    theme === 'light'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-blue-900/30 text-blue-300'
                  }`}>
                    {suggestion.category}
                  </span>
                  <span className={`text-xs py-1 px-3 rounded-full ${
                    suggestion.impact === 'high' 
                      ? theme === 'light'
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-amber-900/30 text-amber-300'
                      : suggestion.impact === 'medium'
                        ? theme === 'light'
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-blue-900/30 text-blue-300'
                        : theme === 'light'
                          ? 'bg-gray-50 text-gray-600'
                          : 'bg-gray-700 text-gray-300'
                  }`}>
                    {suggestion.impact.toUpperCase()} IMPACT
                  </span>
                </div>
                
                <div className={`flex items-center justify-between pt-4 ${
                  theme === 'light' ? 'border-t border-gray-100' : 'border-t border-gray-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1 text-xs ${
                      theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      <Star className="h-4 w-4 text-amber-400" />
                      <span>{18 + index}</span>
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${
                      theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>{7 + index}d</span>
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${
                      theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      <span>{2 + index}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedSuggestion(suggestion)}
                    className={`text-sm font-medium flex items-center gap-1 hover:underline ${
                      theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                    }`}
                  >
                    View Details 
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Selected Suggestion Modal */}
      <AnimatePresence>
        {selectedSuggestion && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedSuggestion(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className={`rounded-2xl shadow-lg p-6 max-w-2xl w-full mx-auto relative ${
                theme === 'light'
                  ? 'bg-white/95 backdrop-blur-sm border border-blue-100'
                  : 'bg-[#40414F] border border-gray-700'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className={`text-2xl font-bold ${
                  theme === 'light'
                    ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent'
                    : 'text-white'
                }`}>{selectedSuggestion.title}</h2>
                <div className="flex items-center gap-2">
                  <span className={`text-xs py-1 px-3 rounded-full capitalize ${
                    theme === 'light'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-blue-900/30 text-blue-300'
                  }`}>
                    {selectedSuggestion.category}
                  </span>
                  <span className={`text-xs py-1 px-3 rounded-full ${
                    selectedSuggestion.impact === 'high' 
                      ? theme === 'light'
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-amber-900/30 text-amber-300'
                      : selectedSuggestion.impact === 'medium'
                        ? theme === 'light'
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-blue-900/30 text-blue-300'
                        : theme === 'light'
                          ? 'bg-gray-50 text-gray-600'
                          : 'bg-gray-700 text-gray-300'
                  }`}>
                    {selectedSuggestion.impact.toUpperCase()} IMPACT
                  </span>
                </div>
              </div>
              
              <div className="space-y-6 mb-6">
                <div className={`p-4 rounded-xl ${
                  theme === 'light'
                    ? 'bg-blue-50/70'
                    : 'bg-blue-900/20'
                }`}>
                  <h3 className={`font-medium mb-2 flex items-center gap-2 ${
                    theme === 'light' ? 'text-blue-700' : 'text-blue-300'
                  }`}>
                    <TrendingUp size={18} />
                    Business Benefit
                  </h3>
                  <p className={`${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>{selectedSuggestion.benefit}</p>
                </div>
                
                <div className={`p-4 rounded-xl ${
                  theme === 'light'
                    ? 'bg-blue-50/70'
                    : 'bg-blue-900/20'
                }`}>
                  <h3 className={`font-medium mb-2 flex items-center gap-2 ${
                    theme === 'light' ? 'text-blue-700' : 'text-blue-300'
                  }`}>
                    <Zap size={18} />
                    Strategic Reasoning
                  </h3>
                  <p className={`${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>{selectedSuggestion.reason}</p>
                </div>
                
                <div className={`p-4 rounded-xl ${
                  theme === 'light'
                    ? 'bg-blue-50/70'
                    : 'bg-blue-900/20'
                }`}>
                  <h3 className={`font-medium mb-2 flex items-center gap-2 ${
                    theme === 'light' ? 'text-blue-700' : 'text-blue-300'
                  }`}>
                    <Star size={18} />
                    Implementation Steps
                  </h3>
                  <ol className={`list-decimal list-inside space-y-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    <li>Research current market trends and competition</li>
                    <li>Develop a detailed implementation roadmap</li>
                    <li>Allocate resources and assign responsibilities</li>
                    <li>Set key performance indicators for measuring success</li>
                    <li>Create a timeline with milestones for deployment</li>
                  </ol>
                </div>
              </div>
              
              <div className={`flex items-center justify-end gap-3 pt-4 ${
                theme === 'light' ? 'border-t border-gray-200' : 'border-t border-gray-700'
              }`}>
                <button 
                  onClick={() => setSelectedSuggestion(null)}
                  className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                    theme === 'light'
                      ? 'text-gray-600 hover:bg-gray-100'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Close
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2 rounded-xl font-medium flex items-center gap-2 shadow-sm ${
                    theme === 'light'
                      ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <Rocket size={18} />
                  Implement Strategy
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuggestorPage;