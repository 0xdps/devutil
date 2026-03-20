import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PWAUpdatePrompt from "./components/PWAUpdatePrompt";

// Lazy load all page components for code splitting
const DataTransform = lazy(() => import("./pages/DataTransform"));
const Encoding = lazy(() => import("./pages/Encoding"));
const TextUtilities = lazy(() => import("./pages/TextUtilities"));
const GeneratorToolkit = lazy(() => import("./pages/GeneratorToolkit"));
const HashVerify = lazy(() => import("./pages/HashVerify"));
const JWTDecoder = lazy(() => import("./pages/JWTDecoder"));
const CodeAndJSONTools = lazy(() => import("./pages/CodeAndJSONTools"));
const RegexTester = lazy(() => import("./pages/RegexTester"));
const CodeDiff = lazy(() => import("./pages/CodeDiff"));
const ColorPicker = lazy(() => import("./pages/ColorPicker"));
const URLTools = lazy(() => import("./pages/URLTools"));
const SEOGenerator = lazy(() => import("./pages/SEOGenerator"));
const QRCodeGenerator = lazy(() => import("./pages/QRCodeGenerator"));
const TimestampTools = lazy(() => import("./pages/TimestampTools"));
const TimezoneCompare = lazy(() => import("./pages/TimezoneCompare"));
const MarkdownPreviewer = lazy(() => import("./pages/MarkdownPreviewer"));
const HTMLPlayground = lazy(() => import("./pages/HTMLPlayground"));
const JavaScriptRunner = lazy(() => import("./pages/JavaScriptRunner"));
const RegexPlayground = lazy(() => import("./pages/RegexPlayground"));
const Contribution = lazy(() => import("./pages/Contribution"));
const NotFound = lazy(() => import("./pages/NotFound"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      <p className="mt-4 text-gray-400">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data-transform" element={<DataTransform />} />
            <Route path="/encoding" element={<Encoding />} />
            <Route path="/text-utilities" element={<TextUtilities />} />
            <Route path="/generators" element={<GeneratorToolkit />} />
            <Route path="/hash-verify" element={<HashVerify />} />
            <Route path="/jwt-decoder" element={<JWTDecoder />} />
            <Route path="/code-formatter" element={<CodeAndJSONTools />} />
            <Route path="/json-tools" element={<CodeAndJSONTools />} />
            <Route path="/code-json-tools" element={<CodeAndJSONTools />} />
            <Route path="/regex-tester" element={<RegexTester />} />
            <Route path="/code-diff" element={<CodeDiff />} />
            <Route path="/color-picker" element={<ColorPicker />} />
            <Route path="/url-tools" element={<URLTools />} />
            <Route path="/seo-generator" element={<SEOGenerator />} />
            <Route path="/qr-code" element={<QRCodeGenerator />} />
            <Route path="/timestamp-tools" element={<TimestampTools />} />
            <Route path="/timezone-compare" element={<TimezoneCompare />} />
            <Route path="/markdown-previewer" element={<MarkdownPreviewer />} />
            <Route path="/html-playground" element={<HTMLPlayground />} />
            <Route path="/js-runner" element={<JavaScriptRunner />} />
            <Route path="/regex-playground" element={<RegexPlayground />} />
            <Route path="/contribute" element={<Contribution />} />
            {/* 404 - Must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
      <Toaster position="top-right" />
      <PWAUpdatePrompt />
    </Router>
  );
}

export default App;
