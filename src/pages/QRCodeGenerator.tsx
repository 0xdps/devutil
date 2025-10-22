import { useState } from 'react'
import QRCode from 'qrcode'
import toast from 'react-hot-toast'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'

export default function QRCodeGenerator() {
  const meta = toolsMetadata.qrCode
  const [text, setText] = useState('')
  const [qrImage, setQrImage] = useState('')

  const generate = async () => {
    if (!text) {
      toast.error('Enter text')
      return
    }
    try {
      const url = await QRCode.toDataURL(text, { width: 300, margin: 2 })
      setQrImage(url)
      toast.success('Generated!')
    } catch {
      toast.error('Failed to generate QR code')
    }
  }

  const download = () => {
    const a = document.createElement('a')
    a.href = qrImage
    a.download = 'qrcode.png'
    a.click()
    toast.success('Downloaded!')
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
        <h1 className="text-3xl font-bold mb-6">QR Code Generator</h1>
      
      <div className="space-y-6">
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg resize-none"
            placeholder="Enter text or URL..."
          />
          <button
            onClick={generate}
            className="mt-4 w-full px-6 py-3 bg-primary-600 text-white rounded-lg"
          >
            Generate QR Code
          </button>
        </div>

        {qrImage && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border text-center">
            <img src={qrImage} alt="QR Code" className="mx-auto mb-4" />
            <button
              onClick={download}
              className="px-6 py-2 bg-green-600 text-white rounded-lg"
            >
              Download
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  )
}
