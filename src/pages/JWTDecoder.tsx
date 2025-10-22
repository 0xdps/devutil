import { useState } from 'react'
import toast from 'react-hot-toast'

export default function JWTDecoder() {
  const [token, setToken] = useState('')
  const [decoded, setDecoded] = useState<{
    header: Record<string, unknown>
    payload: Record<string, unknown>
    signature: string
  } | null>(null)

  const decodeJWT = () => {
    if (!token.trim()) {
      toast.error('Please enter a JWT token')
      return
    }

    try {
      const parts = token.split('.')
      if (parts.length !== 3) {
        toast.error('Invalid JWT format')
        return
      }

      const header = JSON.parse(atob(parts[0]))
      const payload = JSON.parse(atob(parts[1]))
      const signature = parts[2]

      setDecoded({ header, payload, signature })
      toast.success('JWT decoded successfully')
    } catch (error) {
      toast.error('Failed to decode JWT')
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied!')
    } catch {
      toast.error('Failed to copy')
    }
  }

  return (
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
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your JWT token here..."
            className="w-full h-32 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none font-mono text-sm"
          />
          <button
            onClick={decodeJWT}
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
                <button
                  onClick={() => copyToClipboard(JSON.stringify(decoded.payload, null, 2))}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
                >
                  📋 Copy
                </button>
              </div>
              <pre className="p-4 bg-gray-50 dark:bg-gray-700 rounded overflow-x-auto text-sm">
                <code className="text-gray-900 dark:text-white">{JSON.stringify(decoded.payload, null, 2)}</code>
              </pre>
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
  )
}
