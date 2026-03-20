/**
 * Analytics utility for Anately (powered by Umami)
 * Provides functions to track user events, page views, and custom events.
 *
 * The Anately script is loaded globally in index.html and exposes window.umami
 * (standard Umami v2 global).
 *
 * Offline support: events fired while offline are persisted to localStorage
 * and automatically flushed once connectivity is restored.
 */

declare global {
  interface Window {
    // Anately is Umami-powered — the global is window.umami
    umami?: {
      track: (eventName: string, eventData?: Record<string, unknown>) => void;
      identify: (sessionData: Record<string, string | number>) => void;
    };
  }
}

// ---------------------------------------------------------------------------
// Offline event queue
// ---------------------------------------------------------------------------

const QUEUE_KEY = 'devutil_analytics_queue';
const MAX_QUEUE_SIZE = 200; // guard against unbounded growth

interface QueuedEvent {
  eventName: string;
  eventData?: Record<string, unknown>;
  queuedAt: string;
}

function readQueue(): QueuedEvent[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function writeQueue(queue: QueuedEvent[]): void {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // localStorage full or unavailable — drop silently
  }
}

function enqueue(eventName: string, eventData?: Record<string, unknown>): void {
  const queue = readQueue();
  if (queue.length >= MAX_QUEUE_SIZE) {
    // Drop the oldest entry to make room (FIFO eviction)
    queue.shift();
  }
  queue.push({ eventName, eventData, queuedAt: new Date().toISOString() });
  writeQueue(queue);
}

function flushQueue(): void {
  if (!navigator.onLine || !window.umami?.track) return;
  const queue = readQueue();
  if (queue.length === 0) return;

  // Clear the queue first so a failure mid-flush doesn't cause double-sends
  writeQueue([]);

  for (const { eventName, eventData } of queue) {
    try {
      window.umami.track(eventName, eventData);
    } catch {
      // best-effort: a single bad event shouldn't block the rest
    }
  }
}

// Flush whenever the browser comes back online
if (typeof window !== 'undefined') {
  window.addEventListener('online', flushQueue);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Track a custom event in Anately.
 * When offline, the event is queued in localStorage and replayed automatically
 * once the device reconnects.
 *
 * @param eventName - Name of the event (e.g., "tool_used", "code_copied")
 * @param eventData - Optional object with event metadata
 *
 * @example
 * trackEvent("code_formatter_used", { format: "json", linesOfCode: 250 })
 */
export const trackEvent = (
  eventName: string,
  eventData?: Record<string, unknown>
): void => {
  try {
    if (!navigator.onLine) {
      enqueue(eventName, eventData);
      return;
    }
    if (window.umami?.track) {
      window.umami.track(eventName, eventData);
    }
  } catch (error) {
    // Fallback: queue on any unexpected failure so events aren't lost
    try { enqueue(eventName, eventData); } catch { /* ignore */ }
    console.warn("Analytics tracking failed:", error);
  }
};

/**
 * Identify a session in Anately with additional properties.
 * Data values must be strings or numbers (Umami requirement).
 *
 * @param sessionData - Object with session/user properties to attach
 *
 * @example
 * identifyUser({ userId: "user123", plan: "pro" })
 */
export const identifyUser = (
  sessionData: Record<string, string | number>
): void => {
  try {
    if (window.umami?.identify) {
      window.umami.identify(sessionData);
    }
  } catch (error) {
    console.warn("User identification failed:", error);
  }
};

/**
 * Track a tool usage event
 * Standardized function for tracking when users interact with tools
 * 
 * @param toolName - Name of the tool (e.g., "json_formatter", "code_diff")
 * @param metadata - Optional metadata about the usage
 */
export const trackToolUsage = (
  toolName: string,
  metadata?: {
    inputSize?: number;
    outputSize?: number;
    duration?: number;
    success?: boolean;
    error?: string;
  }
): void => {
  trackEvent("tool_used", {
    tool: toolName,
    timestamp: new Date().toISOString(),
    ...metadata,
  });
};

/**
 * Track a copy-to-clipboard action
 * 
 * @param toolName - Name of the tool where copy occurred
 * @param dataSize - Size of copied data in characters/bytes
 */
export const trackCopy = (toolName: string, dataSize?: number): void => {
  trackEvent("copy_to_clipboard", {
    tool: toolName,
    dataSize,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track a download action
 * 
 * @param toolName - Name of the tool where download occurred
 * @param fileType - Type of file being downloaded (e.g., "png", "json")
 */
export const trackDownload = (toolName: string, fileType?: string): void => {
  trackEvent("file_downloaded", {
    tool: toolName,
    fileType,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track page/view changes
 * Called automatically by usePageView hook
 * 
 * @param pageName - Name/path of the page
 * @param metadata - Optional metadata about the page view
 */
export const trackPageView = (
  pageName: string,
  metadata?: Record<string, unknown>
): void => {
  trackEvent("page_view", {
    page: pageName,
    timestamp: new Date().toISOString(),
    ...metadata,
  });
};

/**
 * Track a feature/tool search
 * 
 * @param searchQuery - What the user searched for
 * @param resultCount - Number of results found
 */
export const trackSearch = (searchQuery: string, resultCount?: number): void => {
  trackEvent("search", {
    query: searchQuery,
    resultCount,
    timestamp: new Date().toISOString(),
  });
};
