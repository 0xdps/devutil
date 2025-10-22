import { useState } from 'react'
import toast from 'react-hot-toast'
import * as yaml from 'js-yaml'
import Papa from 'papaparse'
import { parse as parseTOML, stringify as stringifyTOML } from 'smol-toml'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'

type DataFormat = 'json' | 'csv' | 'yaml' | 'toml' | 'xml'

interface FormatOption {
  value: DataFormat
  label: string
  icon: string
}

const formats: FormatOption[] = [
  { value: 'json', label: 'JSON', icon: '📋' },
  { value: 'csv', label: 'CSV', icon: '📊' },
  { value: 'yaml', label: 'YAML', icon: '📝' },
  { value: 'toml', label: 'TOML', icon: '⚙️' },
  { value: 'xml', label: 'XML', icon: '🔖' },
]

export default function DataTransform() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [fromFormat, setFromFormat] = useState<DataFormat>('json')
  const [toFormat, setToFormat] = useState<DataFormat>('csv')
  const [error, setError] = useState('')

  const parseJSON = (text: string) => {
    return JSON.parse(text)
  }

  const parseCSV = (text: string) => {
    const result = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    })
    
    if (result.errors.length > 0) {
      throw new Error(result.errors[0].message)
    }
    
    return result.data
  }

  const parseYAML = (text: string) => {
    return yaml.load(text)
  }

  const parseToml = (text: string) => {
    return parseTOML(text)
  }

  const parseXML = (text: string) => {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text',
      parseAttributeValue: true,
      parseTagValue: true,
      trimValues: true,
    })
    return parser.parse(text)
  }

  const toJSON = (data: unknown) => {
    return JSON.stringify(data, null, 2)
  }

  const toCSV = (data: unknown) => {
    let csvData: unknown[] = []
    
    if (Array.isArray(data)) {
      csvData = data
    } else if (typeof data === 'object' && data !== null) {
      // Convert single object to array
      csvData = [data]
    } else {
      throw new Error('Data must be an object or array of objects')
    }
    
    const csv = Papa.unparse(csvData)
    return csv
  }

  const toYAML = (data: unknown) => {
    try {
      return yaml.dump(data, {
        indent: 2,
        lineWidth: -1,
        noRefs: true,
        sortKeys: false,
      })
    } catch (err) {
      throw new Error(`YAML conversion failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const toTOML = (data: unknown) => {
    try {
      // TOML doesn't support top-level arrays, convert array to object with indexed keys
      if (Array.isArray(data)) {
        if (data.length === 0) {
          throw new Error('Cannot convert empty array to TOML')
        }
        // If it's an array of objects (like CSV data), convert to named sections
        const tomlData: Record<string, unknown> = {}
        data.forEach((item, index) => {
          tomlData[`item_${index}`] = item
        })
        return stringifyTOML(tomlData)
      }
      return stringifyTOML(data)
    } catch (err) {
      throw new Error(`TOML conversion failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const toXML = (data: unknown) => {
    try {
      const builder = new XMLBuilder({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
        textNodeName: '#text',
        format: true,
        indentBy: '  ',
        suppressEmptyNode: true,
      })
      
      // Wrap data in a root element if it's an array
      const xmlData = Array.isArray(data) 
        ? { root: { item: data } } 
        : { root: data }
      
      return builder.build(xmlData)
    } catch (err) {
      throw new Error(`XML conversion failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const convert = () => {
    try {
      setError('')
      
      if (!input.trim()) {
        setError('Please enter data to convert')
        return
      }

      // Parse input
      let data: unknown
      switch (fromFormat) {
        case 'json':
          data = parseJSON(input)
          break
        case 'csv':
          data = parseCSV(input)
          break
        case 'yaml':
          data = parseYAML(input)
          break
        case 'toml':
          data = parseToml(input)
          break
        case 'xml':
          data = parseXML(input)
          break
        default:
          throw new Error('Unsupported input format')
      }

      // Convert to output format
      let result: string
      switch (toFormat) {
        case 'json':
          result = toJSON(data)
          break
        case 'csv':
          result = toCSV(data)
          break
        case 'yaml':
          result = toYAML(data)
          break
        case 'toml':
          result = toTOML(data)
          break
        case 'xml':
          result = toXML(data)
          break
        default:
          throw new Error('Unsupported output format')
      }

      setOutput(result)
      toast.success('Conversion successful!')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Conversion failed'
      setError(errorMessage)
      setOutput('')
      toast.error('Conversion failed')
    }
  }

  const swapFormats = () => {
    setFromFormat(toFormat)
    setToFormat(fromFormat)
    setInput(output)
    setOutput(input)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      toast.success('Copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Data Transform & Converter
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Convert between JSON, CSV, YAML, and TOML formats
      </p>

      {/* Format Selectors */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            From
          </label>
          <select
            value={fromFormat}
            onChange={(e) => setFromFormat(e.target.value as DataFormat)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {formats.map((format) => (
              <option key={format.value} value={format.value}>
                {format.icon} {format.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={swapFormats}
          className="mt-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg transition-colors"
          title="Swap formats"
        >
          ⇄
        </button>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            To
          </label>
          <select
            value={toFormat}
            onChange={(e) => setToFormat(e.target.value as DataFormat)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {formats.map((format) => (
              <option key={format.value} value={format.value}>
                {format.icon} {format.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Input/Output Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input ({fromFormat.toUpperCase()})
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder={`Enter ${fromFormat.toUpperCase()} data here...`}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Output ({toFormat.toUpperCase()})
            </label>
            {output && (
              <button
                onClick={copyToClipboard}
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Copy
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            placeholder="Converted data will appear here..."
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={convert}
          className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
        >
          Convert
        </button>
        <button
          onClick={clearAll}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Format Examples */}
      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
          Format Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <strong className="text-blue-800 dark:text-blue-200">JSON:</strong>
            <pre className="mt-1 text-blue-700 dark:text-blue-300 overflow-x-auto">
{`{
  "name": "John",
  "age": 30
}`}
            </pre>
          </div>
          <div>
            <strong className="text-blue-800 dark:text-blue-200">CSV:</strong>
            <pre className="mt-1 text-blue-700 dark:text-blue-300 overflow-x-auto">
{`name,age
John,30
Jane,25`}
            </pre>
          </div>
          <div>
            <strong className="text-blue-800 dark:text-blue-200">XML:</strong>
            <pre className="mt-1 text-blue-700 dark:text-blue-300 overflow-x-auto">
{`<root>
  <item>
    <name>John</name>
    <age>30</age>
  </item>
  <item>
    <name>Jane</name>
    <age>25</age>
  </item>
</root>`}
            </pre>
          </div>
          <div>
            <strong className="text-blue-800 dark:text-blue-200">YAML:</strong>
            <pre className="mt-1 text-blue-700 dark:text-blue-300 overflow-x-auto">
{`- name: John
  age: 30
- name: Jane
  age: 25`}
            </pre>
          </div>
          <div>
            <strong className="text-blue-800 dark:text-blue-200">TOML:</strong>
            <pre className="mt-1 text-blue-700 dark:text-blue-300 overflow-x-auto">
{`[item_0]
name = "John"
age = 30

[item_1]
name = "Jane"
age = 25`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
