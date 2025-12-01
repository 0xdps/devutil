import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'
import CustomSelect from '../components/CustomSelect'

type TabType = 'code' | 'json'
type JsonValue = unknown

const textAreaBase =
  'w-full min-h-[220px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500'

export default function CodeAndJSONTools() {
  const location = useLocation()
  // Use appropriate metadata based on route, default to codeFormatter
  const meta = location.pathname === '/json-tools' ? toolsMetadata.jsonTools : toolsMetadata.codeFormatter
  const [activeTab, setActiveTab] = useState<TabType>(location.pathname === '/json-tools' ? 'json' : 'code')

  // Code Formatter State
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState<'json' | 'html' | 'css' | 'javascript'>('json')

  // JSON Tools State (only JSONPath)
  const [pathInput, setPathInput] = useState('')
  const [pathQuery, setPathQuery] = useState('$.user.name')
  const [pathResult, setPathResult] = useState<string | null>(null)

  // Code Formatter Functions
  const beautifyHTML = (html: string): string => {
    let formatted = ''
    let indent = 0
    const tab = '  '
    
    html = html.replace(/>\s+</g, '><').trim()
    const tokens = html.split(/(<[^>]+>)/g).filter(token => token.trim())
    
    tokens.forEach(token => {
      if (token.match(/^<\/\w/)) {
        indent = Math.max(0, indent - 1)
        formatted += tab.repeat(indent) + token + '\n'
      } else if (token.match(/^<\w[^>]*[^/]>$/)) {
        formatted += tab.repeat(indent) + token + '\n'
        indent++
      } else if (token.match(/^<\w[^>]*\/>$/)) {
        formatted += tab.repeat(indent) + token + '\n'
      } else {
        const trimmed = token.trim()
        if (trimmed) {
          formatted += tab.repeat(indent) + trimmed + '\n'
        }
      }
    })
    
    return formatted.trim()
  }

  const beautifyCSS = (css: string): string => {
    let formatted = ''
    let indent = 0
    const tab = '  '
    css = css.replace(/\s+/g, ' ').trim()
    
    let i = 0
    while (i < css.length) {
      const char = css[i]
      if (char === '{') {
        formatted += ' {\n'
        indent++
        i++
        while (i < css.length && css[i] === ' ') i++
      } else if (char === '}') {
        indent = Math.max(0, indent - 1)
        formatted += '\n' + tab.repeat(indent) + '}\n'
        i++
      } else if (char === ';') {
        formatted += ';\n' + tab.repeat(indent)
        i++
        while (i < css.length && css[i] === ' ') i++
      } else {
        if (formatted.endsWith('\n') || formatted === '') {
          formatted += tab.repeat(indent)
        }
        formatted += char
        i++
      }
    }
    return formatted.replace(/\n\s*\n/g, '\n').trim()
  }

  const beautifyJS = (js: string): string => {
    let formatted = ''
    let indent = 0
    const tab = '  '
    js = js.replace(/\s+/g, ' ').trim()
    
    let i = 0
    while (i < js.length) {
      const char = js[i]
      if (char === '{') {
        formatted += ' {\n'
        indent++
        i++
        while (i < js.length && js[i] === ' ') i++
        formatted += tab.repeat(indent)
      } else if (char === '}') {
        formatted = formatted.trimEnd()
        if (!formatted.endsWith('\n')) {
          formatted += '\n'
        }
        indent = Math.max(0, indent - 1)
        formatted += tab.repeat(indent) + '}\n'
        i++
        if (i < js.length && js[i] !== '}') {
          formatted += tab.repeat(indent)
        }
      } else if (char === ';') {
        formatted += ';\n'
        i++
        while (i < js.length && js[i] === ' ') i++
        if (i < js.length && js[i] !== '}') {
          formatted += tab.repeat(indent)
        }
      } else {
        formatted += char
        i++
      }
    }
    return formatted.replace(/\n\s*\n/g, '\n').trim()
  }

  const beautify = () => {
    try {
      let formatted = ''
      switch (language) {
        case 'json':
          formatted = JSON.stringify(JSON.parse(code), null, 2)
          break
        case 'html':
          formatted = beautifyHTML(code)
          break
        case 'css':
          formatted = beautifyCSS(code)
          break
        case 'javascript':
          formatted = beautifyJS(code)
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

  // JSON Tools Functions (only JSONPath)
  const safeParseJson = (value: string): JsonValue => {
    try {
      return JSON.parse(value)
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Invalid JSON')
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

      <div className="max-w-6xl mx-auto space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Code & JSON Tools</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Format code, manipulate JSON, and more in a unified workspace.
          </p>
        </header>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === 'code'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">✨</span>
            Code Formatter
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === 'json'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">📋</span>
            JSON Tools
          </button>
        </div>

        {/* Code Formatter Tab */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <div className="mb-4">
                <div className="w-64">
                  <CustomSelect
                    value={language}
                    onChange={(val) => setLanguage(val)}
                    options={[
                      { value: 'json', label: 'JSON', icon: '📋' },
                      { value: 'html', label: 'HTML', icon: '📄' },
                      { value: 'css', label: 'CSS', icon: '🎨' },
                      { value: 'javascript', label: 'JavaScript', icon: '🟨' },
                    ]}
                  />
                </div>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg font-mono text-sm resize-none"
                placeholder="Paste your code here..."
              />

              <div className="flex gap-4">
                <button onClick={beautify} className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Beautify
                </button>
                <button onClick={minify} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Minify
                </button>
                <button
                  onClick={() => copyToClipboard(code)}
                  className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* JSON Tools Tab - Only JSONPath Explorer */}
        {activeTab === 'json' && (
          <div className="space-y-6">
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
          </div>
        )}
      </div>
    </>
  )
}

