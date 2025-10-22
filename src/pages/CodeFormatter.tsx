import { useState } from 'react'
import toast from 'react-hot-toast'

export default function CodeFormatter() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState<'json' | 'html' | 'css' | 'javascript'>('json')

  const beautify = () => {
    try {
      let formatted = ''
      switch (language) {
        case 'json':
          formatted = JSON.stringify(JSON.parse(code), null, 2)
          break
        case 'javascript':
        case 'css':
        case 'html':
          // Basic beautification
          formatted = code
            .replace(/([{};,])/g, '$1\n')
            .replace(/\n\s*\n/g, '\n')
            .split('\n')
            .map(line => line.trim())
            .join('\n')
          break
      }
      setCode(formatted)
      toast.success('Code beautified')
    } catch {
      toast.error('Failed to beautify code')
    }
  }

  const minify = () => {
    try {
      let minified = ''
      switch (language) {
        case 'json':
          minified = JSON.stringify(JSON.parse(code))
          break
        default:
          minified = code.replace(/\s+/g, ' ').replace(/\n/g, '').trim()
      }
      setCode(minified)
      toast.success('Code minified')
    } catch {
      toast.error('Failed to minify code')
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Code Formatter</h1>
      
      <div className="mb-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'json' | 'html' | 'css' | 'javascript')}
          className="px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg"
        >
          <option value="json">JSON</option>
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-96 px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg font-mono text-sm resize-none"
        placeholder="Paste your code here..."
      />

      <div className="flex gap-4 mt-4">
        <button onClick={beautify} className="px-6 py-3 bg-primary-600 text-white rounded-lg">
          Beautify
        </button>
        <button onClick={minify} className="px-6 py-3 bg-green-600 text-white rounded-lg">
          Minify
        </button>
      </div>
    </div>
  )
}
