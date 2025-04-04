import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@windows/settings/App'
import { ThemeProvider } from '@components/theme/ThemeProvider'
import '@repo/ui/theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
