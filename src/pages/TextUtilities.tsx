import { useState } from 'react'
import toast from 'react-hot-toast'

type CaseType = 'camelCase' | 'snake_case' | 'kebab-case' | 'PascalCase' | 'CONSTANT_CASE' | 'dot.case' | 'Title Case' | 'Sentence case' | 'lower case' | 'UPPER CASE'

export default function TextUtilities() {
  const [text, setText] = useState('')
  const [activeTab, setActiveTab] = useState<'case' | 'counter' | 'cleaner'>('case')

  // Case Converter Functions
  const toCamelCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => 
        index === 0 ? letter.toLowerCase() : letter.toUpperCase()
      )
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9]/g, '')
  }

  const toSnakeCase = (str: string): string => {
    return str
      .replace(/([A-Z])/g, '_$1')
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '')
      .toLowerCase()
      .replace(/^_/, '')
  }

  const toKebabCase = (str: string): string => {
    return str
      .replace(/([A-Z])/g, '-$1')
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '')
      .toLowerCase()
      .replace(/^-/, '')
  }

  const toPascalCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter) => letter.toUpperCase())
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9]/g, '')
  }

  const toConstantCase = (str: string): string => {
    return str
      .replace(/([A-Z])/g, '_$1')
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '')
      .toUpperCase()
      .replace(/^_/, '')
  }

  const toDotCase = (str: string): string => {
    return str
      .replace(/([A-Z])/g, '.$1')
      .replace(/\s+/g, '.')
      .replace(/[^a-zA-Z0-9.]/g, '')
      .toLowerCase()
      .replace(/^\./, '')
  }

  const toTitleCase = (str: string): string => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const toSentenceCase = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  const convertCase = (caseType: CaseType) => {
    if (!text.trim()) {
      toast.error('Please enter some text')
      return
    }

    let result = ''
    switch (caseType) {
      case 'camelCase':
        result = toCamelCase(text)
        break
      case 'snake_case':
        result = toSnakeCase(text)
        break
      case 'kebab-case':
        result = toKebabCase(text)
        break
      case 'PascalCase':
        result = toPascalCase(text)
        break
      case 'CONSTANT_CASE':
        result = toConstantCase(text)
        break
      case 'dot.case':
        result = toDotCase(text)
        break
      case 'Title Case':
        result = toTitleCase(text)
        break
      case 'Sentence case':
        result = toSentenceCase(text)
        break
      case 'lower case':
        result = text.toLowerCase()
        break
      case 'UPPER CASE':
        result = text.toUpperCase()
        break
    }

    setText(result)
    toast.success(`Converted to ${caseType}`)
  }

  // Text Counter
  const getTextStats = () => {
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const lines = text ? text.split(/\n/).length : 0
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0
    const paragraphs = text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0

    return { characters, charactersNoSpaces, words, lines, sentences, paragraphs }
  }

  // Text Cleaner Functions
  const removeDuplicateLines = () => {
    const lines = text.split('\n')
    const unique = [...new Set(lines)]
    setText(unique.join('\n'))
    toast.success('Removed duplicate lines')
  }

  const removeDuplicateWords = () => {
    const words = text.split(/\s+/)
    const unique = [...new Set(words)]
    setText(unique.join(' '))
    toast.success('Removed duplicate words')
  }

  const removeEmptyLines = () => {
    const lines = text.split('\n').filter(line => line.trim())
    setText(lines.join('\n'))
    toast.success('Removed empty lines')
  }

  const trimLines = () => {
    const lines = text.split('\n').map(line => line.trim())
    setText(lines.join('\n'))
    toast.success('Trimmed all lines')
  }

  const removeExtraSpaces = () => {
    const cleaned = text.replace(/\s+/g, ' ').trim()
    setText(cleaned)
    toast.success('Removed extra spaces')
  }

  const sortLines = (order: 'asc' | 'desc') => {
    const lines = text.split('\n')
    const sorted = order === 'asc' 
      ? lines.sort((a, b) => a.localeCompare(b))
      : lines.sort((a, b) => b.localeCompare(a))
    setText(sorted.join('\n'))
    toast.success(`Sorted lines ${order === 'asc' ? 'ascending' : 'descending'}`)
  }

  const reverseText = () => {
    setText(text.split('').reverse().join(''))
    toast.success('Text reversed')
  }

  const reverseLines = () => {
    const lines = text.split('\n').reverse()
    setText(lines.join('\n'))
    toast.success('Lines reversed')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch {
      toast.error('Failed to copy to clipboard')
    }
  }

  const clearText = () => {
    setText('')
    toast.success('Text cleared')
  }

  const stats = getTextStats()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Text Utilities
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Convert case, count text statistics, and clean up your text
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('case')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'case'
                ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            🔡 Case Converter
          </button>
          <button
            onClick={() => setActiveTab('counter')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'counter'
                ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            🔢 Text Counter
          </button>
          <button
            onClick={() => setActiveTab('cleaner')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'cleaner'
                ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            🧹 Text Cleaner
          </button>
        </nav>
      </div>

      {/* Text Area */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Your Text
          </label>
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
            >
              📋 Copy
            </button>
            <button
              onClick={clearText}
              className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
            >
              🗑️ Clear
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter or paste your text here..."
          className="w-full h-64 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent resize-none font-mono text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>

      {/* Case Converter Tab */}
      {activeTab === 'case' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Convert to:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <button onClick={() => convertCase('camelCase')} className="px-4 py-3 bg-primary-100 hover:bg-primary-200 dark:bg-primary-900/30 dark:hover:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-lg font-medium transition-colors">
              camelCase
            </button>
            <button onClick={() => convertCase('snake_case')} className="px-4 py-3 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg font-medium transition-colors">
              snake_case
            </button>
            <button onClick={() => convertCase('kebab-case')} className="px-4 py-3 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg font-medium transition-colors">
              kebab-case
            </button>
            <button onClick={() => convertCase('PascalCase')} className="px-4 py-3 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg font-medium transition-colors">
              PascalCase
            </button>
            <button onClick={() => convertCase('CONSTANT_CASE')} className="px-4 py-3 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg font-medium transition-colors">
              CONSTANT_CASE
            </button>
            <button onClick={() => convertCase('dot.case')} className="px-4 py-3 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 rounded-lg font-medium transition-colors">
              dot.case
            </button>
            <button onClick={() => convertCase('Title Case')} className="px-4 py-3 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium transition-colors">
              Title Case
            </button>
            <button onClick={() => convertCase('Sentence case')} className="px-4 py-3 bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/30 dark:hover:bg-pink-900/50 text-pink-700 dark:text-pink-300 rounded-lg font-medium transition-colors">
              Sentence case
            </button>
            <button onClick={() => convertCase('lower case')} className="px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors">
              lower case
            </button>
            <button onClick={() => convertCase('UPPER CASE')} className="px-4 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 text-white rounded-lg font-medium transition-colors">
              UPPER CASE
            </button>
          </div>
        </div>
      )}

      {/* Text Counter Tab */}
      {activeTab === 'counter' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Text Statistics:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{stats.characters}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Characters</div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.charactersNoSpaces}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Characters (no spaces)</div>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.words}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Words</div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.lines}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Lines</div>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.sentences}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sentences</div>
            </div>
            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{stats.paragraphs}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Paragraphs</div>
            </div>
          </div>
        </div>
      )}

      {/* Text Cleaner Tab */}
      {activeTab === 'cleaner' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Clean & Transform:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <button onClick={removeDuplicateLines} className="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors">
              Remove Duplicate Lines
            </button>
            <button onClick={removeDuplicateWords} className="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors">
              Remove Duplicate Words
            </button>
            <button onClick={removeEmptyLines} className="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors">
              Remove Empty Lines
            </button>
            <button onClick={trimLines} className="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors">
              Trim All Lines
            </button>
            <button onClick={removeExtraSpaces} className="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors">
              Remove Extra Spaces
            </button>
            <button onClick={() => sortLines('asc')} className="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors">
              Sort Lines A→Z
            </button>
            <button onClick={() => sortLines('desc')} className="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors">
              Sort Lines Z→A
            </button>
            <button onClick={reverseText} className="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors">
              Reverse Text
            </button>
            <button onClick={reverseLines} className="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors">
              Reverse Lines
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
