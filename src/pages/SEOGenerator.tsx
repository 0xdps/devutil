import ComingSoon from './ComingSoon'

export default function SEOGenerator() {
  return (
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
  )
}
