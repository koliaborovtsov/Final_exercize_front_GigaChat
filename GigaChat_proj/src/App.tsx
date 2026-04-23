import React from 'react';
import ErrorBoundary from './components/Common/ErrorBoundary';
import ChatWindow from './components/Chat/ChatWindow';
import SystemPrompt from './components/Chat/SystemPrompt';
import './styles/global.css';

const App: React.FC = () => {
  return (
	<ErrorBoundary>
	  <div className="app">
		<div className="sidebar">
		  <SystemPrompt />
		</div>
		<div className="main">
		  <ChatWindow />
		</div>
	  </div>
	</ErrorBoundary>
  );
};

export default App;