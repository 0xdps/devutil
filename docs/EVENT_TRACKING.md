# Event Tracking & Analytics Documentation

## Overview

This project uses **Anately** for analytics and event tracking. Anately is a privacy-focused analytics platform that automatically tracks page views and custom events across your application.

**Website ID:** `c1ecfe71-2795-4b1c-8253-d9d64fc797e7`

The analytics script is loaded globally in `index.html` and works seamlessly across all React routes.

---

## Quick Start

### Track a Custom Event

```typescript
import { trackEvent } from "@/utils/analytics";

// Simple event
trackEvent("user_action");

// Event with data
trackEvent("tool_used", {
  tool: "json_formatter",
  duration: 1500,
  success: true,
});
```

### Track Page Views (Automatic)

Page views are automatically tracked when users navigate between routes. This is handled by the `usePageView` hook in the Layout component.

No manual action required for page view tracking!

---

## Available Tracking Functions

### 1. **trackEvent** (General Purpose)

Track any custom event with optional metadata.

```typescript
trackEvent(eventName: string, eventData?: Record<string, unknown>): void
```

**Example:**

```typescript
trackEvent("api_call", {
  endpoint: "/data-transform",
  method: "POST",
  statusCode: 200,
});
```

---

### 2. **trackToolUsage** (Tools)

Standardized function for tracking tool interactions.

```typescript
trackToolUsage(toolName: string, metadata?: {
  inputSize?: number;
  outputSize?: number;
  duration?: number;
  success?: boolean;
  error?: string;
}): void
```

**Example:**

```typescript
trackToolUsage("code_formatter", {
  inputSize: 1500,
  outputSize: 1620,
  duration: 250,
  success: true,
});
```

---

### 3. **trackCopy** (Clipboard)

Track when users copy content to clipboard.

```typescript
trackCopy(toolName: string, dataSize?: number): void
```

**Example:**

```typescript
trackCopy("json_formatter", 2048);
```

---

### 4. **trackDownload** (File Downloads)

Track file downloads from tools.

```typescript
trackDownload(toolName: string, fileType?: string): void
```

**Example:**

```typescript
trackDownload("qr_generator", "png");
trackDownload("code_formatter", "json");
```

---

### 5. **trackSearch** (Search)

Track tool/feature searches.

```typescript
trackSearch(searchQuery: string, resultCount?: number): void
```

**Example:**

```typescript
trackSearch("json", 3); // User searched for "json", found 3 results
```

---

### 6. **trackPageView** (Manual)

Manually track page views (usually not needed, handled by `usePageView` hook).

```typescript
trackPageView(pageName: string, metadata?: Record<string, unknown>): void
```

---

### 7. **identifyUser** (User Identification - Optional)

Link events to a specific user (useful with authentication).

```typescript
identifyUser(userId: string, userData?: Record<string, unknown>): void
```

**Example:**

```typescript
identifyUser("user_123", {
  email: "user@example.com",
  plan: "premium",
  joinedDate: "2024-01-15",
});
```

---

### 8. **resetAnalytics** (Logout)

Reset user identification when logging out.

```typescript
resetAnalytics(): void
```

---

## Event Categories & Examples

### Tool Usage Events

**Event Name:** `tool_used`

Track whenever a user interacts with a utility tool:

- Format code
- Encode/decode text
- Generate QR codes
- Verify hashes
- Compare diffs
- Convert timestamps
- etc.

```typescript
// In your tool component
trackToolUsage("json_formatter", {
  inputSize: 5000,
  outputSize: 5200,
  duration: 320,
  success: true,
});
```

---

### Copy Events

**Event Name:** `copy_to_clipboard`

Track when users copy formatted output:

```typescript
// When copy button is clicked
trackCopy("json_formatter", output.length);
```

---

### Download Events

**Event Name:** `file_downloaded`

Track file downloads:

```typescript
// When download button is clicked
trackDownload("qr_generator", "png");
```

---

### Page View Events

**Event Name:** `page_view`

