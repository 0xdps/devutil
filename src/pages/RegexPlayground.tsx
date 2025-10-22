import ComingSoon from './ComingSoon'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'

export default function RegexPlayground() {
  const meta = toolsMetadata.regexPlayground
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
        title="Regex Playground"
        description="Interactive environment for testing and learning regular expressions"
        icon="🎮"
        features={[
        'Live regex testing with instant match highlighting',
        'Multi-line text support with line-by-line analysis',
        'Regex pattern library with common use cases',
        'Explanation of regex syntax and groups',
        'Test multiple regex flags (global, multiline, case-insensitive)',
        'Save and share regex patterns',
      ]}
    />
    </>
  )
}
