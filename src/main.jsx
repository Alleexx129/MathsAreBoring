import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import MainPage from './MainPage.jsx'

createRoot(document.getElementById('root2')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainPage />
  </StrictMode>,
)