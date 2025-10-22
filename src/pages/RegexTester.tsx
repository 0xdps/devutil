import { useState } from 'react'
import toast from 'react-hot-toast'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'

export default function RegexTester() {
  const meta = toolsMetadata.regexTester
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testString, setTestString] = useState('')
  const [matches, setMatches] = useState<string[]>([])

  const test = () => {
    try {
      const regex = new RegExp(pattern, flags)
      const found = testString.match(regex)
      setMatches(found || [])
      toast.success(`Found ${found?.length || 0} matches`)
    } catch {
      toast.error('Invalid regex pattern')
    }
  }

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        canonical={meta.canonical}
        toolName={meta.toolName}
        toolDescription={meta.toolDescription}
        toolUrl={meta.canonical}
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Regex Tester</h1>
      
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <label className="block mb-2 font-medium">Pattern</label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-gray-700 border rounded-lg mb-4 font-mono"
            placeholder="[A-Za-z0-9]+"
          />
          
          <label className="block mb-2 font-medium">Flags</label>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-gray-700 border rounded-lg mb-4"
            placeholder="g, i, m, etc."
          />

          <label className="block mb-2 font-medium">Test String</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="w-full h-32 px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg resize-none"
            placeholder="Enter text to test..."
          />

          <button onClick={test} className="mt-4 w-full px-6 py-3 bg-primary-600 text-white rounded-lg">
            Test Regex
          </button>
        </div>

        {matches.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Matches ({matches.length})</h2>
            <div className="space-y-2">
              {matches.map((match, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded font-mono">
                  {match}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}
