import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/',
    server: {
        port: 3000,
        open: true,
    },
    define: {
        global: 'globalThis',
    },
    build: {
        sourcemap: false, // Disable sourcemaps in production for smaller bundle
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    // Vendor chunks - separate large dependencies
                    if (id.includes('node_modules')) {
                        // React and React DOM (core framework)
                        if (id.includes('react') || id.includes('react-dom')) {
                            return 'vendor-react'
                        }
                        // React Router (routing)
                        if (id.includes('react-router')) {
                            return 'vendor-router'
                        }
                        // Data transformation libraries
                        if (id.includes('diff') || id.includes('js-yaml') || id.includes('toml') || id.includes('csv') || id.includes('jsonpath')) {
                            return 'vendor-data'
                        }
                        // UI/UX libraries
                        if (id.includes('react-hot-toast') || id.includes('react-helmet') || id.includes('fuse.js')) {
                            return 'vendor-ui'
                        }
                        // Crypto/hashing libraries
                        if (id.includes('crypto') || id.includes('hash') || id.includes('jwt') || id.includes('bcrypt')) {
                            return 'vendor-crypto'
                        }
                        // QR code and encoding libraries
                        if (id.includes('qrcode') || id.includes('base64') || id.includes('encoding')) {
                            return 'vendor-encoding'
                        }
                        // Everything else from node_modules
                        return 'vendor'
                    }
                },
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
            },
        },
        chunkSizeWarningLimit: 600, // Increase limit slightly since we're splitting better
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
})
