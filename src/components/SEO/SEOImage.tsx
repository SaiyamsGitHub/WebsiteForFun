'use client';

import Image, { ImageProps } from 'next/image';

interface SEOImageProps extends Omit<ImageProps, 'alt'> {
  alt: string; // Make alt required
  title?: string;
  caption?: string;
  className?: string;
}

const SEOImage = ({ 
  alt, 
  title, 
  caption, 
  className = '', 
  ...props 
}: SEOImageProps) => {
  return (
    <figure className={className}>
      <Image
        alt={alt}
        title={title || alt}
        {...props}
      />
      {caption && (
        <figcaption className="text-sm text-gray-600 mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default SEOImage; 