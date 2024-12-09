import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './input.css'
import './output.css'
import MainApp from './components/MainPage/MainApp';


// Hello I am Qamar from dev branch

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainApp/>
  </StrictMode>
)
