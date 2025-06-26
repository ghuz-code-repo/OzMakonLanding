import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css' // Global styles
import './i18n'
// Importing Bootstrap SCSS file so Vite can process it if needed, or ensure CSS is loaded.
// Alternatively, ensure Bootstrap CSS is linked in index.html, which is simpler for pure CSS.
// import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
