// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PromptPage } from './pages/PromptPage';
// @ts-ignore
import BackendFrontendOverview from './pages/BackendFrontendOverview';
// @ts-ignore
import { VisualizationPage } from './pages/VisualizationPage';
import EvaluationResult from './pages/EvaluationResult';
import { HomePage } from './pages/HomePage';
import Suggester from './pages/Suggester';


function App() {
  const [projectIdea, setProjectIdea] = React.useState('');

  const handleSaveIdea = (idea: string) => {
    if (idea) setProjectIdea(idea);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<PromptPage onNext={handleSaveIdea} />} />
          <Route path="/backend-frontend-overview" element={<BackendFrontendOverview />} />
          <Route path="/evaluation-results" element={<EvaluationResult />} />
          <Route path="/visualization" element={<VisualizationPage />} />
          <Route path="/suggester" element={<Suggester />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
