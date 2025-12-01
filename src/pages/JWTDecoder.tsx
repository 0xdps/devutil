import { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'

const DEFAULT_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30'

export default function JWTDecoder() {
  const meta = toolsMetadata.jwtDecoder
  
  const [token, setToken] = useState(DEFAULT_JWT)
  const [decoded, setDecoded] = useState<{
    header: Record<string, unknown>
    payload: Record<string, unknown>
    signature: string
  } | null>(null)
  const [showTimestamps, setShowTimestamps] = useState(true)
  const [viewMode, setViewMode] = useState<'json' | 'table'>('json')
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const formatTimestamp = (timestamp: number): string => {
    try {
      const date = new Date(timestamp * 1000)
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      })
    } catch {
      return 'Invalid date'
    }
  }

  const isTimestamp = (key: string): boolean => {
    return key === 'iat' || key === 'exp' || key === 'nbf'
  }

  const renderFieldValue = (key: string, value: unknown): JSX.Element => {
    if (isTimestamp(key) && typeof value === 'number') {
      const humanReadable = formatTimestamp(value)
      const isExpired = key === 'exp' && value < Date.now() / 1000
      
      return (
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono">{value}</span>
            {key === 'exp' && (
              <span className={`text-xs px-2 py-0.5 rounded ${
                isExpired 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              }`}>
                {isExpired ? '⚠️ Expired' : '✓ Valid'}
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            📅 {humanReadable}
          </div>
        </div>
      )
    }
    
    if (typeof value === 'object' && value !== null) {
      return <pre className="font-mono text-xs">{JSON.stringify(value, null, 2)}</pre>
    }
    
    return <span className="font-mono">{String(value)}</span>
  }

  const getFieldLabel = (key: string): string => {
    const labels: Record<string, string> = {
      iat: 'Issued At',
      exp: 'Expires',
      nbf: 'Not Before',
      sub: 'Subject',
      aud: 'Audience',
      iss: 'Issuer',
      jti: 'JWT ID'
    }
    return labels[key] || key
  }

  const decodeJWT = (showToast = true) => {
    if (!token.trim()) {
      if (showToast) {
        toast.error('Please enter a JWT token')
      }
      setDecoded(null)
      return
    }

    try {
      const parts = token.trim().split('.')
      if (parts.length !== 3) {
        if (showToast) {
          toast.error('Invalid JWT format')
        }
        setDecoded(null)
        return
      }

      const header = JSON.parse(atob(parts[0]))
      const payload = JSON.parse(atob(parts[1]))
      const signature = parts[2]

      setDecoded({ header, payload, signature })
      if (showToast) {
        toast.success('JWT decoded successfully')
      }
    } catch (error) {
      if (showToast) {
        toast.error('Failed to decode JWT')
      }
      setDecoded(null)
    }
  }

  // Auto-decode on mount with default token
  useEffect(() => {
    if (token.trim()) {
      try {
        const parts = token.trim().split('.')
        if (parts.length === 3) {
          const header = JSON.parse(atob(parts[0]))
          const payload = JSON.parse(atob(parts[1]))
          const signature = parts[2]
          setDecoded({ header, payload, signature })
        }
      } catch {
        // Silently fail on mount
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run on mount

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied!')
    } catch {
      toast.error('Failed to copy')
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
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            JWT Decoder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Decode and inspect JWT tokens
          </p>
        </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            JWT Token
          </label>
          <textarea
            value={token}
            onChange={(e) => {
              const newToken = e.target.value
              setToken(newToken)
              
              // Clear previous timeout
              if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current)
              }
              
              // Auto-decode when token changes (debounced)
              debounceTimeoutRef.current = setTimeout(() => {
                if (newToken.trim()) {
                  const parts = newToken.trim().split('.')
                  if (parts.length === 3) {
                    try {
                      const header = JSON.parse(atob(parts[0]))
                      const payload = JSON.parse(atob(parts[1]))
                      const signature = parts[2]
                      setDecoded({ header, payload, signature })
                    } catch {
                      setDecoded(null)
                    }
                  } else {
                    setDecoded(null)
                  }
                } else {
                  setDecoded(null)
                }
              }, 300) // Debounce for 300ms
            }}
            placeholder="Paste your JWT token here..."
            className="w-full h-32 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none font-mono text-sm"
          />
          <button
            onClick={() => decodeJWT()}
            className="mt-4 w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium"
          >
            Decode JWT
          </button>
        </div>

        {decoded && (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Header</h3>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(decoded.header, null, 2))}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
                >
                  📋 Copy
                </button>
              </div>
              <pre className="p-4 bg-gray-50 dark:bg-gray-700 rounded overflow-x-auto text-sm">
                <code className="text-gray-900 dark:text-white">{JSON.stringify(decoded.header, null, 2)}</code>
              </pre>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payload</h3>
                <div className="flex items-center gap-3">
                  {/* View mode toggle */}
                  <div className="flex items-center gap-2 text-sm">
                    <button
                      onClick={() => setViewMode('json')}
                      className={`px-3 py-1 rounded ${
                        viewMode === 'json'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      JSON
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`px-3 py-1 rounded ${
                        viewMode === 'table'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Table
                    </button>
                  </div>
                  
                  {/* Toggle for timestamp view (only in JSON mode) */}
                  {viewMode === 'json' && (typeof decoded.payload.iat === 'number' || typeof decoded.payload.exp === 'number' || typeof decoded.payload.nbf === 'number') && (
                    <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showTimestamps}
                        onChange={(e) => setShowTimestamps(e.target.checked)}
                        className="rounded"
                      />
                      <span>Show timestamps</span>
                    </label>
                  )}
                  
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(decoded.payload, null, 2))}
                    className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
                  >
                    📋 Copy
                  </button>
                </div>
              </div>

              {/* JSON View */}
              {viewMode === 'json' && (
                <>
                  {/* Timestamp Information */}
                  {showTimestamps && (typeof decoded.payload.iat === 'number' || typeof decoded.payload.exp === 'number' || typeof decoded.payload.nbf === 'number') && (
                <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 space-y-2">
                  <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">⏰ Token Timestamps</h4>
                  
                  {typeof decoded.payload.iat === 'number' && (
                    <div className="text-sm">
                      <span className="font-medium text-blue-900 dark:text-blue-100">Issued At (iat):</span>
                      <div className="text-blue-700 dark:text-blue-300 mt-1">
                        📅 {formatTimestamp(decoded.payload.iat)}
                      </div>
                    </div>
                  )}
                  
                  {typeof decoded.payload.exp === 'number' && (
                    <div className="text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-blue-900 dark:text-blue-100">Expires (exp):</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          decoded.payload.exp < Date.now() / 1000
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        }`}>
                          {decoded.payload.exp < Date.now() / 1000 ? '⚠️ Expired' : '✓ Valid'}
                        </span>
                      </div>
                      <div className="text-blue-700 dark:text-blue-300 mt-1">
                        📅 {formatTimestamp(decoded.payload.exp)}
                      </div>
                    </div>
                  )}
                  
                  {typeof decoded.payload.nbf === 'number' && (
                    <div className="text-sm">
                      <span className="font-medium text-blue-900 dark:text-blue-100">Not Before (nbf):</span>
                      <div className="text-blue-700 dark:text-blue-300 mt-1">
                        📅 {formatTimestamp(decoded.payload.nbf)}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <pre className="p-4 bg-gray-50 dark:bg-gray-700 rounded overflow-x-auto text-sm">
                <code className="text-gray-900 dark:text-white">{JSON.stringify(decoded.payload, null, 2)}</code>
              </pre>
                </>
              )}

              {/* Table View */}
              {viewMode === 'table' && (
                <div className="space-y-3">
                  {Object.entries(decoded.payload).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-200 dark:border-gray-600 pb-3 last:border-0">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        {getFieldLabel(key)}
                        {key === 'iat' && ' (iat)'}
                        {key === 'exp' && ' (exp)'}
                        {key === 'nbf' && ' (nbf)'}
                      </div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {renderFieldValue(key, value)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Signature</h3>
                <button
                  onClick={() => copyToClipboard(decoded.signature)}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
                >
                  📋 Copy
                </button>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded break-all font-mono text-sm">
                <span className="text-gray-900 dark:text-white">{decoded.signature}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  )
}
