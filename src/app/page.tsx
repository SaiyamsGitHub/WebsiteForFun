import HamburgerMenu from '../components/HamburgerMenu/HamburgerMenu';
import Link from 'next/link';

export default function Home() {
  return (
    <div id="HomeScreen" className="Home-Screen">
      <HamburgerMenu />
      <div id="HeaderBody" className="Header-Body mx-auto py-8 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Saiyam's Website</h1>
        <div className="text-xl space-y-4">
          <p>This is the home page of our website featuring a beautiful 3D background.</p>
          <p>The website uses Three.js to create an immersive particle and wave effect.</p>
          <p>Navigate through the menu to explore other pages.</p>
        </div>
      </div>
    </div>
  );
} 