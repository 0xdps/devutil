import { useState } from 'react'
import toast from 'react-hot-toast'
import cronstrue from 'cronstrue'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'

export default function TimestampTools() {
  const meta = toolsMetadata.timestampTools
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000))
  const [cronExpression, setCronExpression] = useState('0 0 * * *')
  const [cronDescription, setCronDescription] = useState('')

  const convertToDate = () => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleString()
  }

  const setNow = () => {
    setTimestamp(Math.floor(Date.now() / 1000))
    toast.success('Set to current time')
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
          <h2 className="text-xl font-semibold mb-4">Unix Timestamp</h2>
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
