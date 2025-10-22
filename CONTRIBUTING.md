# Contributing to DevUtil

First off, thank you for considering contributing to DevUtil! It's people like you that make DevUtil such a great tool for the developer community.

## 📊 Project Status

**Current State**: 80% Complete

- **16 tools** fully implemented and functional
- **4 tools** marked as "Coming Soon"
- **20/20 pages** have complete SEO implementation
- **Tech Stack**: React 18.3 + TypeScript 5.5 + Vite 5 + Tailwind CSS 3.4

## 🎯 Ways to Contribute

### 1. Implement "Coming Soon" Tools

Help complete the remaining 20% of the project:

#### High Priority

- **JSON Tools** (`src/pages/JSONTools.tsx`)
  - JSON Diff Viewer
  - JSONPath Evaluator
  - JSON Schema Validator
- **Code Diff** (`src/pages/CodeDiff.tsx`)
  - Side-by-side comparison
  - Syntax highlighting support
- **SEO Generator** (`src/pages/SEOGenerator.tsx`)
  - Meta tags generator
  - Robots.txt builder
  - Sitemap.xml generator
- **Regex Playground** (`src/pages/RegexPlayground.tsx`)
  - Interactive regex testing
  - Pattern library
  - Explanation generator

### 2. Enhance Existing Tools

- Add more encoding formats to Encoding tool
- Improve password strength checker in Hash & Verify
- Add more case conversion types to Text Utilities
- Enhance JWT Decoder with signature verification
- Add syntax highlighting to Code Formatter
- Improve color format conversions in Color Picker

### 3. Bug Fixes & Improvements

- Report and fix bugs
- Improve error handling
- Enhance accessibility (a11y)
- Optimize performance
- Improve mobile responsiveness
- Fix TypeScript type issues

### 4. Documentation

- Improve code comments
- Add JSDoc documentation
- Create video tutorials
- Write blog posts about tools
- Translate documentation (i18n)
- Update README with examples

### 5. Testing

- Write unit tests for components
- Add integration tests
- Test browser compatibility
- Perform accessibility audits
- Test on different devices

### 6. Design & UX

- Improve UI/UX design
- Create better icons
- Design better color schemes
- Improve animations and transitions
- Make it more intuitive

## 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples
- Describe the behavior you observed and what you expected
- Include screenshots if applicable
- Mention your browser and OS version
- Check console for any errors

**Bug Report Template:**

```markdown
**Description**: Brief description of the bug

**Steps to Reproduce**:

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**: What you expected to happen

**Actual Behavior**: What actually happened

**Screenshots**: If applicable

**Environment**:

- Browser: [e.g., Chrome 120]
- OS: [e.g., macOS 14.0]
- Tool: [e.g., JWT Decoder]
```

## 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- A clear and descriptive title
- A detailed description of the proposed feature
- Explain why this enhancement would be useful
- List any examples of where this feature exists in other tools
- Consider the scope and complexity
- Think about backward compatibility

**Feature Request Template:**

```markdown
**Feature Name**: Name of the feature

**Description**: Clear description of what you want

**Use Case**: Why would this be useful?

**Examples**: Similar features in other tools

**Implementation Ideas**: Any thoughts on how to implement this (optional)
```

## 🔄 Pull Request Process

### Before You Start

1. Check if there's an existing issue for what you want to work on
2. Comment on the issue to let others know you're working on it
3. Fork the repository to your account
4. Create a new branch from `develop`

### Making Changes

1. **Clone your fork**

```bash
git clone https://github.com/YOUR_USERNAME/devutil.git
cd devutil
git checkout develop
git checkout -b feature/your-feature-name
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
# App runs at http://localhost:5173
```

4. **Make your changes**

   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Keep commits focused and atomic

5. **Test your changes**

```bash
# Run linter
npm run lint

# Run tests (if available)
npm test

# Build to check for errors
npm run build
```

6. **Commit your changes**

```bash
git add .
git commit -m "feat: add new feature description"
```

**Commit Message Convention:**

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

7. **Push to your fork**

```bash
git push origin feature/your-feature-name
```

8. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Link related issues

### Pull Request Guidelines

- ✅ **Do:**

  - Write clear PR description
  - Reference related issues
  - Include screenshots for UI changes
  - Update documentation if needed
  - Ensure all checks pass
  - Respond to review comments
  - Keep PRs focused and small

- ❌ **Don't:**
  - Submit massive PRs with unrelated changes
  - Include unnecessary files or dependencies
  - Break existing functionality
  - Ignore linting errors
  - Forget to update documentation

## 💻 Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm
- Git
- Code editor (VS Code recommended)

### Initial Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/devutil.git
cd devutil

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Development Commands

```bash
# Development
npm run dev          # Start dev server with HMR

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking

# Testing
npm test            # Run tests (when implemented)
```

