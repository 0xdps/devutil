export interface Tool {
    name: string
    path: string
    icon: string
    description: string
    category: string
}

export interface ToolCategory {
    name: string
    tools: Tool[]
}
