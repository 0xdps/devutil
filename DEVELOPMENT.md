# DevUtil - Development Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run tests
npm test
```

## Project Structure

```
devutil/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.tsx      # Main layout wrapper
│   │   ├── Header.tsx      # Top navigation bar
│   │   └── Sidebar.tsx     # Left sidebar navigation
│   ├── pages/              # Page components (one per tool)
│   │   ├── Home.tsx        # Landing page
│   │   ├── JsonFormatter.tsx
│   │   └── Base64Tool.tsx
│   ├── utils/              # Helper functions
│   │   └── helpers.ts      # Common utility functions
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx             # Main app component with routing
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Adding a New Tool

### 1. Create the Page Component

Create a new file in `src/pages/`, e.g., `src/pages/UrlEncoder.tsx`:

```tsx
import { useState } from 'react'

export default function UrlEncoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const encode = () => {
    setOutput(encodeURIComponent(input))
  }

  const decode = () => {
    try {
      setOutput(decodeURIComponent(input))
    } catch (err) {
      setOutput('Invalid URL encoding')
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        URL Encoder/Decoder
      </h2>
      {/* Add your UI here */}
    </div>
  )
}
```

### 2. Add the Route

In `src/App.tsx`, import and add the route:

```tsx
import UrlEncoder from './pages/UrlEncoder'

// Add to Routes
<Route path="/url-encoder" element={<UrlEncoder />} />
```

### 3. Add to Navigation

In `src/components/Sidebar.tsx`, add the tool to the appropriate category:

```tsx
{
  category: 'Encoding',
  items: [
    // ... existing items
    { name: 'URL Encoder', path: '/url-encoder', icon: '🔗' },
  ],
}
```

## Styling Guidelines

### Tailwind CSS

We use Tailwind CSS for styling. Common patterns:

- **Containers**: `max-w-6xl mx-auto`
- **Cards**: `bg-white dark:bg-gray-800 rounded-lg shadow-md p-6`
- **Buttons**: `px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg`
- **Inputs**: `w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg`

### Dark Mode

Always provide dark mode variants:

```tsx
<div className="bg-white dark:bg-gray-800">
  <p className="text-gray-900 dark:text-white">Text</p>
</div>
```

## Common Utilities

### Copy to Clipboard

```tsx
import { copyToClipboard } from '../utils/helpers'

const handleCopy = async () => {
  const success = await copyToClipboard(text)
  if (success) {
    alert('Copied!')
  }
}
```

### Download File

```tsx
import { downloadAsFile } from '../utils/helpers'

const handleDownload = () => {
  downloadAsFile(content, 'filename.txt', 'text/plain')
}
```

## Testing

Write tests for your components in `tests/`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import UrlEncoder from '../src/pages/UrlEncoder'

describe('UrlEncoder', () => {
  it('encodes URL correctly', () => {
    // Your test here
  })
})
```

## Best Practices

1. **Privacy First**: Never send data to external servers
2. **Error Handling**: Always handle errors gracefully
3. **Accessibility**: Use semantic HTML and ARIA labels
4. **Responsive**: Test on mobile, tablet, and desktop
5. **Performance**: Keep bundle size small, lazy load when possible
6. **Type Safety**: Use TypeScript types for all functions and components

## Browser Compatibility

The app supports:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Deployment

The app can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: Build and push to gh-pages branch
- **Cloudflare Pages**: Connect repository

## Environment Variables

Currently, no environment variables are required. All functionality runs client-side.

## Troubleshooting

### Port 3000 already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- --port 3001
```

### TypeScript errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check for linting errors
npm run lint
```

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## Need Help?

- Create an issue on GitHub
- Check existing issues for solutions
- Read the CONTRIBUTING.md guide
