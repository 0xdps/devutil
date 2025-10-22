import ComingSoon from './ComingSoon'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'

export default function CodeDiff() {
  const meta = toolsMetadata.codeDiff
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
        title="Code Diff"
        description="Compare code snippets side-by-side with syntax highlighting"
        icon="🔄"
        features={[
        'Side-by-side diff viewer with syntax highlighting',
        'Inline diff mode for compact comparison',
        'Support for multiple programming languages',
        'Line-by-line change detection',
        'Copy and export diff results',
      ]}
    />
    </>
  )
}
