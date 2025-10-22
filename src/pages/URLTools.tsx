import { useState } from 'react'
import toast from 'react-hot-toast'

export default function URLTools() {
  const [url, setUrl] = useState('')
  const [parsed, setParsed] = useState<URL | null>(null)

  const parseURL = () => {
    try {
      const urlObj = new URL(url)
      setParsed(urlObj)
      toast.success('URL parsed')
    } catch {
      toast.error('Invalid URL')
    }
  }

  const encode = () => {
    setUrl(encodeURIComponent(url))
    toast.success('Encoded')
  }

  const decode = () => {
    try {
      setUrl(decodeURIComponent(url))
      toast.success('Decoded')
    } catch {
      toast.error('Invalid encoded URL')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">URL Tools</h1>
      
      <div className="space-y-6">
        <div>
          <textarea
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full h-32 px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg resize-none font-mono"
            placeholder="Enter URL..."
          />
          <div className="flex gap-4 mt-4">
            <button onClick={parseURL} className="px-6 py-3 bg-primary-600 text-white rounded-lg">
              Parse
            </button>
            <button onClick={encode} className="px-6 py-3 bg-green-600 text-white rounded-lg">
              Encode
            </button>
            <button onClick={decode} className="px-6 py-3 bg-blue-600 text-white rounded-lg">
              Decode
            </button>
          </div>
        </div>

        {parsed && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border space-y-2">
            <h2 className="text-xl font-semibold mb-4">Parsed URL</h2>
            <div><strong>Protocol:</strong> {parsed.protocol}</div>
            <div><strong>Host:</strong> {parsed.host}</div>
            <div><strong>Hostname:</strong> {parsed.hostname}</div>
            <div><strong>Port:</strong> {parsed.port || '(default)'}</div>
            <div><strong>Pathname:</strong> {parsed.pathname}</div>
            <div><strong>Search:</strong> {parsed.search || '(none)'}</div>
            <div><strong>Hash:</strong> {parsed.hash || '(none)'}</div>
          </div>
        )}
      </div>
    </div>
  )
}
