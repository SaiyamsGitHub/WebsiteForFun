import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';

export default function AboutPage() {
  return (
    <div id="AboutScreen" className="Home-Screen">
      <HamburgerMenu />
      <div id="HeaderBody" className="Header-Body mx-auto py-8 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <div className="text-xl space-y-4">
          <p>Welcome to our About page. This is where you can share information about yourself or your company.</p>
          <p>You can include your mission, vision, team members, or any other relevant details.</p>
          <p>This page maintains the same theme and styling as the rest of the website.</p>
        </div>
      </div>
    </div>
  );
} 