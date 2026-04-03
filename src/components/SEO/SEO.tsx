'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { SchemaMarkup } from '.';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
  canonicalUrl?: string;
  schemaType?: 'WebPage' | 'Article' | 'Organization' | 'Person';
}

const SEO = ({
  title = 'Fun Website',
  description = 'A blank website for fun purposes.',
  keywords = 'fun, website, 3D, interactive',
  ogImage = '/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noindex = false,
  canonicalUrl,
  schemaType = 'WebPage',
}: SEOProps) => {
  const pathname = usePathname();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  const pageUrl = canonicalUrl || `${siteUrl}${pathname}`;
  const fullTitle = `${title} | Fun Website`;
  
  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />
        
        {/* Robots Meta */}
        {noindex ? (
          <meta name="robots" content="noindex, nofollow" />
        ) : (
          <meta name="robots" content="index, follow" />
        )}
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${siteUrl}${ogImage}`} />
        <meta property="og:site_name" content="Fun Website" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      </Head>
      
      {/* Structured Data */}
      <SchemaMarkup
        title={title}
        description={description}
        canonicalUrl={pageUrl}
        siteUrl={siteUrl}
        type={schemaType}
      />
    </>
  );
};

export default SEO; 