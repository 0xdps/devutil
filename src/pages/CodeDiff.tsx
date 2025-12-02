import { useState, useRef, useEffect } from 'react'
import { diffLines, type Change } from 'diff'
import toast from 'react-hot-toast'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'

type DiffMode = 'side-by-side' | 'inline'

export default function CodeDiff() {
  const meta = toolsMetadata.codeDiff
  const [leftText, setLeftText] = useState('')
  const [rightText, setRightText] = useState('')
  const [leftFileName, setLeftFileName] = useState('')
  const [rightFileName, setRightFileName] = useState('')
  const [diffResult, setDiffResult] = useState<Change[]>([])
  const [mode, setMode] = useState<DiffMode>('side-by-side')
  const leftFileInputRef = useRef<HTMLInputElement>(null)
  const rightFileInputRef = useRef<HTMLInputElement>(null)
  const leftScrollRef = useRef<HTMLDivElement>(null)
  const rightScrollRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)

  const handleFileUpload = async (
    file: File,
    setText: (text: string) => void,
    setFileName: (name: string) => void
  ) => {
    if (!file) return

    // Check file size (limit to 5MB for text files)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    try {
      const text = await file.text()
      setText(text)
      setFileName(file.name)
      toast.success(`File "${file.name}" loaded`)
    } catch (error) {
      toast.error('Failed to read file. Please ensure it is a text file.')
    }
  }

  const handleLeftFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file, setLeftText, setLeftFileName)
    }
    // Reset input so same file can be selected again
    if (leftFileInputRef.current) {
      leftFileInputRef.current.value = ''
    }
  }

  const handleRightFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file, setRightText, setRightFileName)
    }
    // Reset input so same file can be selected again
    if (rightFileInputRef.current) {
      rightFileInputRef.current.value = ''
    }
  }

  const compare = () => {
    if (!leftText.trim() && !rightText.trim()) {
      toast.error('Please enter text or upload files to compare')
      return
    }

    const changes = diffLines(leftText, rightText)
    setDiffResult(changes)
    toast.success('Diff generated')
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard')
    } catch {
      toast.error('Copy failed')
    }
  }

  const exportDiff = () => {
    const diffText = diffResult
      .map((change) => {
        const prefix = change.added ? '+' : change.removed ? '-' : ' '
        return change.value
          .split('\n')
          .filter((line) => line.trim() !== '')
          .map((line) => `${prefix} ${line}`)
          .join('\n')
      })
      .join('\n')

    const blob = new Blob([diffText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'diff.txt'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Diff exported')
  }

  // Synchronized scrolling effect
  useEffect(() => {
    if (mode !== 'side-by-side' || !leftScrollRef.current || !rightScrollRef.current) {
      return
    }

    const leftScroll = leftScrollRef.current
    const rightScroll = rightScrollRef.current

    const handleLeftScroll = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true
        rightScroll.scrollTop = leftScroll.scrollTop
        requestAnimationFrame(() => {
          isScrollingRef.current = false
        })
      }
    }

    const handleRightScroll = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true
        leftScroll.scrollTop = rightScroll.scrollTop
        requestAnimationFrame(() => {
          isScrollingRef.current = false
        })
      }
    }

    leftScroll.addEventListener('scroll', handleLeftScroll)
    rightScroll.addEventListener('scroll', handleRightScroll)

    return () => {
      leftScroll.removeEventListener('scroll', handleLeftScroll)
      rightScroll.removeEventListener('scroll', handleRightScroll)
    }
  }, [mode, diffResult])

  const renderSideBySide = () => {
    const leftLines: Array<{ line: string; type: 'added' | 'removed' | 'unchanged' }> = []
    const rightLines: Array<{ line: string; type: 'added' | 'removed' | 'unchanged' }> = []

    diffResult.forEach((change) => {
      const lines = change.value.split('\n')
      // Remove the last empty line if it exists
      if (lines[lines.length - 1] === '') {
        lines.pop()
      }

      lines.forEach((line) => {
        if (change.removed) {
          leftLines.push({ line, type: 'removed' })
          rightLines.push({ line: '', type: 'unchanged' })
        } else if (change.added) {
          leftLines.push({ line: '', type: 'unchanged' })
          rightLines.push({ line, type: 'added' })
        } else {
          leftLines.push({ line, type: 'unchanged' })
          rightLines.push({ line, type: 'unchanged' })
        }
      })
    })

    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 font-semibold text-sm">
            Original
          </div>
          <div 
            ref={leftScrollRef}
            className="overflow-auto max-h-[600px] font-mono text-sm"
          >
            {leftLines.length === 0 ? (
              <div className="p-4 text-gray-500 dark:text-gray-400">No changes to display</div>
            ) : (
              leftLines.map((item, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-1 ${
                    item.type === 'removed'
                      ? 'bg-red-100 dark:bg-red-900/20'
                      : 'bg-white dark:bg-gray-900'
                  }`}
                >
                  <span className="text-gray-500 dark:text-gray-500 mr-2 select-none">
                    {idx + 1}
                  </span>
                  <span
                    className={
                      item.type === 'removed'
                        ? 'text-red-800 dark:text-red-300 line-through'
                        : 'text-gray-900 dark:text-gray-100'
                    }
                  >
                    {item.line || '\u00A0'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 font-semibold text-sm">
            Modified
          </div>
          <div 
            ref={rightScrollRef}
            className="overflow-auto max-h-[600px] font-mono text-sm"
          >
            {rightLines.length === 0 ? (
              <div className="p-4 text-gray-500 dark:text-gray-400">No changes to display</div>
            ) : (
              rightLines.map((item, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-1 ${
                    item.type === 'added'
                      ? 'bg-green-100 dark:bg-green-900/20'
                      : 'bg-white dark:bg-gray-900'
                  }`}
                >
                  <span className="text-gray-500 dark:text-gray-500 mr-2 select-none">
                    {idx + 1}
                  </span>
                  <span
                    className={
                      item.type === 'added'
                        ? 'text-green-800 dark:text-green-300'
                        : 'text-gray-900 dark:text-gray-100'
                    }
                  >
                    {item.line || '\u00A0'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }

  const renderInline = () => {
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 font-semibold text-sm">
          Inline Diff
        </div>
        <div className="overflow-auto max-h-[600px] font-mono text-sm bg-white dark:bg-gray-900">
          {diffResult.length === 0 ? (
            <div className="p-4 text-gray-500 dark:text-gray-400">No changes to display</div>
          ) : (
            diffResult.map((change, idx) => (
              <div
                key={idx}
                className={`px-4 py-1 ${
                  change.added
                    ? 'bg-green-100 dark:bg-green-900/20'
                    : change.removed
                      ? 'bg-red-100 dark:bg-red-900/20'
                      : 'bg-white dark:bg-gray-900'
                }`}
              >
                <span
                  className={
                    change.added
                      ? 'text-green-800 dark:text-green-300'
                      : change.removed
                        ? 'text-red-800 dark:text-red-300'
                        : 'text-gray-900 dark:text-gray-100'
                  }
                >
                  {change.value}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    )
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
      <div className="max-w-7xl mx-auto space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Text Diff</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Compare text files or snippets side-by-side or inline with line-by-line change detection. Upload files or paste text directly.
          </p>
        </header>

        {/* Mode Selection */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">View Mode:</span>
          <button
            onClick={() => setMode('side-by-side')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              mode === 'side-by-side'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setMode('inline')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              mode === 'inline'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Inline
          </button>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Original</h2>
              <div className="flex gap-2">
                <label className="px-3 py-1 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                  <input
                    ref={leftFileInputRef}
                    type="file"
                    accept=".txt,.json,.js,.ts,.jsx,.tsx,.html,.css,.md,.py,.java,.cpp,.c,.go,.rs,.php,.rb,.yml,.yaml,.xml,.csv,.log"
                    onChange={handleLeftFileChange}
                    className="hidden"
                  />
                  📁 Upload
                </label>
                <button
                  onClick={() => copyToClipboard(leftText)}
                  className="px-3 py-1 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Copy
                </button>
              </div>
            </div>
            {leftFileName && (
              <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <span>📄 {leftFileName}</span>
                <button
                  onClick={() => {
                    setLeftFileName('')
                    setLeftText('')
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            )}
            <textarea
              value={leftText}
              onChange={(e) => setLeftText(e.target.value)}
              className="w-full min-h-[300px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Paste original text here or upload a file..."
            />
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Modified</h2>
              <div className="flex gap-2">
                <label className="px-3 py-1 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                  <input
                    ref={rightFileInputRef}
                    type="file"
                    accept=".txt,.json,.js,.ts,.jsx,.tsx,.html,.css,.md,.py,.java,.cpp,.c,.go,.rs,.php,.rb,.yml,.yaml,.xml,.csv,.log"
                    onChange={handleRightFileChange}
                    className="hidden"
                  />
                  📁 Upload
                </label>
                <button
                  onClick={() => copyToClipboard(rightText)}
                  className="px-3 py-1 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Copy
                </button>
              </div>
            </div>
            {rightFileName && (
              <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <span>📄 {rightFileName}</span>
                <button
                  onClick={() => {
                    setRightFileName('')
                    setRightText('')
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            )}
            <textarea
              value={rightText}
              onChange={(e) => setRightText(e.target.value)}
              className="w-full min-h-[300px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Paste modified text here or upload a file..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={compare}
            className="px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          >
            Compare
          </button>
          <button
            onClick={() => {
              setLeftText('')
              setRightText('')
              setLeftFileName('')
              setRightFileName('')
              setDiffResult([])
            }}
            className="px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Clear
          </button>
          {diffResult.length > 0 && (
            <button
              onClick={exportDiff}
              className="px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Export Diff
            </button>
          )}
        </div>

        {/* Diff Result */}
        {diffResult.length > 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
            {mode === 'side-by-side' ? renderSideBySide() : renderInline()}
          </div>
        )}
      </div>
    </>
  )
}
