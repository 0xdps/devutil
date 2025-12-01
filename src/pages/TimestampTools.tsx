import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import cronstrue from 'cronstrue'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'

export default function TimestampTools() {
  const meta = toolsMetadata.timestampTools
  const [timestamp, setTimestamp] = useState(0) // Initialize with 0 to match server
  const [cronExpression, setCronExpression] = useState('0 0 * * *')
  const [cronDescription, setCronDescription] = useState('')
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000))
  const [showLiveClock, setShowLiveClock] = useState(true)

  // Set current timestamp after hydration to avoid mismatch
  useEffect(() => {
    setTimestamp(Math.floor(Date.now() / 1000))
  }, [])

  // Update live epoch time every second
  useEffect(() => {
    if (!showLiveClock) return

    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [showLiveClock])

  const convertToDate = () => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleString()
  }

  const setNow = () => {
    setTimestamp(Math.floor(Date.now() / 1000))
    toast.success('Set to current time')
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard')
    } catch {
      toast.error('Copy failed')
    }
  }

  const formatLiveDate = (epoch: number): string => {
    const date = new Date(epoch * 1000)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    })
  }

  const parseCron = () => {
    try {
      const description = cronstrue.toString(cronExpression)
      setCronDescription(description)
      toast.success('Cron parsed!')
    } catch {
      toast.error('Invalid cron expression')
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
        <h1 className="text-3xl font-bold mb-6">Timestamp Tools</h1>
      
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Unix Timestamp</h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showLiveClock}
                onChange={(e) => setShowLiveClock(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">Show live clock</span>
            </label>
          </div>

          {/* Live Clock Widget */}
          {showLiveClock && (
            <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg border border-primary-200 dark:border-primary-800">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="text-xs text-primary-700 dark:text-primary-300 font-medium mb-1">
                    Current Epoch Time (Live)
                  </div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-2xl font-mono font-bold text-primary-900 dark:text-primary-100">
                      {currentEpoch.toLocaleString()}
                    </span>
                    <span className="text-sm text-primary-600 dark:text-primary-400">
                      {formatLiveDate(currentEpoch)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(currentEpoch.toString())}
                    className="px-3 py-1.5 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  >
                    📋 Copy Epoch
                  </button>
                  <button
                    onClick={() => {
                      setTimestamp(currentEpoch)
                      toast.success('Timestamp set to current time')
                    }}
                    className="px-3 py-1.5 text-sm bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-primary-700 dark:text-primary-300 border border-primary-300 dark:border-primary-700 rounded-lg transition-colors"
                  >
                    Use This
                  </button>
                </div>
              </div>
            </div>
          )}

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            ℹ️ Unix timestamp is the number of seconds since January 1, 1970 (UTC). Commonly used in databases and APIs.
          </p>
          <input
            type="number"
            value={timestamp}
            onChange={(e) => setTimestamp(Number(e.target.value))}
            className="w-full px-4 py-2 bg-white dark:bg-gray-700 border rounded-lg mb-4"
          />
          <button onClick={setNow} className="px-4 py-2 bg-primary-600 text-white rounded-lg mb-4">
            Set to Now
          </button>
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <strong>Human Readable:</strong> {convertToDate()}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Cron Expression Parser</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            ℹ️ Cron expressions schedule recurring tasks. Format: minute hour day month weekday. Example: "0 0 * * *" = daily at midnight
          </p>
          <input
            type="text"
            value={cronExpression}
            onChange={(e) => setCronExpression(e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-gray-700 border rounded-lg mb-4"
            placeholder="0 0 * * *"
          />
          <button onClick={parseCron} className="px-4 py-2 bg-primary-600 text-white rounded-lg">
            Parse Cron
          </button>
          {cronDescription && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded">
              {cronDescription}
            </div>
          )}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300 font-semibold mb-2">Common Examples:</p>
            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
              <li><code className="bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded">* * * * *</code> - Every minute</li>
              <li><code className="bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded">0 * * * *</code> - Every hour</li>
              <li><code className="bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded">0 0 * * *</code> - Daily at midnight</li>
              <li><code className="bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded">0 0 * * 0</code> - Weekly on Sunday</li>
              <li><code className="bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded">0 0 1 * *</code> - Monthly on 1st day</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
