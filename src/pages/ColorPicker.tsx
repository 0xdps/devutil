import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ColorPicker() {
  const [color, setColor] = useState('#3b82f6')

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  const rgb = hexToRgb(color)
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null

  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied!')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Color Picker</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div
            className="w-full h-64 rounded-lg border-4 border-gray-300 dark:border-gray-600 mb-4"
            style={{ backgroundColor: color }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-16 rounded-lg cursor-pointer"
          />
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
            <div className="flex justify-between items-center">
              <span className="font-medium">HEX</span>
              <button onClick={() => copy(color)} className="text-primary-600">📋</button>
            </div>
            <div className="mt-2 font-mono text-lg">{color}</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
            <div className="flex justify-between items-center">
              <span className="font-medium">RGB</span>
              <button onClick={() => copy(`rgb(${rgb?.r}, ${rgb?.g}, ${rgb?.b})`)} className="text-primary-600">📋</button>
            </div>
            <div className="mt-2 font-mono text-lg">
              rgb({rgb?.r}, {rgb?.g}, {rgb?.b})
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
            <div className="flex justify-between items-center">
              <span className="font-medium">HSL</span>
              <button onClick={() => copy(`hsl(${hsl?.h}, ${hsl?.s}%, ${hsl?.l}%)`)} className="text-primary-600">📋</button>
            </div>
            <div className="mt-2 font-mono text-lg">
              hsl({hsl?.h}, {hsl?.s}%, {hsl?.l}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
