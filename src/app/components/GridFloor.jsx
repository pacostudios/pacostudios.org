// A perspective grid fading into the distance, along the bottom of its parent.
export default function GridFloor({ className = "" }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/2 [perspective:500px] ${className}`}>
      <div
        className="absolute -inset-x-1/2 bottom-0 h-[200%] origin-bottom"
        style={{
          transform: "rotateX(62deg)",
          backgroundImage:
            "linear-gradient(rgba(139,120,255,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(139,120,255,0.28) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to top, transparent, black 18%, transparent 75%)",
        }}
      />
    </div>
  );
}
