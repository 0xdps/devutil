import { useState } from 'react'
import { marked } from 'marked'

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState('# Hello World\n\nStart typing your markdown here...')

  const getHTML = () => {
    return { __html: marked(markdown) as string }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Markdown Previewer</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Editor</h2>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-[600px] px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg resize-none font-mono text-sm"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div
            className="w-full h-[600px] px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg overflow-y-auto prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={getHTML()}
          />
        </div>
      </div>
    </div>
  )
}
