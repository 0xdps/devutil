import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Home from './pages/Home'
import DataTransform from './pages/DataTransform'
import Encoding from './pages/Encoding'
import ComingSoon from './pages/ComingSoon'

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/data-transform" element={<DataTransform />} />
                    <Route path="/encoding" element={<Encoding />} />
                    
                    {/* Text Utilities */}
                    <Route path="/text-utilities" element={
                        <ComingSoon 
                            title="Text Utilities"
                            description="String case converter, text counter, and text cleaner"
                            icon="📝"
                            features={[
                                'Case Converter (camelCase, snake_case, kebab-case, PascalCase)',
                                'Word, Character, and Line Counter',
                                'Text Cleaner (remove duplicates, trim, clean)'
                            ]}
                        />
                    } />
                    
                    {/* Generator Toolkit */}
                    <Route path="/generators" element={
                        <ComingSoon 
                            title="Generator Toolkit"
                            description="Generate UUIDs, passwords, random strings, and Lorem Ipsum"
                            icon="🎲"
                            features={[
                                'UUID Generator (v1, v4, v5)',
                                'Secure Password Generator',
                                'Random String/Number Generator',
                                'Lorem Ipsum Text Generator'
                            ]}
                        />
                    } />
                    
                    {/* Hash & Verify */}
                    <Route path="/hash-verify" element={
                        <ComingSoon 
                            title="Hash & Verify"
                            description="Generate hashes, HMAC signatures, and test password strength"
                            icon="#️⃣"
                            features={[
                                'Hash Generator (MD5, SHA-1, SHA-256, SHA-512)',
                                'HMAC Signature Generator',
                                'Password Strength Tester',
                                'File Hash Verification'
                            ]}
                        />
                    } />
                    
                    {/* JWT Decoder */}
                    <Route path="/jwt-decoder" element={
                        <ComingSoon 
                            title="JWT Decoder"
                            description="Decode and inspect JWT tokens offline"
                            icon="🎫"
                            features={[
                                'Decode JWT Header and Payload',
                                'Verify JWT Signature',
                                'Display Token Expiration',
                                'Pretty Print JSON Claims'
                            ]}
                        />
                    } />
                    
                    {/* Code Formatter */}
                    <Route path="/code-formatter" element={
                        <ComingSoon 
                            title="Code Formatter"
                            description="Beautify and minify code"
                            icon="✨"
                            features={[
                                'HTML/CSS/JavaScript Beautifier',
                                'SQL Formatter',
                                'XML Formatter',
                                'Code Minifier for production'
                            ]}
                        />
                    } />
                    
                    {/* JSON Tools */}
                    <Route path="/json-tools" element={
                        <ComingSoon 
                            title="JSON Tools"
                            description="JSON diff and JSONPath evaluator"
                            icon="📋"
                            features={[
                                'Compare two JSON files',
                                'Highlight differences',
                                'JSONPath query evaluator',
                                'JSON Schema validation'
                            ]}
                        />
                    } />
                    
                    {/* Regex Tester */}
                    <Route path="/regex-tester" element={
                        <ComingSoon 
                            title="Regex Tester"
                            description="Test and build regular expressions"
                            icon="🔎"
                            features={[
                                'Live regex testing with highlighting',
                                'Match groups visualization',
                                'Common regex patterns library',
                                'Regex explanation and debugging'
                            ]}
                        />
                    } />
                    
                    {/* Code Diff */}
                    <Route path="/code-diff" element={
                        <ComingSoon 
                            title="Code Diff"
                            description="Compare code and text differences"
                            icon="🔀"
                            features={[
                                'Side-by-side code comparison',
                                'Inline diff view',
                                'Syntax highlighting',
                                'Line-by-line differences'
                            ]}
                        />
                    } />
                    
                    {/* Color Picker */}
                    <Route path="/color-picker" element={
                        <ComingSoon 
                            title="Color Picker"
                            description="Pick and convert colors between formats"
                            icon="🎨"
                            features={[
                                'HEX, RGB, HSL color conversion',
                                'Color picker interface',
                                'Color palette generator',
                                'Accessibility contrast checker'
                            ]}
                        />
                    } />
                    
                    {/* URL Tools */}
                    <Route path="/url-tools" element={
                        <ComingSoon 
                            title="URL Tools"
                            description="Parse, build URLs and generate query strings"
                            icon="🔗"
                            features={[
                                'URL Parser and Decoder',
                                'URL Builder',
                                'Query String Generator',
                                'URL validation'
                            ]}
                        />
                    } />
                    
                    {/* SEO Generator */}
                    <Route path="/seo-generator" element={
                        <ComingSoon 
                            title="SEO Generator"
                            description="Generate meta tags, robots.txt, and sitemaps"
                            icon="🏷️"
                            features={[
                                'Meta Tags Generator',
                                'Robots.txt Builder',
                                'Sitemap.xml Generator',
                                'Open Graph tags'
                            ]}
                        />
                    } />
                    
                    {/* QR Code */}
                    <Route path="/qr-code" element={
                        <ComingSoon 
                            title="QR Code"
                            description="Generate and decode QR codes"
                            icon="📱"
                            features={[
                                'QR Code Generator',
                                'QR Code Scanner/Decoder',
                                'Customizable colors and size',
                                'Download as PNG/SVG'
                            ]}
                        />
                    } />
                    
                    {/* Timestamp Tools */}
                    <Route path="/timestamp-tools" element={
                        <ComingSoon 
                            title="Timestamp Tools"
                            description="Unix timestamp converter and Cron expression builder"
                            icon="⏰"
                            features={[
                                'Unix Timestamp Converter',
                                'Date/Time to Timestamp',
                                'Cron Expression Builder',
                                'Cron Schedule Visualizer'
                            ]}
                        />
                    } />
                    
                    {/* Markdown Previewer */}
                    <Route path="/markdown-previewer" element={
                        <ComingSoon 
                            title="Markdown Previewer"
                            description="Live markdown editor with preview"
                            icon="📝"
                            features={[
                                'Live Markdown Preview',
                                'Syntax Highlighting',
                                'Export to HTML/PDF',
                                'GitHub Flavored Markdown support'
                            ]}
                        />
                    } />
                    
                    {/* HTML Playground */}
                    <Route path="/html-playground" element={
                        <ComingSoon 
                            title="HTML Playground"
                            description="Interactive HTML, CSS, and JavaScript playground"
                            icon="🌐"
                            features={[
                                'Live HTML/CSS/JS Preview',
                                'Split-screen Editor',
                                'Console Output',
                                'Save and Share Snippets'
                            ]}
                        />
                    } />
                    
                    {/* JavaScript Runner */}
                    <Route path="/js-runner" element={
                        <ComingSoon 
                            title="JavaScript Runner"
                            description="Execute JavaScript in a sandboxed environment"
                            icon="🟨"
                            features={[
                                'Sandboxed JavaScript Execution',
                                'Console Output Display',
                                'Error Handling',
                                'Code Templates'
                            ]}
                        />
                    } />
                    
                    {/* Regex Playground */}
                    <Route path="/regex-playground" element={
                        <ComingSoon 
                            title="Regex Playground"
                            description="Interactive regex testing environment"
                            icon="🎮"
                            features={[
                                'Interactive Regex Testing',
                                'Match Highlighting',
                                'Capture Groups Display',
                                'Regex Cheat Sheet'
                            ]}
                        />
                    } />
                </Routes>
            </Layout>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 2000,
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        duration: 4000,
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />
        </Router>
    )
}

export default App
