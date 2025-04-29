import React from 'react';
import { Sparkles, Upload, Globe, Brain } from 'lucide-react';
import { Button } from '../components/Button';
import { ThemeToggle } from '../components/ThemeToggle';
import { Footer } from '../components/Footer';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
// @ts-ignore
import BackendFrontendOverview from './BackendFrontendOverview';

interface PromptPageProps {
  onNext: (idea: string) => void;
}

export function PromptPage({ onNext }: PromptPageProps) {
  const [idea, setIdea] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [globeEnabled, setGlobeEnabled] = React.useState(false);
  const [deepThinkEnabled, setDeepThinkEnabled] = React.useState(false);
  const [showDesign, setShowDesign] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const typingTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Function to adjust textarea height based on content
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get accurate scrollHeight
      textarea.style.height = 'auto';
      // Set height to scrollHeight + padding for bottom buttons
      textarea.style.height = `${Math.max(textarea.scrollHeight, 128)}px`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onNext(idea);
      // Show loading for 2 seconds before navigating
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to the backend-frontend-overview page
        navigate('/backend-frontend-overview');
      }, 2000);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIdea(e.target.value);
    setIsTyping(true);

    // Adjust textarea height when content changes
    adjustTextareaHeight();

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to hide typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  // Initialize textarea height and adjust on window resize
  React.useEffect(() => {
    adjustTextareaHeight();
    window.addEventListener('resize', adjustTextareaHeight);
    
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      window.removeEventListener('resize', adjustTextareaHeight);
    };
  }, []);

  const handleUpload = () => {
    // Trigger file input click
    const fileInput = document.getElementById('file-upload');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
    console.log('Files selected:', e.target.files);
    // You can implement the file handling logic here
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50' 
        : 'bg-[#343541]'
    }`}>
      <header className="fixed top-0 w-full px-4 py-3 flex justify-end z-10">
        <ThemeToggle />
      </header>
      
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="w-full max-w-[65%] space-y-10 text-center">
            <div className={`space-y-5 ${
              theme === 'light' ? 'text-blue-700' : 'text-white'
            }`}>
              <div className="flex justify-center">
                <Logo size="lg" className="scale-125 origin-center transform-gpu" />
              </div>
              <p className={`text-lg max-w-2xl mx-auto ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Transform your idea into a complete technical product using our AI
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative w-full">
              <div className={`relative rounded-3xl shadow-md ${
                theme === 'light'
                  ? 'bg-white/90 border border-blue-100'
                  : 'bg-[#40414F] border border-gray-700'
              }`}>
                <textarea
                  ref={textareaRef}
                  value={idea}
                  onChange={handleTyping}
                  placeholder="Describe your product idea in detail..."
                  className={`w-full min-h-[8rem] p-5 pb-16 rounded-3xl resize-none focus:outline-none focus:ring-0 text-base overflow-hidden ${
                    theme === 'light'
                      ? 'bg-white/90 text-gray-900 placeholder-gray-400'
                      : 'bg-[#40414F] text-white placeholder-gray-400'
                  }`}
                />
                
                {/* Bottom toolbar with buttons */}
                <div className="absolute bottom-3 left-3 flex items-center space-x-3">
                  {/* Upload button */}
                  <button
                    type="button"
                    onClick={handleUpload}
                    className={`p-2.5 rounded-full transition-colors duration-200 ${
                      theme === 'light'
                        ? 'text-blue-600 hover:bg-blue-50'
                        : 'text-gray-400 hover:bg-gray-700'
                    }`}
                    title="Upload files"
                  >
                    <Upload size={20} />
                  </button>
                  
                  {/* Hidden file input */}
                  <input 
                    type="file"
                    id="file-upload"
                    accept=".pdf,image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                  />
                  
                  {/* Globe toggle button */}
                  <button
                    type="button"
                    onClick={() => setGlobeEnabled(!globeEnabled)}
                    className={`p-3 rounded-full transition-colors duration-200 ${
                      globeEnabled
                        ? 'bg-cyan-600 text-white'
                        : theme === 'light'
                          ? 'text-blue-600 hover:bg-blue-50'
                          : 'text-gray-400 hover:bg-gray-700'
                    }`}
                    title="Web search"
                  >
                    <Globe size={20} />
                  </button>
                  
                  {/* DeepThink button */}
                  <button
                    type="button"
                    onClick={() => setDeepThinkEnabled(!deepThinkEnabled)}
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      deepThinkEnabled
                        ? 'bg-teal-600 text-white'
                        : theme === 'light'
                          ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Brain size={18} />
                      <span>DeepThink</span>
                    </div>
                  </button>
                </div>
                
                <div className="absolute bottom-3 right-3">
                  <Button 
                    type="submit"
                    disabled={!idea.trim() || isLoading}
                    className="py-2.5 px-5 text-sm shadow-md relative"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" style={{ animationDelay: '0s' }}></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <span>Generating...</span>
                      </div>
                    ) : (
                      "Generate Design"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 