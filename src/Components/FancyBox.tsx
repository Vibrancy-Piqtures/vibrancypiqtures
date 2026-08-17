'use client';

import { useEffect } from 'react';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

interface FancyboxProps {
  children: React.ReactNode;
  options?: Record<string, any>;
}

export default function Fancybox({ children, options = {} }: FancyboxProps) {
  useEffect(() => {
    NativeFancybox.bind('[data-fancybox]', {
      Hash: false,
      ...options,
      Images: {
        zoom: true,
        click: false,
        wheel: 'slide',
        ...(options.Images || {}),
      },
    });

    return () => {
      NativeFancybox.unbind('[data-fancybox]');
      NativeFancybox.close();
    };
  }, [options]);

  return <>{children}</>;
}