// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// // import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
  
// );
import React,{ StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

// https://github.com/atlassian/react-beautiful-dnd/blob/master/README.md#documentation-
// https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md
// https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md
