import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../utils/analytics";

/**
 * Custom React hook to automatically track page views on route changes.
 * Used in Layout so every navigation fires a page_view event.
 */
export const usePageView = (): void => {
  const location = useLocation();

  useEffect(() => {
    const pageName = location.pathname === "/" ? "home" : location.pathname.slice(1);
    trackPageView(pageName, {
      pathname: location.pathname,
      hostname: window.location.hostname,
    });
  }, [location.pathname]);
};
