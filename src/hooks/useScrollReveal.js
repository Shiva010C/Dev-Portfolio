import { useEffect, useState } from "react";

/*
  Scroll reveal helper:
  - Reveals when a section enters the viewport.
  - Hides again when it leaves, so scroll-up also gets an animation.
*/
export default function useScrollReveal(options = {}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = options.ref?.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: options.threshold ?? 0.16, rootMargin: options.rootMargin ?? "-6% 0px -6% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options.ref, options.threshold, options.rootMargin]);

  return visible;
}