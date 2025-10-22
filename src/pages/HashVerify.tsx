import { useState } from 'react'
import CryptoJS from 'crypto-js'
import toast from 'react-hot-toast'

export default function HashVerify() {
  const [activeTab, setActiveTab] = useState<'hash' | 'hmac' | 'password'>('hash')
  
  // Hash States
  const [hashInput, setHashInput] = useState('')
  const [hashAlgorithm, setHashAlgorithm] = useState<'md5' | 'sha1' | 'sha256' | 'sha512'>('sha256')
  const [hashOutput, setHashOutput] = useState('')
  
  // HMAC States
  const [hmacInput, setHmacInput] = useState('')
  const [hmacKey, setHmacKey] = useState('')
  const [hmacAlgorithm, setHmacAlgorithm] = useState<'sha1' | 'sha256' | 'sha512'>('sha256')
  const [hmacOutput, setHmacOutput] = useState('')
  
  // Password States
  const [password, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number
    label: string
    color: string
    feedback: string[]
  } | null>(null)

  const generateHash = () => {
    if (!hashInput) {
      toast.error('Please enter text to hash')
      return
    }

    let hash = ''
    switch (hashAlgorithm) {
      case 'md5':
        hash = CryptoJS.MD5(hashInput).toString()
        break
      case 'sha1':
        hash = CryptoJS.SHA1(hashInput).toString()
        break
      case 'sha256':
        hash = CryptoJS.SHA256(hashInput).toString()
        break
      case 'sha512':
        hash = CryptoJS.SHA512(hashInput).toString()
        break
    }

    setHashOutput(hash)
    toast.success('Hash generated')
  }

  const generateHmac = () => {
    if (!hmacInput) {
      toast.error('Please enter message')
      return
    }
    if (!hmacKey) {
      toast.error('Please enter secret key')
      return
    }

    let hmac = ''
    switch (hmacAlgorithm) {
      case 'sha1':
        hmac = CryptoJS.HmacSHA1(hmacInput, hmacKey).toString()
        break
      case 'sha256':
        hmac = CryptoJS.HmacSHA256(hmacInput, hmacKey).toString()
        break
      case 'sha512':
        hmac = CryptoJS.HmacSHA512(hmacInput, hmacKey).toString()
        break
    }

    setHmacOutput(hmac)
    toast.success('HMAC generated')
  }

  const checkPasswordStrength = () => {
    if (!password) {
      toast.error('Please enter a password')
      return
    }

    let score = 0
    const feedback: string[] = []

    // Length check
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (password.length >= 16) score++
    else feedback.push('Use at least 12 characters')

    // Character variety
    if (/[a-z]/.test(password)) score++
    else feedback.push('Add lowercase letters')
    
    if (/[A-Z]/.test(password)) score++
    else feedback.push('Add uppercase letters')
    
    if (/[0-9]/.test(password)) score++
    else feedback.push('Add numbers')
    
    if (/[^a-zA-Z0-9]/.test(password)) score++
    else feedback.push('Add special characters')

    // Common patterns check
    if (/(.)\1{2,}/.test(password)) {
      score--
      feedback.push('Avoid repeating characters')
    }

    let label = ''
    let color = ''
    if (score <= 2) {
      label = 'Weak'
      color = 'red'
    } else if (score <= 4) {
      label = 'Fair'
      color = 'orange'
    } else if (score <= 6) {
      label = 'Good'
      color = 'yellow'
    } else {
      label = 'Strong'
      color = 'green'
    }

    setPasswordStrength({ score, label, color, feedback })
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch {
      toast.error('Failed to copy')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Hash & Verify
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate hashes, HMAC signatures, and test password strength
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('hash')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'hash'
                ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            #️⃣ Hash Generator
          </button>
          <button
            onClick={() => setActiveTab('hmac')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'hmac'
                ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            🔐 HMAC Generator
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'password'
                ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            🛡️ Password Strength
          </button>
        </nav>
      </div>

      {/* Hash Tab */}
      {activeTab === 'hash' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Algorithm
                </label>
                <select
                  value={hashAlgorithm}
                  onChange={(e) => setHashAlgorithm(e.target.value as 'md5' | 'sha1' | 'sha256' | 'sha512')}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                >
                  <option value="md5">MD5</option>
                  <option value="sha1">SHA-1</option>
                  <option value="sha256">SHA-256</option>
                  <option value="sha512">SHA-512</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Input Text
                </label>
                <textarea
                  value={hashInput}
                  onChange={(e) => setHashInput(e.target.value)}
                  placeholder="Enter text to hash..."
                  className="w-full h-32 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>

              <button
                onClick={generateHash}
                className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium"
              >
                Generate Hash
              </button>
            </div>
          </div>

          {hashOutput && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Hash Output</h3>
                <button
                  onClick={() => copyToClipboard(hashOutput)}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
                >
                  📋 Copy
                </button>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded font-mono text-sm break-all">
                <span className="text-gray-900 dark:text-white">{hashOutput}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* HMAC Tab */}
      {activeTab === 'hmac' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Algorithm
                </label>
                <select
                  value={hmacAlgorithm}
                  onChange={(e) => setHmacAlgorithm(e.target.value as 'sha1' | 'sha256' | 'sha512')}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                >
                  <option value="sha1">HMAC-SHA1</option>
                  <option value="sha256">HMAC-SHA256</option>
                  <option value="sha512">HMAC-SHA512</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  value={hmacInput}
                  onChange={(e) => setHmacInput(e.target.value)}
                  placeholder="Enter message..."
                  className="w-full h-24 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Secret Key
                </label>
                <input
                  type="text"
                  value={hmacKey}
                  onChange={(e) => setHmacKey(e.target.value)}
                  placeholder="Enter secret key..."
                  className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>

              <button
                onClick={generateHmac}
                className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium"
              >
                Generate HMAC
              </button>
            </div>
          </div>

          {hmacOutput && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">HMAC Output</h3>
                <button
                  onClick={() => copyToClipboard(hmacOutput)}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
                >
                  📋 Copy
                </button>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded font-mono text-sm break-all">
                <span className="text-gray-900 dark:text-white">{hmacOutput}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Password Strength Tab */}
      {activeTab === 'password' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password to test..."
                  className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>

              <button
                onClick={checkPasswordStrength}
                className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium"
              >
                Check Strength
              </button>
            </div>
          </div>

          {passwordStrength && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Password Strength</h3>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className={`font-medium text-${passwordStrength.color}-600 dark:text-${passwordStrength.color}-400`}>
                    {passwordStrength.label}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {passwordStrength.score}/8
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`bg-${passwordStrength.color}-500 h-3 rounded-full transition-all`}
                    style={{ width: `${(passwordStrength.score / 8) * 100}%` }}
                  />
                </div>
              </div>

              {passwordStrength.feedback.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Suggestions:</h4>
                  <ul className="space-y-1">
                    {passwordStrength.feedback.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
