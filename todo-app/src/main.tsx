import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProviderContext } from './components/Themes/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProviderContext>
          <App />
      </ThemeProviderContext>
    </Provider>
  </StrictMode>,
)
