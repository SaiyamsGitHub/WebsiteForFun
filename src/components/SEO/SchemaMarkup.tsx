'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

export interface SchemaOrgProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  siteUrl: string;
  organizationName?: string;
  logoUrl?: string;
  authorName?: string;
  datePublished?: string;
  dateModified?: string;
  type?: 'WebSite' | 'WebPage' | 'Article' | 'Organization' | 'Person';
}

const SchemaMarkup = ({
  title,
  description,
  canonicalUrl,
  siteUrl,
  organizationName = "Saiyam's Website",
  logoUrl = "/logo.png",
  authorName = "Saiyam",
  datePublished,
  dateModified,
  type = 'WebPage',
}: SchemaOrgProps) => {
  const pathname = usePathname();
  const url = canonicalUrl || `${siteUrl}${pathname}`;
  
  // Base schema that's common to all pages
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description: description,
    url: url,
  };
  
  // Add specific details based on schema type
  let schemaData = { ...baseSchema };
  
  if (type === 'WebSite') {
    schemaData = {
      ...schemaData,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    } as any;
  } else if (type === 'Article') {
    schemaData = {
      ...schemaData,
      headline: title,
      image: [`${siteUrl}/og-image.jpg`],
      datePublished: datePublished || new Date().toISOString(),
      dateModified: dateModified || new Date().toISOString(),
      author: {
        '@type': 'Person',
        name: authorName,
      },
      publisher: {
        '@type': 'Organization',
        name: organizationName,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}${logoUrl}`,
        },
      },
    } as any;
  } else if (type === 'Organization') {
    schemaData = {
      ...schemaData,
      logo: `${siteUrl}${logoUrl}`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-xxx-xxx-xxxx',
        contactType: 'customer service',
      },
      sameAs: [
        'https://twitter.com/yourusername',
        'https://www.linkedin.com/in/yourusername',
        'https://github.com/yourusername',
      ],
    } as any;
  }
  
  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default SchemaMarkup; 