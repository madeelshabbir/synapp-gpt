// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// //import { Provider } from "react-redux";
// //import store from "./redux/store";
// import React from "react";
// import { AuthProvider } from './utils/AuthContext'



//import ReactDOM from 'react-dom/client'
//ReactDOM.createRoot(document.getElementById("root")).render(<App />);
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App.jsx';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';

import { AuthProvider } from './utils/AuthContext'; 
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap the entire application with AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
