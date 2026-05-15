export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">KunTechs</h3>
            <p className="text-sm">Building innovative AI solutions for the modern world.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition">Digital AI</a></li>
              <li><a href="/" className="hover:text-white transition">Consulting</a></li>
              <li><a href="/" className="hover:text-white transition">Development</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:info@kuntechs.com" className="hover:text-white transition">info@kuntechs.com</a></li>
              <li><a href="tel:+1234567890" className="hover:text-white transition">+1 (234) 567-8900</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} KunTechs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
