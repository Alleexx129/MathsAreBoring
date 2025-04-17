import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App2 from './MainPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App2 />
  </StrictMode>,
)