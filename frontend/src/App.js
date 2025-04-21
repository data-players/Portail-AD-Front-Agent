import React from 'react';
import { StoreProvider } from './store/Store';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatAgent from './components/ChatAgent';

// Default redirect to /chat
const DefaultRedirect = () => <Navigate to="/chat" />;

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