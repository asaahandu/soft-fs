import { Mail, Phone, MapPin, Linkedin, Twitter, Github, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold">Soft FS</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Delivering innovative technology solutions for tomorrow's challenges. 
              Your trusted partner in digital transformation and software development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Home</a></li>
              <li><a href="/About" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">About Us</a></li>
              <li><a href="/Services" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Services</a></li>
              <li><a href="/Contact" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Software Development</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Web Applications</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Mobile Development</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Cloud Solutions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">IT Consulting</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={16} className="text-blue-400" />
                <span className="text-sm">contact@softfs.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone size={16} className="text-blue-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={16} className="text-blue-400" />
                <span className="text-sm">123 Tech Street, Digital City</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 mt-4">
                <ExternalLink size={14} className="text-blue-400" />
                <span className="text-sm text-blue-400">www.softfs.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Soft FS. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
