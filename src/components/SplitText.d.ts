import type { ElementType } from "react";

/**
 * Types for the React Bits SplitText component. Declared here rather than
 * converted inline so `SplitText.jsx` stays byte-for-byte upstream and can be
 * re-pulled without losing edits. Everything but `text` is optional, which is
 * what the component's own defaults already imply.
 */
export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right" | "justify" | "start" | "end";
  tag?: ElementType;
  onLetterAnimationComplete?: () => void;
}

declare const SplitText: (props: SplitTextProps) => JSX.Element;
export default SplitText;
