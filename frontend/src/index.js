import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// css
import './styles/index.css';
import './styles/customize-progress-bar.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
