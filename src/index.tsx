import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root'); 
if (!rootElement) {
    throw new Error("Root element with ID 'root' not found!");
}

const root = ReactDOM.createRoot(rootElement!); // Non-null assertion

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
