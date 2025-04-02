import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import ContactInfo from '@/components/ContactInfo/ContactInfo';
import ContactForm from '@/components/ContactForm/ContactForm';

export default function ContactPage() {
  return (
    <div id="ContactScreen" className="Home-Screen">
      <HamburgerMenu />
      <div id="ContactHeaderBody" className="Header-Body mx-auto py-8 px-4 text-center">
        <h1 id="ContactTitle" className="text-4xl font-bold mb-4 text-white">Contact Us</h1>
        <p id="ContactDescription" className="text-gray-300 mb-12 max-w-2xl mx-auto">
          Have questions or need assistance? We'd love to hear from you. Fill out the form below, and we'll respond as soon as possible.
        </p>
        
        <div id="ContactContentGrid" className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
} 