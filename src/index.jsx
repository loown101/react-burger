// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/App/App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import React from 'react';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<React.StrictMode>
  <App />
</React.StrictMode>);


reportWebVitals();