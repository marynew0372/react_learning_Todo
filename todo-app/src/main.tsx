import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProviderContext } from './components/Themes/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProviderContext>
        <App />
      </ThemeProviderContext>
    </Provider>
  </StrictMode>,
)
