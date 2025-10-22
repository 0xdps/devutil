# Contributing to devutil.xyz

First off, thank you for considering contributing to devutil.xyz! It's people like you that make devutil.xyz such a great tool.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples
- Describe the behavior you observed and what you expected
- Include screenshots if applicable

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- A clear and descriptive title
- A detailed description of the proposed feature
- Explain why this enhancement would be useful
- List any examples of where this feature exists in other tools

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code, add tests
3. Ensure the test suite passes
4. Make sure your code lints
5. Issue the pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/devutil.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## Code Style

- Use TypeScript
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

## Adding a New Tool

1. Create a new page component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Add the tool to the sidebar navigation in `src/components/Sidebar.tsx`
4. Update the README with the new tool

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
