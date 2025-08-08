import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/Navbar.css';
import './styles/Dashboard.css';
import './styles/FoodLog.css';
import './styles/AddEntryModal.css';
import './styles/Goals.css';
import './styles/History.css';
import './styles/Nutrition.css';
import './styles/Auth.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
