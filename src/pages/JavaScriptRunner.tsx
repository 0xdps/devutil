import { useState } from 'react'
import toast from 'react-hot-toast'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'

export default function JavaScriptRunner() {
  const meta = toolsMetadata.jsRunner
  const [code, setCode] = useState('console.log("Hello, World!")\nreturn 42')
  const [output, setOutput] = useState('')

  const run = () => {
    try {
      const logs: string[] = []
      const customConsole = {
        log: (...args: unknown[]) => logs.push(args.map(String).join(' '))
      }
      
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      const func = new Function('console', code)
      const result = func(customConsole)
      
      const output = logs.join('\n') + (result !== undefined ? `\n\nReturned: ${result}` : '')
      setOutput(output || '(no output)')
      toast.success('Code executed')
    } catch (error) {
      setOutput(`Error: ${error}`)
      toast.error('Execution failed')
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
        <h1 className="text-3xl font-bold mb-6">JavaScript Runner</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Code</h2>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-[500px] px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg resize-none font-mono text-sm"
          />
          <button onClick={run} className="mt-4 w-full px-6 py-3 bg-primary-600 text-white rounded-lg">
            Run Code
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Output</h2>
          <pre className="w-full h-[500px] px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-lg overflow-auto font-mono text-sm whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      </div>
    </div>
    </>
  )
}
