import React, { useEffect } from 'react';
import { StoreProvider } from './store/Store';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatAgent from './components/ChatAgent';

// Default redirect to /chat, preserving query parameters
const DefaultRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get query parameters from the main URL (before the hash)
    const queryParams = window.location.search;

    // Normalize pathname to always end with /
    let pathname = window.location.pathname;
    if (!pathname.endsWith('/')) {
      pathname += '/';
    }

    // Build the new URL with normalized pathname
    const baseUrl = window.location.origin + pathname;
    const newUrl = `${baseUrl}#/chat${queryParams}`;

    // Replace the entire URL (removes query params from base URL)
    window.history.replaceState(null, '', newUrl);

    // Navigate to the chat route with query params
    navigate(`/chat${queryParams}`, { replace: true });
  }, [navigate]);

  return null;
};

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <div className="appContainer">
          <Sidebar />
          <div className="mainContent">
            <Routes>
              <Route path="/chat" element={<ChatAgent />} />
              <Route path="/*" element={<DefaultRedirect />} />
            </Routes>
          </div>
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App; 