'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setTransitionStage('fadeOut');
    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setTransitionStage('fadeIn');
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 250);

    return () => clearTimeout(timeout);
  }, [pathname, children]);

  return (
    <div className={`page-transition page-transition-${transitionStage}`}>
      {displayChildren}
    </div>
  );
}
