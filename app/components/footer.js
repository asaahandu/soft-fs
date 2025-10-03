import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, ExternalLink } from 'lucide-react'

// Custom X (Twitter) Icon Component
const XIcon = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

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
              Des solutions informatique qui boostent votre reussite.
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
                <XIcon size={20} />
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
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Accueil</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/About" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">À Propos</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/Services" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Nos services</span>
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
              Nos services
            </h3>
            <nav>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="/Services" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Conception et production graphique</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/Services" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Photographie et Vidéographie</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/Services" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Sérigraphie et Impression Numérique</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/Services" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Développement d'applications Web et Mobile</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/Services" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Réseau informatique et support utilisateur</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/Services" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Audit des systèmes d'information & Fourniture informatique</span>
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
                <span className="text-sm sm:text-base break-all">info@softfsgroup.com</span>
              </a>
              <a 
                href="tel:+237671178892"
                className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-200 group"
              >
                <Phone size={18} className="text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm sm:text-base">+237 655571011</span>
              </a>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base">Douala, Cameroon</span>
              </div>
              <a 
                href="https://www.softfsgroup.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors duration-200 group mt-6"
              >
                <ExternalLink size={16} className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm sm:text-base">www.softfsgroup.com</span>
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
              © 2025 soft fs.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
