"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface FadeInImageProps extends Omit<ImageProps, "onLoad"> {
  wrapperClassName?: string;
}

export default function FadeInImage({
  wrapperClassName = "",
  alt,
  fill,
  ...props
}: FadeInImageProps) {
  const [loaded, setLoaded] = useState(false);

  const wrapperClasses = fill
    ? `absolute inset-0 ${wrapperClassName}`
    : `relative ${wrapperClassName}`;

  return (
    <div className={`overflow-hidden ${wrapperClasses}`}>
      <div
        className={`absolute inset-0 bg-neutral-100 dark:bg-neutral-900 transition-opacity duration-500 z-0 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
      <Image
        {...props}
        fill={fill}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-700 ease-in-out ${
          loaded ? "opacity-100" : "opacity-0"
        } ${props.className || ""}`}
      />
    </div>
  );
}