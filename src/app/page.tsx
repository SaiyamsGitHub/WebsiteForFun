import HamburgerMenu from '../components/HamburgerMenu/HamburgerMenu';
import Link from 'next/link';
import { Metadata } from 'next';

// Add metadata export for Next.js App Router
export const metadata: Metadata = {
  title: 'Creative 3D Web Experiences | Interactive Websites | Saiyam',
  description: 'Explore interactive 3D web experiences and creative digital projects by Saiyam. Featuring Three.js animations, web games, and immersive digital experiences.',
  keywords: 'interactive websites, 3D web, Three.js, creative coding, digital experiences, web animation',
  openGraph: {
    title: 'Creative 3D Web Experiences | Saiyam',
    description: 'Explore interactive 3D web experiences and projects featuring Three.js, animations, and creative coding by Saiyam.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function Home() {
  return (
    <div id="HomeScreen" className="Home-Screen">
      <HamburgerMenu />
      <div id="HeaderBody" className="Header-Body mx-auto py-8 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Creative 3D Web Experiences</h1>
        
        <div className="text-xl space-y-4">
          <p>Welcome to my showcase of interactive 3D web experiences and creative digital projects.</p>
          <p>This website features immersive particle and wave effects created with Three.js.</p>
          <p>Explore my portfolio of web animations, interactive experiences, and digital experiments.</p>
        </div>
        
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {[
            { href: '/projects', label: 'View Projects' },
            { href: '/services', label: 'Services' },
            { href: '/contact', label: 'Get in Touch' },
          ].map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 