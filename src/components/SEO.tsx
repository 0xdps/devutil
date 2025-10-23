import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  type?: 'website' | 'article' | 'WebApplication'
  image?: string
  toolName?: string
  toolDescription?: string
  toolUrl?: string
  noindex?: boolean
}

export default function SEO({
  title,
  description,
  keywords = [],
  canonical,
  type = 'WebApplication',
  image = '/og-image.png',
  toolName,
  toolDescription,
  toolUrl,
  noindex = false
}: SEOProps) {
  const siteUrl = 'https://devutil.xyz' // Update with your actual domain
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`

  // Structured data for the website
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'devutil.xyz',
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'Web Browser',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'ratingCount': '150',
      'bestRating': '5',
      'worstRating': '1'
    },
    'description': 'A comprehensive collection of developer utilities and tools for everyday tasks',
    'url': siteUrl,
    'image': fullImage,
    'author': {
      '@type': 'Organization',
      'name': 'devutil.xyz'
    }
  }

  // Structured data for individual tools
  const toolSchema = toolName ? {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': toolName,
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'Web Browser',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'ratingCount': '150',
      'bestRating': '5',
      'worstRating': '1'
    },
    'description': toolDescription || description,
    'url': toolUrl ? `${siteUrl}${toolUrl}` : fullCanonical,
    'softwareVersion': '1.0',
    'featureList': description,
    'screenshot': fullImage
  } : null

  // Breadcrumb schema
  const breadcrumbSchema = toolUrl ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': siteUrl
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': toolName,
        'item': `${siteUrl}${toolUrl}`
      }
    ]
  } : null

  // FAQ schema for tools
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Is devutil.xyz free to use?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, all tools on devutil.xyz are completely free to use with no registration required.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Do you store my data?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'No, all operations are performed locally in your browser. Your data never leaves your device.'
        }
      }
    ]
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="devutil.xyz" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Additional Meta Tags */}
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="devutil.xyz" />

      {/* Mobile Meta Tags */}
      <meta name="theme-color" content="#4F46E5" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="devutil.xyz" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {toolSchema && (
        <script type="application/ld+json">
          {JSON.stringify(toolSchema)}
        </script>
      )}

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {!toolUrl && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  )
}
