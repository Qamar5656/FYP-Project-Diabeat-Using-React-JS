import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './input.css'
import './output.css'
import App from './App';
import Navbar from './components/DoctorPortal/Navbar'
import MainApp from './components/MainPage/MainApp';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainApp/>
  </StrictMode>
)
