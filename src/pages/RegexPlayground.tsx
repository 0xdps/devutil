import React, { useState, useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'

type MatchInfo = {
  match: string
  index: number
  groups: string[]
}

type PatternExample = {
  name: string
  pattern: string
  description: string
  example: string
}

const patternLibrary: PatternExample[] = [
  { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', description: 'Matches email addresses', example: 'user@example.com' },
  { name: 'URL', pattern: 'https?://[^\\s]+', description: 'Matches HTTP/HTTPS URLs', example: 'https://example.com' },
  { name: 'Phone (US)', pattern: '\\d{3}-\\d{3}-\\d{4}', description: 'Matches US phone numbers', example: '123-456-7890' },
  { name: 'IP Address', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', description: 'Matches IPv4 addresses', example: '192.168.1.1' },
  { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}', description: 'Matches dates in YYYY-MM-DD format', example: '2024-01-15' },
  { name: 'Credit Card', pattern: '\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}', description: 'Matches credit card numbers', example: '1234 5678 9012 3456' },
  { name: 'Hex Color', pattern: '#[0-9A-Fa-f]{6}', description: 'Matches hex color codes', example: '#FF5733' },
  { name: 'Word Boundaries', pattern: '\\b\\w+\\b', description: 'Matches whole words', example: 'hello world' },
]

export default function RegexPlayground() {
  const meta = toolsMetadata.regexPlayground
  const [pattern, setPattern] = useState('')
  const [testText, setTestText] = useState('')
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false })
  const [matches, setMatches] = useState<MatchInfo[]>([])
  const [error, setError] = useState<string | null>(null)
  const [explanation, setExplanation] = useState('')

  const flagString = useMemo(() => {
    return Object.entries(flags)
      .filter(([_, enabled]) => enabled)
      .map(([flag]) => flag)
      .join('')
  }, [flags])

  useEffect(() => {
    if (!pattern.trim() || !testText.trim()) {
      setMatches([])
      setError(null)
      setExplanation('')
      return
    }

    try {
      const regex = new RegExp(pattern, flagString)
      const allMatches: MatchInfo[] = []
      let match: RegExpExecArray | null

      // Reset regex lastIndex for global flag
      regex.lastIndex = 0

      if (flags.g) {
        while ((match = regex.exec(testText)) !== null) {
          allMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          })
          // Prevent infinite loop
          if (match.index === regex.lastIndex) {
            regex.lastIndex++
          }
        }
      } else {
        match = regex.exec(testText)
        if (match) {
          allMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          })
        }
      }

      setMatches(allMatches)
      setError(null)

      // Generate explanation
      let exp = 'Pattern breakdown:\n\n'
      exp += `• Pattern: ${pattern}\n`
      exp += `• Flags: ${flagString || '(none)'}\n`
      exp += `• Matches found: ${allMatches.length}\n\n`

      if (pattern.includes('(')) {
        exp += 'Groups detected:\n'
        const groupMatches = pattern.matchAll(/\(([^)]+)\)/g)
        let groupIndex = 1
        for (const group of groupMatches) {
          exp += `  Group ${groupIndex}: ${group[1]}\n`
          groupIndex++
        }
      }

      setExplanation(exp)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regex pattern')
      setMatches([])
      setExplanation('')
    }
  }, [pattern, testText, flagString, flags.g])

  const highlightMatches = (text: string): React.ReactElement[] => {
    if (matches.length === 0 || !pattern.trim()) {
      return [<span key="text">{text}</span>]
    }

    const parts: Array<{ text: string; isMatch: boolean; index: number }> = []
    let lastIndex = 0

    matches.forEach((match) => {
      if (match.index > lastIndex) {
        parts.push({
          text: text.substring(lastIndex, match.index),
          isMatch: false,
          index: lastIndex,
        })
      }
      parts.push({
        text: match.match,
        isMatch: true,
        index: match.index,
      })
      lastIndex = match.index + match.match.length
    })

    if (lastIndex < text.length) {
      parts.push({
        text: text.substring(lastIndex),
        isMatch: false,
        index: lastIndex,
      })
    }

    return parts.map((part, idx) => (
      <span
        key={idx}
        className={part.isMatch ? 'bg-yellow-300 dark:bg-yellow-600/50 font-semibold' : ''}
      >
        {part.text}
      </span>
    ))
  }

  const loadPattern = (example: PatternExample) => {
    setPattern(example.pattern)
    setTestText(example.example)
    toast.success(`Loaded: ${example.name}`)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard')
    } catch {
      toast.error('Copy failed')
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
      <div className="max-w-7xl mx-auto space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Regex Playground</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Interactive environment for testing and learning regular expressions
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Playground */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pattern Input */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Regex Pattern</h2>
                <button
                  onClick={() => copyToClipboard(pattern)}
                  className="px-3 py-1 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Copy Pattern
                </button>
              </div>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter regex pattern (e.g., [a-z]+)"
              />
              {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg text-red-800 dark:text-red-300 text-sm">
                  {error}
                </div>
              )}

              {/* Flags */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Flags:</span>
                {(['g', 'i', 'm', 's'] as const).map((flag) => (
                  <label key={flag} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={flags[flag]}
                      onChange={(e) => setFlags({ ...flags, [flag]: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm font-mono">{flag}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {flag === 'g' && '(global)'}
                      {flag === 'i' && '(case-insensitive)'}
                      {flag === 'm' && '(multiline)'}
                      {flag === 's' && '(dotall)'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Test Text */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Test Text</h2>
                <button
                  onClick={() => copyToClipboard(testText)}
                  className="px-3 py-1 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Copy Text
                </button>
              </div>
              <textarea
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                className="w-full min-h-[200px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter text to test against the regex pattern..."
              />
            </div>

            {/* Highlighted Results */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Highlighted Results ({matches.length} {matches.length === 1 ? 'match' : 'matches'})
              </h2>
              <div className="min-h-[150px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-mono text-sm whitespace-pre-wrap">
                {testText ? highlightMatches(testText) : <span className="text-gray-400">Enter text to see highlighted matches</span>}
              </div>
            </div>

            {/* Match Details */}
            {matches.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Match Details</h2>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {matches.map((match, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="font-mono text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Match {idx + 1}:</span>{' '}
                        <span className="text-primary-600 dark:text-primary-400 font-semibold">{match.match}</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Position: {match.index} - {match.index + match.match.length - 1}
                      </div>
                      {match.groups.length > 0 && (
                        <div className="mt-2 text-xs">
                          <span className="text-gray-500 dark:text-gray-400">Groups:</span>
                          {match.groups.map((group, gIdx) => (
                            <span key={gIdx} className="ml-2 text-blue-600 dark:text-blue-400">
                              Group {gIdx + 1}: {group || '(empty)'}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pattern Library */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pattern Library</h2>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {patternLibrary.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => loadPattern(example)}
                    className="w-full text-left p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="font-semibold text-sm text-gray-900 dark:text-white">{example.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-mono">{example.pattern}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{example.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Explanation */}
            {explanation && (
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Explanation</h2>
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
                  {explanation}
                </pre>
              </div>
            )}

            {/* Quick Reference */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Reference</h2>
              <div className="text-sm space-y-2">
                <div>
                  <span className="font-mono font-semibold">.</span> - Any character
                </div>
                <div>
                  <span className="font-mono font-semibold">\d</span> - Digit
                </div>
                <div>
                  <span className="font-mono font-semibold">\w</span> - Word character
                </div>
                <div>
                  <span className="font-mono font-semibold">\s</span> - Whitespace
                </div>
                <div>
                  <span className="font-mono font-semibold">[abc]</span> - Character class
                </div>
                <div>
                  <span className="font-mono font-semibold">^</span> - Start of line
                </div>
                <div>
                  <span className="font-mono font-semibold">$</span> - End of line
                </div>
                <div>
                  <span className="font-mono font-semibold">*</span> - Zero or more
                </div>
                <div>
                  <span className="font-mono font-semibold">+</span> - One or more
                </div>
                <div>
                  <span className="font-mono font-semibold">?</span> - Zero or one
                </div>
                <div>
                  <span className="font-mono font-semibold">( )</span> - Capturing group
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
