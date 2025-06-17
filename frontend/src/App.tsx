// Import CSS files for global styles and component-specific styles
import './App.css';
import './index.css';

// Import page components for routing
import HomePage from './pages/HomePages';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import SharedPage from './pages/SharedPage';

/**
 * App component: The root component of the application.
 * Sets up the BrowserRouter and defines all routes for the app.
 */
function App() {
  return (
    <div>
      {/* Wrap the app in BrowserRouter for client-side routing */}
      <BrowserRouter>
        {/* Routes container: defines all available paths and their components */}
        <Routes>
          {/* Route for the HomePage */}
          <Route path='/HomePage' element={<HomePage />} />
          {/* Route for the RegisterPage (default/landing page) */}
          <Route path='/' element={<RegisterPage />} />
          {/* Route for the SharedPage, which displays shared content via a unique ID */}
          <Route path='/share/:id' element={<SharedPage />} />
          {/* Catch-all route: redirects any unmatched path to HomePage */}
          <Route path="*" element={<Navigate to="/HomePage" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