## 📝 Code Style Guidelines

### TypeScript

```typescript
// ✅ Good: Use TypeScript types
interface Tool {
  name: string;
  path: string;
  icon: string;
}

const tools: Tool[] = [...];

// ❌ Bad: Using 'any' type
const tools: any[] = [...];
```

### React Components

```tsx
// ✅ Good: Functional components with TypeScript
export default function MyComponent({ data }: { data: string }) {
  const [state, setState] = useState<string>("");

  return <div>{data}</div>;
}

// ❌ Bad: Class components or no types
export default function MyComponent(props) {
  // ...
}
```

### Naming Conventions

- **Components**: PascalCase (`MyComponent.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase (`myVariable`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_LENGTH`)
- **CSS Classes**: Use Tailwind utility classes
- **Functions**: Descriptive names (`handleSubmit`, `formatDate`)

### File Organization

```tsx
// 1. Imports (external first, then internal)
import { useState } from "react";
import toast from "react-hot-toast";
import SEO from "../components/SEO";

// 2. Types/Interfaces
interface Props {
  data: string;
}

// 3. Component
export default function Component({ data }: Props) {
  // 4. Hooks
  const [state, setState] = useState("");

  // 5. Functions
  const handleClick = () => {
    // ...
  };

  // 6. Return JSX
  return <div>{/* Content */}</div>;
}
```

### Styling with Tailwind

```tsx
// ✅ Good: Use Tailwind utility classes
<div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800">
  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
    Title
  </h1>
</div>

// Always include dark mode variants
<p className="text-gray-900 dark:text-white">Text</p>
```

## 🛠️ Adding a New Tool

### Step-by-Step Guide

1. **Create the page component**

Create `src/pages/YourTool.tsx`:

```tsx
import { useState } from "react";
import toast from "react-hot-toast";
import SEO from "../components/SEO";
import { toolsMetadata } from "../config/seoConfig";

export default function YourTool() {
  const meta = toolsMetadata.yourTool;
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleProcess = () => {
    try {
      // Your tool logic here
      setOutput(processedData);
      toast.success("Success!");
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

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
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Tool Name
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Brief description</p>
        </div>

        {/* Your tool UI here */}
      </div>
    </>
  );
}
```

2. **Add SEO metadata**

Edit `src/config/seoConfig.ts`:

```typescript
export const toolsMetadata: Record<string, ToolMeta> = {
  // ... existing tools
  yourTool: {
    title: "Your Tool | What It Does | DevUtil",
    description: "150-160 character description of your tool and its benefits.",
    keywords: ["keyword1", "keyword2", "your tool", "online tool"],
    canonical: "/your-tool",
    toolName: "Your Tool",
    toolDescription: "One-sentence description of the tool.",
  },
};
```

3. **Add route**

Edit `src/App.tsx`:

```tsx
import YourTool from "./pages/YourTool";

// Add to Routes
<Route path="/your-tool" element={<YourTool />} />;
```

4. **Add to navigation**

Edit `src/components/Sidebar.tsx`:

```tsx
{
  category: 'Appropriate Category',
  items: [
    // ... existing items
    { name: 'Your Tool', path: '/your-tool', icon: '🔧' },
  ],
}
```

5. **Update sitemap**

Edit `public/sitemap.xml`:

```xml
<url>
  <loc>https://devutil.xyz/your-tool</loc>
  <lastmod>2025-01-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

6. **Test your tool**

```bash
# Run dev server
npm run dev

# Navigate to /your-tool
# Test all functionality
# Check for errors in console
# Test on mobile
```

7. **Create PR**

Follow the Pull Request Process above.

## 🧪 Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] Tool works as expected
- [ ] Error handling works
- [ ] Copy/download features work
- [ ] Dark mode looks good
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Tooltips/help text are clear
- [ ] Keyboard navigation works
- [ ] SEO meta tags are correct

### Browser Testing

Test on:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## 📚 Resources

### Project Documentation

- [README.md](README.md) - Project overview
- [DEVELOPMENT.md](DEVELOPMENT.md) - Development guide
- [SEO_IMPLEMENTATION.md](SEO_IMPLEMENTATION.md) - SEO guide
- [PROJECT_SETUP.md](PROJECT_SETUP.md) - Setup instructions

### External Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

## 🤝 Community

### Getting Help

- 💬 [GitHub Discussions](https://github.com/devendrapratap02/devutil/discussions) - Ask questions
- 🐛 [GitHub Issues](https://github.com/devendrapratap02/devutil/issues) - Report bugs
- 📧 Email: devendra@example.com (if applicable)

### Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please:

- Be respectful and inclusive
- Be patient and understanding
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🎉 Recognition

Contributors will be recognized in:

- README.md Contributors section
- GitHub Contributors page
- Release notes

Thank you for making DevUtil better! 🚀
