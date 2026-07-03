// Tiny global trigger for the waitlist popup. The popup itself is mounted once
// (see main.tsx) and listens for this event, so any "Join the waitlist" button —
// in the navbar, footer, or anywhere else — can open it without prop-drilling.
const OPEN_EVENT = "juice:open-waitlist";

export function openWaitlist() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function onOpenWaitlist(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
