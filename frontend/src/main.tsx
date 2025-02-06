import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LikedArticlesProvider } from './contexts/LikedArticlesContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LikedArticlesProvider>
      <App />
    </LikedArticlesProvider>
  </StrictMode>,
)
