"use client";

// A link that smooth-scrolls to in-page anchors ("#contact") and focuses the
// first form field inside the target. If the section isn't on this page, it
// goes to that section on the home page. Other hrefs behave like normal links.
export default function ScrollLink({ href, onClick, children, ...props }) {
  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || !href.startsWith("#")) return;

    const target = document.getElementById(href.slice(1));
    e.preventDefault();
    if (!target) {
      window.location.assign(`/${href}`);
      return;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.querySelector("input, select, textarea")?.focus({ preventScroll: true });
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
