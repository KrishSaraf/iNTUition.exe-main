import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Rocket, Star, Clock, Users, Sparkles, Shield, BookOpen, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const dummyProjects = [
  { 
    id: 1, 
    name: 'E-commerce Platform', 
    description: 'A modern online shopping experience with real-time inventory management and AI-powered recommendations',
    stats: { stars: 24, days: 12, contributors: 5 },
    tags: ['React', 'Node.js', 'AI']
  },
  { 
    id: 2, 
    name: 'Task Manager', 
    description: 'Simple and efficient task organization with team collaboration features and progress tracking',
    stats: { stars: 18, days: 8, contributors: 3 },
    tags: ['TypeScript', 'Redux', 'REST']
  },
  { 
    id: 3, 
    name: 'Social Media Dashboard', 
    description: 'Analytics and management for social platforms with customizable widgets and real-time data',
    stats: { stars: 31, days: 15, contributors: 7 },
    tags: ['Analytics', 'API', 'Charts']
  },
];

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with 3D and Parallax effects */}
      <section className="relative min-h-screen flex items-center perspective-1000">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50 overflow-hidden">
          {/* Animated background elements */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cyan-200 opacity-20"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 40 - 20],
                x: [0, Math.random() * 40 - 20],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: Math.random() * 10 + 10,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-24 md:pt-0">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Side - Text with enhanced animations */}
            <motion.div 
              className="md:w-1/2 text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl xs:text-6xl md:text-7xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent font-serif italic relative">
                  exe.ai                  
                  <motion.span 
                    className="absolute -bottom-3 left-0 w-full h-1.5 bg-cyan-600"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                </span>
              </h1>
              <motion.p 
                className="text-lg md:text-2xl text-gray-700 font-medium mt-6 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Transform your ideas into reality with our AI-powered project generator. Create, collaborate, and build amazing applications.
              </motion.p>

              {/* CTA Buttons with enhanced design */}
              <motion.div 
                className="mt-10 flex justify-center md:justify-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <button 
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full shadow-lg hover:shadow-blue-500/30 hover:translate-y-1 transform transition-all duration-300 flex items-center gap-2"
                  onClick={() => navigate('/new')}
                >
                  <PlusCircle size={20} />
                  <span>New Project</span>
                </button>
                <button className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-cyan-200 text-blue-700 font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-white transition-all duration-300">
                  Learn More
                </button>
              </motion.div>

              {/* Floating badges */}
              <motion.div 
                className="hidden md:flex items-center mt-12 space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="flex items-center px-4 py-2 bg-white/60 backdrop-blur-md rounded-full shadow-sm">
                  <span className="h-3 w-3 bg-teal-500 rounded-full mr-2"></span>
                  <span className="text-sm font-medium text-gray-700">AI Powered</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-white/60 backdrop-blur-md rounded-full shadow-sm">
                  <span className="h-3 w-3 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-sm font-medium text-gray-700">Collaborative</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Project Cards in 3D */}
            <motion.div 
              className="md:w-1/2 mt-16 md:mt-0 flex justify-center"
              initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="relative w-full max-w-md"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl blur-2xl opacity-20 transform -rotate-6"></div>
                
                {/* Featured Project Card */}
                <div className="relative z-10 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-blue-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-blue-900">Project Showcase</h3>
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Rocket className="text-blue-600" size={24} />
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6">
                    Our AI can help you build any type of application quickly - 
                    from e-commerce platforms to productivity tools.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['React', 'TypeScript', 'AI', 'Node.js'].map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 border-2 border-white flex items-center justify-center text-xs text-white font-bold">
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center gap-1">
                      Start Now <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-gradient-to-b from-transparent to-blue-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent inline-block">
              Your Projects
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Browse your existing projects or create something new with our AI-powered tools
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {dummyProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 25px -5px rgba(14, 165, 233, 0.1), 0 10px 10px -5px rgba(14, 165, 233, 0.04)"
                }}
                className="group bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-blue-100 hover:border-blue-200 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent opacity-50 -translate-y-12 translate-x-12 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500" />
                
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-semibold text-blue-800 group-hover:text-blue-600 transition-colors duration-300">
                    {project.name}
                  </h2>
                  <Rocket 
                    className="text-blue-400 group-hover:text-blue-500 transition-all duration-300 transform group-hover:rotate-12" 
                    size={24} 
                  />
                </div>
                
                <p className="text-blue-600 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-blue-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-blue-500">
                      <Star size={14} />
                      <span className="text-xs font-medium">{project.stats.stars}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-500">
                      <Clock size={14} />
                      <span className="text-xs font-medium">{project.stats.days}d</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-500">
                      <Users size={14} />
                      <span className="text-xs font-medium">{project.stats.contributors}</span>
                    </div>
                  </div>
                  <button className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors duration-300 flex items-center gap-1 group/btn">
                    View Details
                    <span className="transform group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Add Project Button */}
          <motion.div 
            className="mt-16 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={() => navigate('/new')}
              className="flex items-center gap-2 bg-white px-8 py-4 text-blue-700 font-semibold rounded-full shadow-md hover:shadow-lg border border-blue-100 hover:border-blue-300 transition-all duration-300"
            >
              <PlusCircle size={20} />
              <span>Create Another Project</span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export { HomePage };