import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ThemeProviderContext } from './components/Themes/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProviderContext>
        <App />
    </ThemeProviderContext>
  </StrictMode>,
)
