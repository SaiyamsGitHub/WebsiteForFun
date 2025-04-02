import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';

export default function ProjectsPage() {
  return (
    <div id="ProjectsScreen" className="Home-Screen">
      <HamburgerMenu />
      <div id="HeaderBody" className="Header-Body mx-auto py-8 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Our Projects</h1>
        <div className="text-xl space-y-4">
          <p>This is our Projects page where you can showcase your work and achievements.</p>
          <p>You can include case studies, portfolio items, or any other project-related information.</p>
          <p>This page maintains the same theme and styling as the rest of the website.</p>
        </div>
      </div>
    </div>
  );
} 