import ComingSoon from './ComingSoon'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'

export default function JSONTools() {
  const meta = toolsMetadata.jsonTools
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
        title="JSON Tools"
        description="Advanced JSON manipulation and analysis utilities"
        icon="🔍"
        features={[
        'JSON Diff Viewer - Compare two JSON objects side-by-side',
        'JSON Path Evaluator - Query JSON data using JSONPath expressions',
        'JSON Schema Validator - Validate JSON against schemas',
        'JSON Formatter & Minifier - Format and compress JSON data',
      ]}
    />
    </>
  )
}
