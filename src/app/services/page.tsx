import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';

export default function ServicesPage() {
  return (
    <div id="ServicesScreen" className="Home-Screen">
      <HamburgerMenu />
      <div id="HeaderBody" className="Header-Body mx-auto py-8 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Our Services</h1>
        <div className="text-xl space-y-4">
          <p>This is our Services page where you can list your offerings or services.</p>
          <p>You can include detailed descriptions, pricing information, or any other service-related details.</p>
          <p>This page maintains the same theme and styling as the rest of the website.</p>
        </div>
      </div>
    </div>
  );
} 