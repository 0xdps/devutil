import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')!

// Check if the app was pre-rendered by react-snap
if (rootElement.hasChildNodes()) {
    // Hydrate the pre-rendered content
    ReactDOM.hydrateRoot(
        rootElement,
        <React.StrictMode>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </React.StrictMode>
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

