"use client";

// A link that smooth-scrolls to in-page anchors ("#contact") and focuses the
// first form field inside the target. Other hrefs behave like normal links.
export default function ScrollLink({ href, onClick, children, ...props }) {
  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || !href.startsWith("#")) return;

    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.querySelector("input, select, textarea")?.focus({ preventScroll: true });
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
