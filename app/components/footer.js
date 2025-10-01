import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center group">
              <img 
                src="/images/background.png" 
                alt="Soft FS Logo" 
                className="h-8 w-auto sm:h-10 md:h-12 transition-all duration-500 transform group-hover:scale-110"
                width={300}
                height={100}
              />
              <div>
                <span className="text-white font-black italic text-xl pl-1 sm:text-2xl md:text-3xl">SOFT FS</span>
              </div>
              <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
              </div>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xs">
              Fournir des solutions technologiques innovantes pour les défis de demain. 
              Votre partenaire de confiance en transformation numérique et développement logiciel.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://www.facebook.com/softfsgroup" 
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/softfs_group/" 
                className="text-gray-400 hover:text-pink-400 transition-colors duration-200 hover:scale-110 transform"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://x.com/soft_fs" 
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
                aria-label="X (Twitter)"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/soft-fs-group/" 
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2 mb-4">
              Quick Links
            </h3>
            <nav>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="/" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Home</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/About" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">About Us</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/Services" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Services</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/Contact" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Contact</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2 mb-4">
              Our Services
            </h3>
            <nav>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="/Services" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Software Development</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/Services" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Web Applications</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/Services" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Mobile Development</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/Services" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Cloud Solutions</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/Services" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">IT Consulting</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2 mb-4">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <a 
                href="mailto:contact@softfs.com"
                className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-200 group"
              >
                <Mail size={18} className="text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm sm:text-base break-all">contact@softfs.com</span>
              </a>
              <a 
                href="tel:+237671178892"
                className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-200 group"
              >
                <Phone size={18} className="text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm sm:text-base">+237 671178892</span>
              </a>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base">Douala, Cameroon</span>
              </div>
              <a 
                href="https://www.softfs.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors duration-200 group mt-6"
              >
                <ExternalLink size={16} className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm sm:text-base">www.softfs.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm order-2 sm:order-1">
              © 2025 Soft FS. All rights reserved.
            </p>
            <nav className="order-1 sm:order-2">
              <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-sm">
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 whitespace-nowrap"
                >
                  Privacy Policy
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 whitespace-nowrap"
                >
                  Terms of Service
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 whitespace-nowrap"
                >
                  Cookie Policy
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
