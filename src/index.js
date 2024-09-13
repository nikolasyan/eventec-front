import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// import '@ionic/react/css/core.css';                // Ionic Core CSS
// import '@ionic/react/css/normalize.css';            // Normalize CSS
// import '@ionic/react/css/structure.css';            // Structure CSS
// import '@ionic/react/css/typography.css';           // Typography CSS
// import '@ionic/react/css/padding.css';              // Optional Ionic Padding CSS
// import '@ionic/react/css/float-elements.css';       // Optional Ionic Float Elements CSS
// import '@ionic/react/css/text-alignment.css';       // Optional Ionic Text Alignment CSS
// import '@ionic/react/css/text-transformation.css';  // Optional Ionic Text Transformation CSS
// import '@ionic/react/css/flex-utils.css';           // Optional Ionic Flex Utilities CSS
// import '@ionic/react/css/display.css';              // Optional Ionic Display CSS
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
