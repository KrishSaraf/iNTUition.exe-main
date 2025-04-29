import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import EvaluateModal from '../components/EvaluateModal';

const BackendFrontendOverview = () => {
  const { theme } = useTheme();
  const [backendVisible, setBackendVisible] = useState([false, false, false]);
  const [frontendVisible, setFrontendVisible] = useState([false, false, false, false, false]);
  const [arrowSets, setArrowSets] = useState([false, false, false]);
  const [evaluateVisible, setEvaluateVisible] = useState(false);
  const [showEvaluateModal, setShowEvaluateModal] = useState(false);
  
  // Create refs for all cards to get their positions
  const backendRefs = useRef([React.createRef(), React.createRef(), React.createRef()]);
  const frontendRefs = useRef([
    React.createRef(), 
    React.createRef(), 
    React.createRef(), 
    React.createRef(), 
    React.createRef()
  ]);
  const containerRef = useRef(null);

  // Store all arrow paths
  const [arrowPaths, setArrowPaths] = useState({});

  // Calculate all arrow paths when cards are visible
  useEffect(() => {
    const calculateAllPaths = () => {
      if (!containerRef.current) return;
      
      const newPaths = {};
      
      // Only calculate for visible frontend cards
      frontendVisible.forEach((isFrontendVisible, frontendIndex) => {
        if (!isFrontendVisible) return;
        
        const frontendEl = frontendRefs.current[frontendIndex].current;
        if (!frontendEl) return;
        
        // Calculate paths for each backend card to this frontend card
        backendRefs.current.forEach((backendRef, backendIndex) => {
          const backendEl = backendRef.current;
          if (!backendEl) return;
          
          // Get container position to calculate relative coordinates
          const containerRect = containerRef.current.getBoundingClientRect();
          
          // Get positions of both cards
          const backendRect = backendEl.getBoundingClientRect();
          const frontendRect = frontendEl.getBoundingClientRect();
          
          // Calculate the points relative to the container
          const startX = backendRect.left + backendRect.width / 2 - containerRect.left;
          const startY = backendRect.bottom - containerRect.top;
          const endX = frontendRect.left + frontendRect.width / 2 - containerRect.left;
          const endY = frontendRect.top - containerRect.top;
          
          // Create a straight line path
          const key = `${backendIndex}-${frontendIndex}`;
          newPaths[key] = `M${startX},${startY} L${endX},${endY}`;
        });
      });
      
      setArrowPaths(newPaths);
    };
    
    // Wait a bit for all card animations to stabilize before calculating paths
    const timer = setTimeout(calculateAllPaths, 2600);
    
    window.addEventListener('resize', calculateAllPaths);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateAllPaths);
    };
  }, [frontendVisible]);

  useEffect(() => {
    // Animate backend cards appearing
    const backendTimers = [];
    backendTimers.push(setTimeout(() => setBackendVisible(prev => [true, prev[1], prev[2]]), 300));
    backendTimers.push(setTimeout(() => setBackendVisible(prev => [prev[0], true, prev[2]]), 600));
    backendTimers.push(setTimeout(() => setBackendVisible(prev => [prev[0], prev[1], true]), 900));

    // Animate frontend cards appearing after backend
    const frontendTimers = [];
    frontendTimers.push(setTimeout(() => setFrontendVisible(prev => [true, prev[1], prev[2], prev[3], prev[4]]), 1200));
    frontendTimers.push(setTimeout(() => setFrontendVisible(prev => [prev[0], true, prev[2], prev[3], prev[4]]), 1500));
    frontendTimers.push(setTimeout(() => setFrontendVisible(prev => [prev[0], prev[1], true, prev[3], prev[4]]), 1800));
    frontendTimers.push(setTimeout(() => setFrontendVisible(prev => [prev[0], prev[1], prev[2], true, prev[4]]), 2100));
    frontendTimers.push(setTimeout(() => setFrontendVisible(prev => [prev[0], prev[1], prev[2], prev[3], true]), 2400));

    // Animate arrows appearing after all cards are visible
    const arrowTimers = [];
    // First backend card's arrows appear at 2700ms
    arrowTimers.push(setTimeout(() => setArrowSets(prev => [true, prev[1], prev[2]]), 2700));
    // Second backend card's arrows appear 500ms later
    arrowTimers.push(setTimeout(() => setArrowSets(prev => [prev[0], true, prev[2]]), 3200));
    // Third backend card's arrows appear 500ms after that
    arrowTimers.push(setTimeout(() => setArrowSets(prev => [prev[0], prev[1], true]), 3700));
    
    // Show evaluate button after all arrows appear
    setTimeout(() => setEvaluateVisible(true), 4200);

    // Cleanup timers
    return () => {
      backendTimers.forEach(timer => clearTimeout(timer));
      frontendTimers.forEach(timer => clearTimeout(timer));
      arrowTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Backend card data
  const backendCards = [
    { 
      title: "Microservices Architecture",
      description: "Distributed system of independent services communicating via APIs",
      icon: "M6 3a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V3zM11 3a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V3zM6 8a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V8zM11 8a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V8zM16 8a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V8z",
      techStack: ["Node.js", "Express", "Docker", "Kubernetes", "MongoDB"]
    },
    { 
      title: "Serverless Architecture",
      description: "Event-driven functions deployed without managing server infrastructure",
      icon: "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z",
      techStack: ["AWS Lambda", "API Gateway", "DynamoDB", "CloudFormation", "Firebase"]
    },
    { 
      title: "Event-Driven Architecture",
      description: "Decoupled components communicating through events with message brokers",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      techStack: ["Kafka", "RabbitMQ", "Spring Boot", "Redis", "PostgreSQL", "GraphQL", "Apollo"]
    }
  ];

  // Frontend card data with videos
  const frontendVideos = [
    { video: "/src/videos/Frontend_1.mp4" },
    { video: "/src/videos/Frontend_2.mp4" },
    { video: "/src/videos/Frontend_3.mp4" },
    { video: "/src/videos/Frontend_4.mp4" },
    { video: "/src/videos/Frontend_5.mp4" }
  ];

  // Colors for each backend component
  const colors = [
    "#2563EB", // blue-600 for backend 0
    "#0891B2", // cyan-600 for backend 1
    "#0D9488"  // teal-600 for backend 2
  ];

  // Gradients for each backend component
  const gradients = [
    "from-blue-500 to-blue-700", // backend 0
    "from-cyan-500 to-cyan-700", // backend 1
    "from-teal-500 to-teal-700"  // backend 2
  ];

  const handleEvaluateClick = () => {
    setShowEvaluateModal(true);
  };

  const handleEvaluateComplete = () => {
    console.log('Evaluation complete!');
    // You can add additional logic here for what happens after evaluation
  };

  return (
    <div className={`relative w-full min-h-screen px-4 py-8 ${theme === 'light' ? 'bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50' : 'bg-[#343541]'}`}>
      <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'light' ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent' : 'text-white'}`}>
      Architecture Exploration & Visualization
      </h2>

      <div className="relative flex flex-col items-center" ref={containerRef}>
        {/* Backend Cards Row */}
        <div className="flex justify-center space-x-6 mb-36 w-full">
          {backendCards.map((card, index) => (
            <motion.div
              key={`backend-${index}`}
              ref={backendRefs.current[index]}
              className={`p-4 rounded-lg shadow-lg ${theme === 'light' ? 'bg-white/90 border border-blue-100' : 'bg-[#40414F] border border-gray-700'} relative z-10 w-80`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: backendVisible[index] ? 1 : 0, y: backendVisible[index] ? 0 : -20 }}
              transition={{ duration: 0.5 }}
              style={{ 
                position: 'relative',
                left: index === 0 ? '-100px' : index === 2 ? '100px' : '0',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <div className={`w-10 h-10 rounded-full mb-4 flex items-center justify-center bg-gradient-to-br ${gradients[index]} text-white`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={card.icon} />
                </svg>
              </div>
              
              <h3 className={`text-lg font-semibold mb-2 ${theme === 'light' ? `text-${colors[index].substring(1)}` : 'text-white'}`}>{card.title}</h3>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} flex-grow`}>{card.description}</p>
              
              <div className={`mt-4 flex flex-wrap gap-2`}>
                {card.techStack.map((tech, techIndex) => (
                  <span 
                    key={`${index}-tech-${techIndex}`}
                    className={`px-2 py-1 text-xs rounded-full ${theme === 'light' 
                      ? 'bg-teal-50 text-teal-700' 
                      : 'bg-gray-700 text-teal-200'}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* SVG container for arrows */}
        <svg className="absolute top-0 left-0 w-full h-full" style={{ pointerEvents: 'none', zIndex: 5 }}>
          {/* Arrow markers (arrowheads) - Reduced size by 50% */}
          <defs>
            {colors.map((color, index) => (
              <marker
                key={`arrowhead-${index}`}
                id={`arrowhead-${index}`}
                markerWidth="5"
                markerHeight="3.5"
                refX="5" 
                refY="1.75"
                orient="auto"
              >
                <polygon points="0 0, 5 1.75, 0 3.5" fill={color} />
              </marker>
            ))}
          </defs>
          
          {/* First backend card's arrows */}
          <g>
            {arrowSets[0] && frontendVisible.map((isFrontendVisible, frontendIndex) => {
              if (!isFrontendVisible) return null;
              const pathKey = `0-${frontendIndex}`;
              if (!arrowPaths[pathKey]) return null;
              
              return (
                <motion.path
                  key={`arrow-0-${frontendIndex}`}
                  d={arrowPaths[pathKey]}
                  stroke={colors[0]}
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.1 * frontendIndex }}
                  markerEnd={`url(#arrowhead-0)`}
                />
              );
            })}
          </g>
          
          {/* Second backend card's arrows - add 0.5s additional delay */}
          <g>
            {arrowSets[1] && frontendVisible.map((isFrontendVisible, frontendIndex) => {
              if (!isFrontendVisible) return null;
              const pathKey = `1-${frontendIndex}`;
              if (!arrowPaths[pathKey]) return null;
              
              return (
                <motion.path
                  key={`arrow-1-${frontendIndex}`}
                  d={arrowPaths[pathKey]}
                  stroke={colors[1]}
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.5 + (0.1 * frontendIndex) }}
                  markerEnd={`url(#arrowhead-1)`}
                />
              );
            })}
          </g>
          
          {/* Third backend card's arrows - add 1.0s additional delay */}
          <g>
            {arrowSets[2] && frontendVisible.map((isFrontendVisible, frontendIndex) => {
              if (!isFrontendVisible) return null;
              const pathKey = `2-${frontendIndex}`;
              if (!arrowPaths[pathKey]) return null;
              
              return (
                <motion.path
                  key={`arrow-2-${frontendIndex}`}
                  d={arrowPaths[pathKey]}
                  stroke={colors[2]}
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 0.5, delay: 1.0 + (0.1 * frontendIndex) }}
                  markerEnd={`url(#arrowhead-2)`}
                />
              );
            })}
          </g>
        </svg>

        {/* Frontend Cards - Video Only */}
        <div className="flex justify-center flex-wrap gap-4 w-full">
          {frontendVideos.map((card, index) => (
            <motion.div
              key={`frontend-${index}`}
              ref={frontendRefs.current[index]}
              className={`w-52 h-80 rounded-lg shadow-md overflow-hidden ${theme === 'light' ? 'bg-white/90 border border-cyan-200' : 'bg-[#40414F] border border-gray-700'} relative z-10`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: frontendVisible[index] ? 1 : 0, y: frontendVisible[index] ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'relative',
                left: (index - 2) * 60 + 'px' 
              }}
            >
              {/* Video-only content */}
              {frontendVisible[index] && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="h-full"
                >
                  <video 
                    width="100%" 
                    height="100%" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={card.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Evaluate Button - Moved below the last frontend card */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: evaluateVisible ? 1 : 0, y: evaluateVisible ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className={`mt-12 ml-auto mr-4 px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 ${
            theme === 'light' 
              ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white' 
              : 'bg-blue-600 text-white'
          } hover:shadow-xl transform hover:scale-105 transition-all`}
          onClick={handleEvaluateClick}
        >
          <span className="text-lg font-semibold">Evaluate</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>

      {/* Evaluate Modal */}
      <EvaluateModal 
        isOpen={showEvaluateModal}
        onClose={() => setShowEvaluateModal(false)}
        onComplete={handleEvaluateComplete}
      />
    </div>
  );
};

export default BackendFrontendOverview; 