import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ColorMain from './coloring-component/ColorMain';
import { ColorContextProvider } from './contexts/ColorContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.Fragment>
    <ColorContextProvider>
      <ColorMain/>
    </ColorContextProvider>
  </React.Fragment>
);

