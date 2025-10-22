import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import JsonFormatter from './pages/JsonFormatter'
import Base64Tool from './pages/Base64Tool'

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/json-formatter" element={<JsonFormatter />} />
                    <Route path="/base64" element={<Base64Tool />} />
                    {/* Add more routes as you build more tools */}
                </Routes>
            </Layout>
        </Router>
    )
}

export default App
