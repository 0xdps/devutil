/**
 * Analytics utility for Anately (powered by Umami)
 * Provides functions to track user events, page views, and custom events.
 *
 * The Anately script is loaded globally in index.html and exposes window.umami
 * (standard Umami v2 global).
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

/**
 * Track a custom event in Anately
 * Works across all pages since Anately is loaded globally
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
    if (window.umami?.track) {
      window.umami.track(eventName, eventData);
    }
  } catch (error) {
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
