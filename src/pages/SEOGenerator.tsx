import ComingSoon from './ComingSoon'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'

export default function SEOGenerator() {
  const meta = toolsMetadata.seoGenerator
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
      <ComingSoon
        title="SEO Meta Generator"
        description="Generate essential SEO tags and files for your website"
        icon="🔎"
        features={[
        'Meta Tags Generator - Create Open Graph and Twitter Card tags',
        'Robots.txt Builder - Configure crawler access rules',
        'Sitemap.xml Generator - Build XML sitemaps for search engines',
        'Canonical URL Generator - Manage duplicate content',
        'Schema.org Markup - Generate structured data JSON-LD',
      ]}
    />
    </>
  )
}
