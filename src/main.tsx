// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';
// import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authentication from './pages/Authentication';


import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <MantineProvider>
    <>
      <Router>
        <Routes>
          <Route path="login" element={<Authentication />} />
          <Route path="*" element={<App />} />
        </Routes>
      </Router>
    </>
  </MantineProvider >
  //  </StrictMode>, 
)
