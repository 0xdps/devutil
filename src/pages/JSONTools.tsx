import ComingSoon from './ComingSoon'

export default function JSONTools() {
  return (
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
  )
}