Automatically tracked on every route change. Data includes:

- `page`: The current page name/path
- `pathname`: The full URL pathname
- `hostname`: The domain name
- `timestamp`: When the page was viewed

**Automatic triggering:**

```
Home → page_view (page: "home")
/json-tools → page_view (page: "json-tools")
/code-formatter → page_view (page: "code-formatter")
```

---

### Search Events

**Event Name:** `search`

Track when users search for tools:

```typescript
trackSearch("formatter", 2); // User searched for "formatter", got 2 results
```

---

### User Events

**Event Name:** `user_identified` (automatic)

When you call `identifyUser()`, Anately creates a user identification event with the data you provide.

```typescript
// After user login
identifyUser("user_456", {
  email: "user@example.com",
  subscription: "pro",
  registrationDate: "2024-03-01",
});
```

---

## Implementation Checklist

Use this checklist when adding analytics to new tools:

- [ ] **Page View** - Automatically tracked via `usePageView` hook
- [ ] **Tool Usage** - Call `trackToolUsage()` after tool execution
- [ ] **Copy Action** - Call `trackCopy()` in copy button handler
- [ ] **Download Action** - Call `trackDownload()` in download button handler
- [ ] **Errors** - Call `trackToolUsage()` with `success: false` and `error: message`

---

## Example: Implementing Analytics in a Component

Here's a complete example for a hypothetical "JSON Formatter" tool:

```typescript
import { useState } from 'react';
import { trackToolUsage, trackCopy, trackDownload } from '@/utils/analytics';

export function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleFormat = () => {
    const startTime = performance.now();

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);

      const duration = performance.now() - startTime;

      trackToolUsage('json_formatter', {
        inputSize: input.length,
        outputSize: formatted.length,
        duration: Math.round(duration),
        success: true
      });
    } catch (error) {
      const duration = performance.now() - startTime;

      trackToolUsage('json_formatter', {
        inputSize: input.length,
        duration: Math.round(duration),
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    trackCopy('json_formatter', output.length);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    element.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(output);
    element.download = 'formatted.json';
    element.click();

    trackDownload('json_formatter', 'json');
  };

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleFormat}>Format</button>
      <textarea value={output} readOnly />
      <button onClick={handleCopy}>Copy</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}
```

---

## Analytics Dashboard

View all tracked events in your Anately dashboard:
**Dashboard:** https://analytics.0xlabs.space/

You can filter events, view user journeys, see popular tools, track conversion funnels, and more.

---

## Data Privacy & Storage

- **Anately** is a privacy-focused analytics platform
- All events are stored securely
- User data is anonymized and compliant with GDPR/CCPA
- No personal data is stored without explicit user consent
- Events are accessible only to authorized team members

---

## Troubleshooting

### Events Not Appearing in Dashboard?

1. **Clear Browser Cache** - Dev tools might be caching responses

   ```bash
   # Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
   ```

2. **Check Console Errors** - Look for JavaScript errors in browser DevTools

   ```javascript
   // Verify Anately is available
   console.log(window.anately);
   ```

3. **Verify Website ID** - Ensure the ID matches: `c1ecfe71-2795-4b1c-8253-d9d64fc797e7`

4. **Check Network Tab** - Verify requests to `analytics.0xlabs.space` are being sent
   - Open DevTools → Network tab
   - Trigger an event
   - Look for POST requests to Anately

---

## Best Practices

✅ **DO:**

- Track meaningful events (tool usage, conversions, errors)
- Include relevant metadata for context
- Use consistent event naming (snake_case)
- Track both success and failure events
- Monitor error events to identify issues

❌ **DON'T:**

- Track personal identifiable information (PII) without consent
- Create events for every tiny interaction (be selective)
- Track sensitive passwords or API keys
- Overload events with unnecessary data
- Forget to track important user actions

---

## Questions or Issues?

- Check Anately documentation: https://anately.sh/docs
- Review analytics.ts for available functions
- Check the dashboard for real-time event data

Happy tracking! 📊
