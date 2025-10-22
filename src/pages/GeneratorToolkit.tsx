import { useState } from 'react'
import { v1 as uuidv1, v4 as uuidv4, v5 as uuidv5 } from 'uuid'
import toast from 'react-hot-toast'

export default function GeneratorToolkit() {
  const [activeTab, setActiveTab] = useState<'uuid' | 'random' | 'lorem'>('uuid')
  
  // UUID States
  const [uuidType, setUuidType] = useState<'v1' | 'v4' | 'v5'>('v4')
  const [uuidCount, setUuidCount] = useState(1)
  const [uuidNamespace] = useState('6ba7b810-9dad-11d1-80b4-00c04fd430c8') // DNS namespace
  const [uuidName, setUuidName] = useState('example.com')
  const [generatedUuids, setGeneratedUuids] = useState<string[]>([])
  
  // Random States
  const [randomType, setRandomType] = useState<'string' | 'number' | 'hex'>('string')
  const [randomLength, setRandomLength] = useState(16)
  const [randomMin, setRandomMin] = useState(0)
  const [randomMax, setRandomMax] = useState(100)
  const [randomIncludeUppercase, setRandomIncludeUppercase] = useState(true)
  const [randomIncludeLowercase, setRandomIncludeLowercase] = useState(true)
  const [randomIncludeNumbers, setRandomIncludeNumbers] = useState(true)
  const [randomIncludeSymbols, setRandomIncludeSymbols] = useState(true)
  const [generatedRandom, setGeneratedRandom] = useState('')
  
  // Lorem States
  const [loremType, setLoremType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const [loremCount, setLoremCount] = useState(3)
  const [generatedLorem, setGeneratedLorem] = useState('')

  const uuidInfo = {
    v1: 'Time-based UUID. Includes timestamp and MAC address. Good for database keys.',
    v4: 'Random UUID. Most common. 122 random bits. Secure and collision-resistant.',
    v5: 'Name-based UUID using SHA-1. Same input always generates same UUID. Reproducible.'
  }

  const randomInfo = {
    string: 'Customizable random string with character type selection. Perfect for passwords, tokens, and secure keys with symbols.',
    number: 'Random integer within specified range. Uses Math.random().',
    hex: 'Hexadecimal string using cryptographically secure random bytes. Great for API keys and tokens.'
  }

  const loremInfo = {
    paragraphs: 'Generate full paragraphs with multiple sentences. Good for content mockups.',
    sentences: 'Generate individual sentences. Perfect for short text placeholders.',
    words: 'Generate random words. Useful for testing word wrapping and layouts.'
  }

  // UUID Generator
  const generateUuid = () => {
    const uuids: string[] = []
    for (let i = 0; i < uuidCount; i++) {
      let uuid = ''
      switch (uuidType) {
        case 'v1':
          uuid = uuidv1()
          break
        case 'v4':
          uuid = uuidv4()
          break
        case 'v5':
          uuid = uuidv5(uuidName, uuidNamespace)
          break
      }
      uuids.push(uuid)
    }
    setGeneratedUuids(uuids)
    toast.success(`Generated ${uuids.length} UUID${uuids.length > 1 ? 's' : ''}`)
  }

  // Random Generator
  const generateRandom = () => {
    let result = ''
    
    switch (randomType) {
      case 'string': {
        let charset = ''
        if (randomIncludeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        if (randomIncludeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
        if (randomIncludeNumbers) charset += '0123456789'
        if (randomIncludeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'
        
        if (!charset) {
          toast.error('Please select at least one character type')
          return
        }
        
        const array = new Uint32Array(randomLength)
        crypto.getRandomValues(array)
        for (let i = 0; i < randomLength; i++) {
          result += charset[array[i] % charset.length]
        }
        break
      }
      case 'number': {
        const num = Math.floor(Math.random() * (randomMax - randomMin + 1)) + randomMin
        result = num.toString()
        break
      }
      case 'hex': {
        const hexArray = new Uint8Array(randomLength)
        crypto.getRandomValues(hexArray)
        result = Array.from(hexArray)
          .map(b => b.toString(16).padStart(2, '0'))
          .join('')
        break
      }
    }
    
    setGeneratedRandom(result)
    toast.success('Random value generated')
  }

  // Lorem Ipsum Generator
  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ]

  const generateLoremSentence = () => {
    const length = Math.floor(Math.random() * 10) + 5
    const words = []
    for (let i = 0; i < length; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
    }
    return words.join(' ').charAt(0).toUpperCase() + words.join(' ').slice(1) + '.'
  }

  const generateLoremParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 4) + 3
    const sentences = []
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateLoremSentence())
    }
    return sentences.join(' ')
  }

  const generateLorem = () => {
    let result = ''
    
    switch (loremType) {
      case 'paragraphs': {
        const paragraphs = []
        for (let i = 0; i < loremCount; i++) {
          paragraphs.push(generateLoremParagraph())
        }
        result = paragraphs.join('\n\n')
        break
      }
      case 'sentences': {
        const sentences = []
        for (let i = 0; i < loremCount; i++) {
          sentences.push(generateLoremSentence())
        }
        result = sentences.join(' ')
        break
      }
      case 'words': {
        const words = []
        for (let i = 0; i < loremCount; i++) {
          words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
        }
        result = words.join(' ')
        break
      }
    }
    
    setGeneratedLorem(result)
    toast.success('Lorem ipsum generated')
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch {
      toast.error('Failed to copy to clipboard')
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Generator Toolkit
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate UUIDs, secure passwords, random values, and Lorem Ipsum text
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('uuid')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'uuid'
                ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            🆔 UUID Generator
          </button>
          <button
            onClick={() => setActiveTab('random')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'random'
                ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            🎲 Random Generator
          </button>
          <button
            onClick={() => setActiveTab('lorem')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'lorem'
                ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            📝 Lorem Ipsum
          </button>
        </nav>
      </div>

      {/* UUID Generator Tab */}
      {activeTab === 'uuid' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">UUID Generator</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  UUID Version
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={uuidType === 'v1'}
                      onChange={() => setUuidType('v1')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">v1 (Timestamp)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={uuidType === 'v4'}
                      onChange={() => setUuidType('v4')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">v4 (Random)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={uuidType === 'v5'}
                      onChange={() => setUuidType('v5')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">v5 (Name-based)</span>
                  </label>
                </div>
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    ℹ️ {uuidInfo[uuidType]}
                  </p>
                </div>
              </div>

              {uuidType === 'v5' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name for v5 UUID
                  </label>
                  <input
                    type="text"
                    value={uuidName}
                    onChange={(e) => setUuidName(e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="example.com"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of UUIDs: {uuidCount}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={uuidCount}
                  onChange={(e) => setUuidCount(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={generateUuid}
                className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                Generate UUID{uuidCount > 1 ? 's' : ''}
              </button>
            </div>
          </div>

          {generatedUuids.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generated UUIDs</h3>
                <button
                  onClick={() => copyToClipboard(generatedUuids.join('\n'))}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
                >
                  📋 Copy All
                </button>
              </div>
              <div className="space-y-2">
                {generatedUuids.map((uuid, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded font-mono text-sm">
                    <span className="text-gray-900 dark:text-white">{uuid}</span>
                    <button
                      onClick={() => copyToClipboard(uuid)}
                      className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
                    >
                      📋
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Random Generator Tab */}
      {activeTab === 'random' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Random Generator</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={randomType === 'string'}
                      onChange={() => setRandomType('string')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">String</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={randomType === 'number'}
                      onChange={() => setRandomType('number')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Number</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={randomType === 'hex'}
                      onChange={() => setRandomType('hex')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Hex</span>
                  </label>
                </div>
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    ℹ️ {randomInfo[randomType]}
                  </p>
                </div>
              </div>

              {randomType === 'string' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Length: {randomLength}
                    </label>
                    <input
                      type="range"
                      min="8"
                      max="128"
                      value={randomLength}
                      onChange={(e) => setRandomLength(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Character Types
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <input
                          type="checkbox"
                          checked={randomIncludeUppercase}
                          onChange={(e) => setRandomIncludeUppercase(e.target.checked)}
                          className="mr-3 w-4 h-4"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Uppercase (A-Z)</span>
                      </label>
                      <label className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <input
                          type="checkbox"
                          checked={randomIncludeLowercase}
                          onChange={(e) => setRandomIncludeLowercase(e.target.checked)}
                          className="mr-3 w-4 h-4"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Lowercase (a-z)</span>
                      </label>
                      <label className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <input
                          type="checkbox"
                          checked={randomIncludeNumbers}
                          onChange={(e) => setRandomIncludeNumbers(e.target.checked)}
                          className="mr-3 w-4 h-4"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Numbers (0-9)</span>
                      </label>
                      <label className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <input
                          type="checkbox"
                          checked={randomIncludeSymbols}
                          onChange={(e) => setRandomIncludeSymbols(e.target.checked)}
                          className="mr-3 w-4 h-4"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Symbols (!@#$...)</span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {randomType === 'hex' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bytes: {randomLength}
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="64"
                    value={randomLength}
                    onChange={(e) => setRandomLength(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}

              {randomType === 'number' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Min
                    </label>
                    <input
                      type="number"
                      value={randomMin}
                      onChange={(e) => setRandomMin(Number(e.target.value))}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max
                    </label>
                    <input
                      type="number"
                      value={randomMax}
                      onChange={(e) => setRandomMax(Number(e.target.value))}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={generateRandom}
                className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                Generate Random Value
              </button>
            </div>
          </div>

          {generatedRandom && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generated Value</h3>
                <button
                  onClick={() => copyToClipboard(generatedRandom)}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
                >
                  📋 Copy
                </button>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded font-mono break-all">
                <span className="text-gray-900 dark:text-white">{generatedRandom}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Lorem Ipsum Tab */}
      {activeTab === 'lorem' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Lorem Ipsum Generator</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Generate
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={loremType === 'paragraphs'}
                      onChange={() => setLoremType('paragraphs')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Paragraphs</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={loremType === 'sentences'}
                      onChange={() => setLoremType('sentences')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Sentences</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={loremType === 'words'}
                      onChange={() => setLoremType('words')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Words</span>
                  </label>
                </div>
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    ℹ️ {loremInfo[loremType]}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Count: {loremCount}
                </label>
                <input
                  type="range"
                  min="1"
                  max={loremType === 'words' ? 100 : loremType === 'sentences' ? 20 : 10}
                  value={loremCount}
                  onChange={(e) => setLoremCount(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={generateLorem}
                className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                Generate Lorem Ipsum
              </button>
            </div>
          </div>

          {generatedLorem && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generated Text</h3>
                <button
                  onClick={() => copyToClipboard(generatedLorem)}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
                >
                  📋 Copy
                </button>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded whitespace-pre-wrap">
                <span className="text-gray-900 dark:text-white">{generatedLorem}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
