import ComingSoon from './ComingSoon'

export default function CodeDiff() {
  return (
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
  )
}
