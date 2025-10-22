import { useState } from 'react'
import toast from 'react-hot-toast'
import cronstrue from 'cronstrue'

export default function TimestampTools() {
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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Timestamp Tools</h1>
      
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Unix Timestamp</h2>
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
        </div>
      </div>
    </div>
  )
}
