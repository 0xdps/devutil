import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')!

// Check if the app was pre-rendered
if (rootElement.hasChildNodes()) {
    // Hydrate the pre-rendered content (no StrictMode for hydration)
    ReactDOM.hydrateRoot(
        rootElement,
        <HelmetProvider>
            <App />
        </HelmetProvider>
    )
} else {
    // Normal render for development
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </React.StrictMode>,
    )
}

