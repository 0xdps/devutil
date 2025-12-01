import { useState } from 'react'
import { diffJson, type Change } from 'diff'
import toast from 'react-hot-toast'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'

type JsonValue = unknown

const textAreaBase =
  'w-full min-h-[220px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500'

export default function JSONTools() {
  const meta = toolsMetadata.jsonTools

  const [formatInput, setFormatInput] = useState('')
  const [formatStatus, setFormatStatus] = useState<string | null>(null)

  const [pathInput, setPathInput] = useState('')
  const [pathQuery, setPathQuery] = useState('$.user.name')
  const [pathResult, setPathResult] = useState<string | null>(null)

  const [leftJson, setLeftJson] = useState('')
  const [rightJson, setRightJson] = useState('')
  const [diffResult, setDiffResult] = useState<Change[]>([])

  const safeParseJson = (value: string): JsonValue => {
    try {
      return JSON.parse(value)
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Invalid JSON')
    }
  }

  const handleFormat = (minify = false) => {
    if (!formatInput.trim()) {
      toast.error('Please enter JSON to format')
      return
    }

    try {
      const parsed = safeParseJson(formatInput)
      const formatted = JSON.stringify(parsed, null, minify ? 0 : 2)
      setFormatInput(formatted)
      setFormatStatus(minify ? 'Minified successfully' : 'Formatted successfully')
      toast.success(minify ? 'JSON minified' : 'JSON formatted')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid JSON'
      setFormatStatus(`Invalid JSON: ${message}`)
      toast.error('Invalid JSON')
    }
  }

  const parsePathTokens = (path: string): Array<string | number> => {
    const trimmed = path.trim().replace(/^\$\.?/, '')
    if (!trimmed) return []

    const tokens: Array<string | number> = []
    const segmentRegex = /([^\[\]]+)|\[(\d+)\]|\["([^"]+)"\]|\['([^']+)'\]/g

    const segments = trimmed.split('.').filter(Boolean)
    for (const segment of segments) {
      let match: RegExpExecArray | null
      while ((match = segmentRegex.exec(segment)) !== null) {
        if (match[1]) {
          tokens.push(match[1])
        } else if (match[2]) {
          tokens.push(Number(match[2]))
        } else if (match[3]) {
          tokens.push(match[3])
        } else if (match[4]) {
          tokens.push(match[4])
        }
      }
      segmentRegex.lastIndex = 0
    }

    return tokens
  }

  const evaluateJsonPath = (data: JsonValue, path: string) => {
    const tokens = parsePathTokens(path)
    let current: any = data

    for (const token of tokens) {
      if (current == null) {
        throw new Error('Path not found')
      }
      if (typeof token === 'number') {
        if (!Array.isArray(current)) throw new Error('Expected array for index access')
        current = current[token]
      } else {
        if (typeof current !== 'object') throw new Error('Expected object for property access')
        current = (current as Record<string, unknown>)[token]
      }
    }

    return current
  }

  const handleEvaluatePath = () => {
    if (!pathInput.trim()) {
      toast.error('Please enter JSON to query')
      return
    }
    if (!pathQuery.trim()) {
      toast.error('Please enter a path')
      return
    }

    try {
      const data = safeParseJson(pathInput)
      const result = evaluateJsonPath(data, pathQuery)
      setPathResult(JSON.stringify(result, null, 2))
      toast.success('Path evaluated')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid JSON path'
      setPathResult(`Error: ${message}`)
      toast.error('Failed to evaluate path')
    }
  }

  const handleDiff = () => {
    if (!leftJson.trim() || !rightJson.trim()) {
      toast.error('Provide both JSON inputs to compare')
      return
    }

    try {
      const left = safeParseJson(leftJson)
      const right = safeParseJson(rightJson)
      const changes = diffJson(left, right)
      setDiffResult(changes)
      toast.success('Diff generated')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid JSON'
      toast.error(`Invalid JSON: ${message}`)
    }
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

      <div className="max-w-6xl mx-auto space-y-10">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">JSON Tools</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Format, validate, diff, and query JSON with a single workspace.
          </p>
        </header>

        {/* Formatter / Validator */}
        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Formatter & Validator</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pretty-print or minify JSON and validate structure instantly.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleFormat(false)}
                className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
              >
                Format
              </button>
              <button
                onClick={() => handleFormat(true)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
              >
                Minify
              </button>
              <button
                onClick={() => copyToClipboard(formatInput)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Copy
              </button>
            </div>
          </div>

          <textarea
            className={textAreaBase}
            placeholder='{"name": "Ada", "skills": ["math", "logic"]}'
            value={formatInput}
            onChange={(e) => setFormatInput(e.target.value)}
          />
          {formatStatus && (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {formatStatus}
            </div>
          )}
        </section>

        {/* JSONPath */}
        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">JSONPath Explorer</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Query JSON using simple dotted or bracket notation. Start paths with <code>$</code>.
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100"
                value={pathQuery}
                onChange={(e) => setPathQuery(e.target.value)}
                placeholder="$.user.name"
              />
              <button
                onClick={handleEvaluatePath}
                className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
              >
                Evaluate
              </button>
              <button
                onClick={() => copyToClipboard(pathResult ?? '')}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Copy Result
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <textarea
                className={textAreaBase}
                placeholder='{"user":{"name":"Ada","projects":[{"title":"AI"}]}}'
                value={pathInput}
                onChange={(e) => setPathInput(e.target.value)}
              />
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 min-h-[220px]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result</p>
              <pre className="whitespace-pre-wrap break-words text-sm text-gray-900 dark:text-gray-100">
                {pathResult ?? 'Run a query to see results here'}
              </pre>
            </div>
          </div>
        </section>

        {/* Diff */}
        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">JSON Diff</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Compare two JSON payloads side-by-side and highlight changes.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDiff}
                className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
              >
                Compare
              </button>
              <button
                onClick={() => {
                  setLeftJson('')
                  setRightJson('')
                  setDiffResult([])
                }}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <textarea
              className={textAreaBase}
              placeholder='{"name":"Ada","role":"researcher"}'
              value={leftJson}
              onChange={(e) => setLeftJson(e.target.value)}
            />
            <textarea
              className={textAreaBase}
              placeholder='{"name":"Ada","role":"engineer"}'
              value={rightJson}
              onChange={(e) => setRightJson(e.target.value)}
            />
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Differences</p>
            {diffResult.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Run a comparison to see changes.</p>
            ) : (
              <pre className="whitespace-pre-wrap text-sm">
                {diffResult.map((part, idx) => (
                  <span
                    key={idx}
                    className={
                      part.added
                        ? 'bg-green-200/70 dark:bg-green-900/40 text-green-900 dark:text-green-100'
                        : part.removed
                          ? 'bg-red-200/70 dark:bg-red-900/40 text-red-900 dark:text-red-100'
                          : 'text-gray-900 dark:text-gray-100'
                    }
                  >
                    {part.value}
                  </span>
                ))}
              </pre>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
