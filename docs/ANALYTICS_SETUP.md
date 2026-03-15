# Analytics Setup & Usage Guide

## ✅ Setup Complete

Your project now has **Anately analytics** fully integrated. Here's what was set up:

### Files Added/Modified

| File                        | Purpose                           |
| --------------------------- | --------------------------------- |
| `index.html`                | Added Anately tracking script     |
| `src/utils/analytics.ts`    | Core analytics functions          |
| `src/hooks/usePageView.ts`  | Automatic page view tracking hook |
| `src/components/Layout.tsx` | Integrated page view tracking     |
| `docs/EVENT_TRACKING.md`    | Comprehensive event documentation |

---

## 🚀 Quick Start to Track Events

### In Any Component

```typescript
import { trackToolUsage, trackCopy, trackDownload } from '@/utils/analytics';

function MyComponent() {
  const handleToolUse = () => {
    // Track tool usage
    trackToolUsage('my_tool', {
      inputSize: 1000,
      duration: 250,
      success: true
    });
  };

  const handleCopy = () => {
    trackCopy('my_tool', 500);
    // Copy logic here
  };

  const handleDownload = () => {
    trackDownload('my_tool', 'json');
    // Download logic here
  };

  return (
    <div>
      <button onClick={handleToolUse}>Use Tool</button>
      <button onClick={handleCopy}>Copy</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}
```

---

## 📊 Available Functions

### Core Functions

- **`trackEvent(name, data)`** - Track any custom event
- **`trackToolUsage(toolName, metadata)`** - Track tool usage
- **`trackCopy(toolName, dataSize)`** - Track copy actions
- **`trackDownload(toolName, fileType)`** - Track download actions
- **`trackSearch(query, resultCount)`** - Track searches
- **`trackPageView(pageName, metadata)`** - Manual page view (usually not needed)
- **`identifyUser(userId, userData)`** - Link events to users
- **`resetAnalytics()`** - Reset on logout

---

## 🔄 Automatic Tracking

**Page Views** are automatically tracked when users navigate:

- No code needed!
- Handled by `usePageView()` hook in Layout component

---

## 📖 Full Documentation

For complete details, examples, and best practices, see:
**[`docs/EVENT_TRACKING.md`](../EVENT_TRACKING.md)**

---

## 🌐 View Analytics

Check your Anately dashboard:

- **URL:** https://manage.anately.sh/
- **Website ID:** `3a156bab-4fdb-48d1-aebe-d67029b5bc40`

Go to your dashboard to see:

- All tracked events in real-time
- Page views and user journeys
- Most popular tools
- Tool usage patterns
- Download statistics
- And more!

---

## ✨ What's Being Tracked Now

| Event          | Trigger                | How to Track            |
| -------------- | ---------------------- | ----------------------- |
| **Page View**  | User navigates         | Automatic (via Layout)  |
| **Tool Usage** | User runs a tool       | Call `trackToolUsage()` |
| **Copy**       | User copies output     | Call `trackCopy()`      |
| **Download**   | User downloads file    | Call `trackDownload()`  |
| **Search**     | User searches for tool | Call `trackSearch()`    |

---

## 💡 Tips

1. **Import from `@/utils/analytics`** - Use path alias for clean imports
2. **Track errors too** - Use `trackToolUsage(..., { success: false, error: 'msg' })`
3. **Measure performance** - Use `performance.now()` to measure tool duration
4. **Include metadata** - Always pass relevant data about what happened
5. **Test it** - Use browser DevTools to verify events are sent

---

## ❓ Questions?

See **[`docs/EVENT_TRACKING.md`](../EVENT_TRACKING.md)** for:

- Detailed function documentation
- Complete examples
- Troubleshooting guide
- Best practices

Happy tracking! 📊
