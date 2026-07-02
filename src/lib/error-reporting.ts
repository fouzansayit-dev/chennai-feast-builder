export function reportAppError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") {
    console.error("[SSR Server Error]", error, context);
    return;
  }
  console.error("[App Client Error]", error, {
    route: window.location.pathname,
    ...context,
  });
}
