import React, { useEffect } from 'react';
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function Fancybox({ children, options = {} }) {
  useEffect(() => {
    NativeFancybox.bind("[data-fancybox]", {
      Hash: false,
      ...options,
      Image: {
        zoom: true,
        click: false,
        wheel: "slide",
        ...(options.Image || {}),
      },
    });

    return () => {
      NativeFancybox.unbind("[data-fancybox]");
      NativeFancybox.close();
    };
  }, [options]);

  return <>{children}</>;
}

export default Fancybox;
