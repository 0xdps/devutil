export const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(text)
        return true
    } catch (err) {
        console.error('Failed to copy to clipboard:', err)
        return false
    }
}

export const downloadAsFile = (content: string, filename: string, type = 'text/plain') => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}
