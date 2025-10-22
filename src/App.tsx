import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Home from './pages/Home'
import DataTransform from './pages/DataTransform'
import Encoding from './pages/Encoding'
import TextUtilities from './pages/TextUtilities'
import GeneratorToolkit from './pages/GeneratorToolkit'
import HashVerify from './pages/HashVerify'
import JWTDecoder from './pages/JWTDecoder'
import CodeFormatter from './pages/CodeFormatter'
import JSONTools from './pages/JSONTools'
import RegexTester from './pages/RegexTester'
import CodeDiff from './pages/CodeDiff'
import ColorPicker from './pages/ColorPicker'
import URLTools from './pages/URLTools'
import SEOGenerator from './pages/SEOGenerator'
import QRCodeGenerator from './pages/QRCodeGenerator'
import TimestampTools from './pages/TimestampTools'
import MarkdownPreviewer from './pages/MarkdownPreviewer'
import HTMLPlayground from './pages/HTMLPlayground'
import JavaScriptRunner from './pages/JavaScriptRunner'
import RegexPlayground from './pages/RegexPlayground'

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/data-transform" element={<DataTransform />} />
                    <Route path="/encoding" element={<Encoding />} />
                    <Route path="/text-utilities" element={<TextUtilities />} />
                    <Route path="/generators" element={<GeneratorToolkit />} />
                    <Route path="/hash-verify" element={<HashVerify />} />
                    <Route path="/jwt-decoder" element={<JWTDecoder />} />
                    <Route path="/code-formatter" element={<CodeFormatter />} />
                    <Route path="/json-tools" element={<JSONTools />} />
                    <Route path="/regex-tester" element={<RegexTester />} />
                    <Route path="/code-diff" element={<CodeDiff />} />
                    <Route path="/color-picker" element={<ColorPicker />} />
                    <Route path="/url-tools" element={<URLTools />} />
                    <Route path="/seo-generator" element={<SEOGenerator />} />
                    <Route path="/qr-code" element={<QRCodeGenerator />} />
                    <Route path="/timestamp-tools" element={<TimestampTools />} />
                    <Route path="/markdown-previewer" element={<MarkdownPreviewer />} />
                    <Route path="/html-playground" element={<HTMLPlayground />} />
                    <Route path="/js-runner" element={<JavaScriptRunner />} />
                    <Route path="/regex-playground" element={<RegexPlayground />} />
                </Routes>
            </Layout>
            <Toaster position="top-right" />
        </Router>
    )
}

export default App

