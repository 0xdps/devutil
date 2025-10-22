import { useState } from 'react'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'

export default function HTMLPlayground() {
  const meta = toolsMetadata.htmlPlayground
  const [html, setHtml] = useState('<h1>Hello World</h1>')
  const [css, setCss] = useState('h1 { color: blue; }')
  const [js, setJs] = useState('console.log("Hello")')

  const getPreview = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `
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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">HTML Playground</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">HTML</label>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              className="w-full h-40 px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg resize-none font-mono text-sm"
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">CSS</label>
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              className="w-full h-40 px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg resize-none font-mono text-sm"
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">JavaScript</label>
            <textarea
              value={js}
              onChange={(e) => setJs(e.target.value)}
              className="w-full h-40 px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg resize-none font-mono text-sm"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <iframe
            title="preview"
            srcDoc={getPreview()}
            className="w-full h-[600px] bg-white border rounded-lg"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
    </>
  )
}
