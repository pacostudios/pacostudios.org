"use client";

// Rendered on the client so the year stays right even if the static page was
// built in a previous year.
export default function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
