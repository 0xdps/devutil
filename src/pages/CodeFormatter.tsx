import { useState } from 'react'
import toast from 'react-hot-toast'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'
import CustomSelect from '../components/CustomSelect'

export default function CodeFormatter() {
  const meta = toolsMetadata.codeFormatter
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState<'json' | 'html' | 'css' | 'javascript'>('json')

  const beautifyHTML = (html: string): string => {
    let formatted = ''
    let indent = 0
    const tab = '  '
    
    // Remove existing whitespace between tags
    html = html.replace(/>\s+</g, '><').trim()
    
    // Split by tags
    const tokens = html.split(/(<[^>]+>)/g).filter(token => token.trim())
    
    tokens.forEach(token => {
      if (token.match(/^<\/\w/)) {
        // Closing tag
        indent = Math.max(0, indent - 1)
        formatted += tab.repeat(indent) + token + '\n'
      } else if (token.match(/^<\w[^>]*[^/]>$/)) {
        // Opening tag
        formatted += tab.repeat(indent) + token + '\n'
        indent++
      } else if (token.match(/^<\w[^>]*\/>$/)) {
        // Self-closing tag
        formatted += tab.repeat(indent) + token + '\n'
      } else {
        // Text content
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
    
    // Remove all existing whitespace for clean processing
    css = css.replace(/\s+/g, ' ').trim()
    
    // Add newlines and indentation
    let i = 0
    while (i < css.length) {
      const char = css[i]
      
      if (char === '{') {
        formatted += ' {\n'
        indent++
        i++
        // Skip any whitespace after opening brace
        while (i < css.length && css[i] === ' ') i++
      } else if (char === '}') {
        indent = Math.max(0, indent - 1)
        formatted += '\n' + tab.repeat(indent) + '}\n'
        i++
      } else if (char === ';') {
        formatted += ';\n' + tab.repeat(indent)
        i++
        // Skip any whitespace after semicolon
        while (i < css.length && css[i] === ' ') i++
      } else {
        // Add proper indentation at the start of a line
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
    
    // Remove excessive whitespace but keep single spaces
    js = js.replace(/\s+/g, ' ').trim()
    
    let i = 0
    while (i < js.length) {
      const char = js[i]
      
      if (char === '{') {
        formatted += ' {\n'
        indent++
        i++
        // Skip whitespace after opening brace
        while (i < js.length && js[i] === ' ') i++
        formatted += tab.repeat(indent)
      } else if (char === '}') {
        // Remove trailing spaces before closing brace
        formatted = formatted.trimEnd()
        if (!formatted.endsWith('\n')) {
          formatted += '\n'
        }
        indent = Math.max(0, indent - 1)
        formatted += tab.repeat(indent) + '}\n'
        i++
        // Add indentation for next line if not at end
        if (i < js.length && js[i] !== '}') {
          formatted += tab.repeat(indent)
        }
      } else if (char === ';') {
        formatted += ';\n'
        i++
        // Skip whitespace after semicolon
        while (i < js.length && js[i] === ' ') i++
        // Add indentation for next statement
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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Code Formatter</h1>
      
      <div className="mb-4">
        <div className="w-64">
          <CustomSelect
            value={language}
            onChange={(val) => setLanguage(val)}
            options={[
              { value: 'json', label: 'JSON', icon: '📋' },
              { value: 'javascript', label: 'JavaScript', icon: '🟨' },
              { value: 'html', label: 'HTML', icon: '📄' },
              { value: 'css', label: 'CSS', icon: '🎨' },
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

      <div className="flex gap-4 mt-4">
        <button onClick={beautify} className="px-6 py-3 bg-primary-600 text-white rounded-lg">
          Beautify
        </button>
        <button onClick={minify} className="px-6 py-3 bg-green-600 text-white rounded-lg">
          Minify
        </button>
      </div>
    </div>
    </>
  )
}
