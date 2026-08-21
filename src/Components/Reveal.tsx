'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
  as?: ElementType;
  style?: CSSProperties;
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true,
  as: Tag = 'div',
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { 
        threshold: 0.05, 
        rootMargin: '150px 0px 150px 0px',
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const transformMap: Record<string, string> = {
    up: 'translateY(30px)',
    down: 'translateY(-30px)',
    left: 'translateX(30px)',
    right: 'translateX(-30px)',
    none: 'none',
  };

  const initialTransform = transformMap[direction] ?? 'translateY(30px)';
  const Component = Tag as ElementType;

  return (
    <Component
      ref={ref as any}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{
        transform: isVisible ? 'none' : initialTransform,
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </Component>
  );
}