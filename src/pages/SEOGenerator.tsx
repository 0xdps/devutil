import { useState } from 'react'
import toast from 'react-hot-toast'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'

type TabType = 'meta' | 'robots' | 'sitemap' | 'canonical' | 'schema'

export default function SEOGenerator() {
  const meta = toolsMetadata.seoGenerator
  const [activeTab, setActiveTab] = useState<TabType>('meta')

  // Meta Tags State
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [metaKeywords, setMetaKeywords] = useState('')
  const [ogTitle, setOgTitle] = useState('')
  const [ogDescription, setOgDescription] = useState('')
  const [ogImage, setOgImage] = useState('')
  const [ogUrl, setOgUrl] = useState('')
  const [ogType, setOgType] = useState('website')
  const [twitterCard, setTwitterCard] = useState('summary_large_image')
  const [twitterSite, setTwitterSite] = useState('')
  const [metaOutput, setMetaOutput] = useState('')

  // Robots.txt State
  const [userAgent, setUserAgent] = useState('*')
  const [allowPaths, setAllowPaths] = useState('')
  const [disallowPaths, setDisallowPaths] = useState('')
  const [sitemapUrl, setSitemapUrl] = useState('')
  const [robotsOutput, setRobotsOutput] = useState('')

  // Sitemap State
  const [sitemapUrls, setSitemapUrls] = useState('')
  const [sitemapOutput, setSitemapOutput] = useState('')

  // Canonical State
  const [canonicalUrl, setCanonicalUrl] = useState('')
  const [canonicalOutput, setCanonicalOutput] = useState('')

  // Schema.org State
  const [schemaType, setSchemaType] = useState('Organization')
  const [schemaName, setSchemaName] = useState('')
  const [schemaUrl, setSchemaUrl] = useState('')
  const [schemaLogo, setSchemaLogo] = useState('')
  const [schemaDescription, setSchemaDescription] = useState('')
  const [schemaOutput, setSchemaOutput] = useState('')

  const generateMetaTags = () => {
    let output = '<!-- Basic Meta Tags -->\n'
    if (metaTitle) output += `<meta name="title" content="${metaTitle}">\n`
    if (metaDescription) output += `<meta name="description" content="${metaDescription}">\n`
    if (metaKeywords) output += `<meta name="keywords" content="${metaKeywords}">\n`

    output += '\n<!-- Open Graph Tags -->\n'
    if (ogTitle) output += `<meta property="og:title" content="${ogTitle}">\n`
    if (ogDescription) output += `<meta property="og:description" content="${ogDescription}">\n`
    if (ogImage) output += `<meta property="og:image" content="${ogImage}">\n`
    if (ogUrl) output += `<meta property="og:url" content="${ogUrl}">\n`
    output += `<meta property="og:type" content="${ogType}">\n`

    output += '\n<!-- Twitter Card Tags -->\n'
    output += `<meta name="twitter:card" content="${twitterCard}">\n`
    if (ogTitle) output += `<meta name="twitter:title" content="${ogTitle}">\n`
    if (ogDescription) output += `<meta name="twitter:description" content="${ogDescription}">\n`
    if (ogImage) output += `<meta name="twitter:image" content="${ogImage}">\n`
    if (twitterSite) output += `<meta name="twitter:site" content="${twitterSite}">\n`

    setMetaOutput(output)
    toast.success('Meta tags generated')
  }

  const generateRobotsTxt = () => {
    let output = `User-agent: ${userAgent}\n`
    
    if (disallowPaths) {
      const paths = disallowPaths.split('\n').filter(p => p.trim())
      paths.forEach(path => {
        output += `Disallow: ${path.trim()}\n`
      })
    }
    
    if (allowPaths) {
      const paths = allowPaths.split('\n').filter(p => p.trim())
      paths.forEach(path => {
        output += `Allow: ${path.trim()}\n`
      })
    }
    
    if (sitemapUrl) {
      output += `\nSitemap: ${sitemapUrl}\n`
    }

    setRobotsOutput(output)
    toast.success('Robots.txt generated')
  }

  const generateSitemap = () => {
    const urls = sitemapUrls.split('\n').filter(url => url.trim())
    if (urls.length === 0) {
      toast.error('Please enter at least one URL')
      return
    }

    let output = `<?xml version="1.0" encoding="UTF-8"?>\n`
    output += `<?xml-stylesheet type="text/xsl" href="https://www.google.com/schemas/sitemap/0.9/sitemap.xsl"?>\n`
    output += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
    
    urls.forEach(url => {
      output += `  <url>\n`
      output += `    <loc>${url.trim()}</loc>\n`
      output += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`
      output += `    <changefreq>monthly</changefreq>\n`
      output += `    <priority>0.8</priority>\n`
      output += `  </url>\n`
    })
    
    output += `</urlset>`

    setSitemapOutput(output)
    toast.success('Sitemap.xml generated')
  }

  const generateCanonical = () => {
    if (!canonicalUrl) {
      toast.error('Please enter a canonical URL')
      return
    }
    const output = `<link rel="canonical" href="${canonicalUrl}">`
    setCanonicalOutput(output)
    toast.success('Canonical tag generated')
  }

  const generateSchema = () => {
    if (!schemaName) {
      toast.error('Please enter a name')
      return
    }

    const schema: any = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: schemaName,
    }

    if (schemaUrl) schema.url = schemaUrl
    if (schemaLogo) schema.logo = schemaLogo
    if (schemaDescription) schema.description = schemaDescription

    const output = JSON.stringify(schema, null, 2)
    setSchemaOutput(`<script type="application/ld+json">\n${output}\n</script>`)
    toast.success('Schema.org markup generated')
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard')
    } catch {
      toast.error('Copy failed')
    }
  }

  const tabs: Array<{ id: TabType; label: string; icon: string }> = [
    { id: 'meta', label: 'Meta Tags', icon: '🏷️' },
    { id: 'robots', label: 'Robots.txt', icon: '🤖' },
    { id: 'sitemap', label: 'Sitemap.xml', icon: '🗺️' },
    { id: 'canonical', label: 'Canonical', icon: '🔗' },
    { id: 'schema', label: 'Schema.org', icon: '📊' },
  ]

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
      <div className="max-w-6xl mx-auto space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">SEO Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate essential SEO tags and files for your website
          </p>
        </header>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Meta Tags Tab */}
        {activeTab === 'meta' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Basic Meta Tags</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="Page Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="Page description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Keywords (comma-separated)</label>
                <input
                  type="text"
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">Open Graph</h2>
              <div>
                <label className="block text-sm font-medium mb-2">OG Title</label>
                <input
                  type="text"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="Open Graph title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">OG Description</label>
                <textarea
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="Open Graph description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">OG Image URL</label>
                <input
                  type="url"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">OG URL</label>
                <input
                  type="url"
                  value={ogUrl}
                  onChange={(e) => setOgUrl(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="https://example.com/page"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">OG Type</label>
                <select
                  value={ogType}
                  onChange={(e) => setOgType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <option value="website">Website</option>
                  <option value="article">Article</option>
                  <option value="product">Product</option>
                  <option value="profile">Profile</option>
                </select>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">Twitter Card</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Card Type</label>
                <select
                  value={twitterCard}
                  onChange={(e) => setTwitterCard(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <option value="summary">Summary</option>
                  <option value="summary_large_image">Summary Large Image</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Twitter Site (@username)</label>
                <input
                  type="text"
                  value={twitterSite}
                  onChange={(e) => setTwitterSite(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="@username"
                />
              </div>

              <button
                onClick={generateMetaTags}
                className="w-full px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                Generate Meta Tags
              </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Output</h2>
                <button
                  onClick={() => copyToClipboard(metaOutput)}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Copy
                </button>
              </div>
              <textarea
                value={metaOutput}
                readOnly
                className="w-full min-h-[600px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-mono text-sm"
                placeholder="Generated meta tags will appear here..."
              />
            </div>
          </div>
        )}

        {/* Robots.txt Tab */}
        {activeTab === 'robots' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Robots.txt Configuration</h2>
              <div>
                <label className="block text-sm font-medium mb-2">User Agent</label>
                <input
                  type="text"
                  value={userAgent}
                  onChange={(e) => setUserAgent(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="*"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Disallow Paths (one per line)</label>
                <textarea
                  value={disallowPaths}
                  onChange={(e) => setDisallowPaths(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="/admin&#10;/private"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Allow Paths (one per line)</label>
                <textarea
                  value={allowPaths}
                  onChange={(e) => setAllowPaths(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="/public"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Sitemap URL</label>
                <input
                  type="url"
                  value={sitemapUrl}
                  onChange={(e) => setSitemapUrl(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="https://example.com/sitemap.xml"
                />
              </div>
              <button
                onClick={generateRobotsTxt}
                className="w-full px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                Generate Robots.txt
              </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Output</h2>
                <button
                  onClick={() => copyToClipboard(robotsOutput)}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Copy
                </button>
              </div>
              <textarea
                value={robotsOutput}
                readOnly
                className="w-full min-h-[400px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-mono text-sm"
                placeholder="Generated robots.txt will appear here..."
              />
            </div>
          </div>
        )}

        {/* Sitemap Tab */}
        {activeTab === 'sitemap' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sitemap URLs</h2>
              <div>
                <label className="block text-sm font-medium mb-2">URLs (one per line)</label>
                <textarea
                  value={sitemapUrls}
                  onChange={(e) => setSitemapUrls(e.target.value)}
                  className="w-full min-h-[400px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm"
                  placeholder="https://example.com/&#10;https://example.com/about&#10;https://example.com/contact"
                />
              </div>
              <button
                onClick={generateSitemap}
                className="w-full px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                Generate Sitemap.xml
              </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Output</h2>
                <button
                  onClick={() => copyToClipboard(sitemapOutput)}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Copy
                </button>
              </div>
              <textarea
                value={sitemapOutput}
                readOnly
                className="w-full min-h-[400px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-mono text-sm"
                placeholder="Generated sitemap.xml will appear here..."
              />
            </div>
          </div>
        )}

        {/* Canonical Tab */}
        {activeTab === 'canonical' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Canonical URL</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Canonical URL</label>
                <input
                  type="url"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="https://example.com/page"
                />
              </div>
              <button
                onClick={generateCanonical}
                className="w-full px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                Generate Canonical Tag
              </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Output</h2>
                <button
                  onClick={() => copyToClipboard(canonicalOutput)}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Copy
                </button>
              </div>
              <textarea
                value={canonicalOutput}
                readOnly
                className="w-full min-h-[200px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-mono text-sm"
                placeholder="Generated canonical tag will appear here..."
              />
            </div>
          </div>
        )}

        {/* Schema.org Tab */}
        {activeTab === 'schema' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Schema.org Markup</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Schema Type</label>
                <select
                  value={schemaType}
                  onChange={(e) => setSchemaType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <option value="Organization">Organization</option>
                  <option value="Person">Person</option>
                  <option value="WebSite">WebSite</option>
                  <option value="Article">Article</option>
                  <option value="Product">Product</option>
                  <option value="LocalBusiness">LocalBusiness</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={schemaName}
                  onChange={(e) => setSchemaName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="Organization/Person name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">URL</label>
                <input
                  type="url"
                  value={schemaUrl}
                  onChange={(e) => setSchemaUrl(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Logo URL</label>
                <input
                  type="url"
                  value={schemaLogo}
                  onChange={(e) => setSchemaLogo(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="https://example.com/logo.png"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={schemaDescription}
                  onChange={(e) => setSchemaDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="Description"
                  rows={3}
                />
              </div>
              <button
                onClick={generateSchema}
                className="w-full px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                Generate Schema.org Markup
              </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Output</h2>
                <button
                  onClick={() => copyToClipboard(schemaOutput)}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Copy
                </button>
              </div>
              <textarea
                value={schemaOutput}
                readOnly
                className="w-full min-h-[400px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-mono text-sm"
                placeholder="Generated Schema.org markup will appear here..."
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
