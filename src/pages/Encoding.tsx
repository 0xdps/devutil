import { useState } from 'react'
import toast from 'react-hot-toast'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'

type EncodingType = 'base64' | 'url' | 'html' | 'base32' | 'base58' | 'datauri'

interface EncodingOption {
  value: EncodingType
  label: string
  icon: string
}

const encodingTypes: EncodingOption[] = [
  { value: 'base64', label: 'Base64', icon: '🔤' },
  { value: 'url', label: 'URL', icon: '🔗' },
  { value: 'html', label: 'HTML Entities', icon: '🏷️' },
  { value: 'base32', label: 'Base32', icon: '🔢' },
  { value: 'base58', label: 'Base58', icon: '💱' },
  { value: 'datauri', label: 'Data URI', icon: '📦' },
]

export default function Encoding() {
  const meta = toolsMetadata.encoding
  
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [selectedType, setSelectedType] = useState<EncodingType>('base64')
  const [error, setError] = useState('')

  // Base64 encoding/decoding
  const encodeBase64 = (text: string): string => {
    return btoa(unescape(encodeURIComponent(text)))
  }

  const decodeBase64 = (text: string): string => {
    return decodeURIComponent(escape(atob(text)))
  }

  // URL encoding/decoding
  const encodeURL = (text: string): string => {
    return encodeURIComponent(text)
  }

  const decodeURL = (text: string): string => {
    return decodeURIComponent(text)
  }

  // HTML entities encoding/decoding
  const encodeHTML = (text: string): string => {
    const textarea = document.createElement('textarea')
    textarea.textContent = text
    return textarea.innerHTML
  }

  const decodeHTML = (text: string): string => {
    const textarea = document.createElement('textarea')
    textarea.innerHTML = text
    return textarea.textContent || ''
  }

  // Base32 encoding/decoding (RFC 4648)
  const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  
  const encodeBase32 = (text: string): string => {
    const bytes = new TextEncoder().encode(text)
    let bits = ''
    for (const byte of bytes) {
      bits += byte.toString(2).padStart(8, '0')
    }
    
    let result = ''
    for (let i = 0; i < bits.length; i += 5) {
      const chunk = bits.slice(i, i + 5).padEnd(5, '0')
      result += base32Chars[parseInt(chunk, 2)]
    }
    
    // Add padding
    while (result.length % 8 !== 0) {
      result += '='
    }
    
    return result
  }

  const decodeBase32 = (text: string): string => {
    // Remove padding
    const input = text.replace(/=+$/, '')
    let bits = ''
    
    for (const char of input.toUpperCase()) {
      const index = base32Chars.indexOf(char)
      if (index === -1) throw new Error('Invalid Base32 character')
      bits += index.toString(2).padStart(5, '0')
    }
    
    const bytes: number[] = []
    for (let i = 0; i < bits.length; i += 8) {
      if (i + 8 <= bits.length) {
        bytes.push(parseInt(bits.slice(i, i + 8), 2))
      }
    }
    
    return new TextDecoder().decode(new Uint8Array(bytes))
  }

  // Base58 encoding/decoding (Bitcoin alphabet)
  const base58Chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  
  const encodeBase58 = (text: string): string => {
    const bytes = new TextEncoder().encode(text)
    let num = BigInt(0)
    
    for (const byte of bytes) {
      num = num * BigInt(256) + BigInt(byte)
    }
    
    let result = ''
    while (num > 0) {
      const remainder = num % BigInt(58)
      result = base58Chars[Number(remainder)] + result
      num = num / BigInt(58)
    }
    
    // Handle leading zeros
    for (const byte of bytes) {
      if (byte === 0) result = '1' + result
      else break
    }
    
    return result || '1'
  }

  const decodeBase58 = (text: string): string => {
    let num = BigInt(0)
    
    for (const char of text) {
      const index = base58Chars.indexOf(char)
      if (index === -1) throw new Error('Invalid Base58 character')
      num = num * BigInt(58) + BigInt(index)
    }
    
    const bytes: number[] = []
    while (num > 0) {
      bytes.unshift(Number(num % BigInt(256)))
      num = num / BigInt(256)
    }
    
    // Handle leading '1's
    for (const char of text) {
      if (char === '1') bytes.unshift(0)
      else break
    }
    
    return new TextDecoder().decode(new Uint8Array(bytes))
  }

  // Data URI encoding
  const encodeDataURI = (text: string): string => {
    const encoded = encodeURIComponent(text)
    return `data:text/plain;charset=utf-8,${encoded}`
  }

  const decodeDataURI = (text: string): string => {
    const match = text.match(/^data:.*?,(.*)/s)
    if (!match) throw new Error('Invalid Data URI format')
    return decodeURIComponent(match[1])
  }

  const handleEncode = () => {
    try {
      setError('')
      if (!input.trim()) {
        setError('Please enter text to encode')
        return
      }

      let result = ''
      switch (selectedType) {
        case 'base64':
          result = encodeBase64(input)
          break
        case 'url':
          result = encodeURL(input)
          break
        case 'html':
          result = encodeHTML(input)
          break
        case 'base32':
          result = encodeBase32(input)
          break
        case 'base58':
          result = encodeBase58(input)
          break
        case 'datauri':
          result = encodeDataURI(input)
          break
      }

      setOutput(result)
      toast.success('Encoded successfully!')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Encoding failed'
      setError(errorMessage)
      setOutput('')
      toast.error('Encoding failed')
    }
  }

  const handleDecode = () => {
    try {
      setError('')
      if (!input.trim()) {
        setError('Please enter text to decode')
        return
      }

      let result = ''
      switch (selectedType) {
        case 'base64':
          result = decodeBase64(input)
          break
        case 'url':
          result = decodeURL(input)
          break
        case 'html':
          result = decodeHTML(input)
          break
        case 'base32':
          result = decodeBase32(input)
          break
        case 'base58':
          result = decodeBase58(input)
          break
        case 'datauri':
          result = decodeDataURI(input)
          break
      }

      setOutput(result)
      toast.success('Decoded successfully!')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Decoding failed'
      setError(errorMessage)
      setOutput('')
      toast.error('Decoding failed')
    }
  }

  const swap = () => {
    const temp = input
    setInput(output)
    setOutput(temp)
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
    } catch {
      toast.error('Failed to copy to clipboard')
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
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Encoding/Decoding
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Encode and decode text using various encoding schemes
          </p>
        </div>

      {/* Encoding Type Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Encoding Type
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {encodingTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedType === type.value
                  ? 'bg-primary-600 text-white dark:bg-primary-500'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span className="mr-1">{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text here..."
          className="w-full h-48 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent resize-none font-mono text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={handleEncode}
          className="px-6 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
        >
          Encode →
        </button>
        <button
          onClick={handleDecode}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
        >
          ← Decode
        </button>
        <button
          onClick={swap}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
        >
          ⇄ Swap
        </button>
        <button
          onClick={clearAll}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Output Area */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Output
          </label>
          {output && (
            <button
              onClick={copyToClipboard}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
            >
              📋 Copy
            </button>
          )}
        </div>
        <textarea
          value={output}
          readOnly
          placeholder="Output will appear here..."
          className="w-full h-48 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg resize-none font-mono text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>

      {/* Info Section */}
      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
          Encoding Types
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong className="text-blue-800 dark:text-blue-200">Base64:</strong>
            <p className="text-blue-700 dark:text-blue-300 mt-1">
              Encodes binary data using 64 ASCII characters. Commonly used for email attachments and data URLs.
            </p>
          </div>
          <div>
            <strong className="text-blue-800 dark:text-blue-200">URL:</strong>
            <p className="text-blue-700 dark:text-blue-300 mt-1">
              Encodes special characters for safe use in URLs. Converts spaces to %20, etc.
            </p>
          </div>
          <div>
            <strong className="text-blue-800 dark:text-blue-200">HTML Entities:</strong>
            <p className="text-blue-700 dark:text-blue-300 mt-1">
              Converts special HTML characters (&lt;, &gt;, &amp;) to their entity equivalents.
            </p>
          </div>
          <div>
            <strong className="text-blue-800 dark:text-blue-200">Base32:</strong>
            <p className="text-blue-700 dark:text-blue-300 mt-1">
              Uses 32 characters (A-Z, 2-7). More human-readable than Base64, case-insensitive.
            </p>
          </div>
          <div>
            <strong className="text-blue-800 dark:text-blue-200">Base58:</strong>
            <p className="text-blue-700 dark:text-blue-300 mt-1">
              Used in Bitcoin addresses. Excludes similar-looking characters (0, O, I, l).
            </p>
          </div>
          <div>
            <strong className="text-blue-800 dark:text-blue-200">Data URI:</strong>
            <p className="text-blue-700 dark:text-blue-300 mt-1">
              Creates inline data URLs for embedding content directly in HTML/CSS.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
