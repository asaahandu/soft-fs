import { Search, Phone, Mail, MapPin } from "lucide-react"

export default function Header() {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-eduka-orange text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Douala
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>contact@softfs.com</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+237 671178892</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#A5A6C8' }}>
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">Soft FS</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-gray-700 hover:text-eduka-orange font-medium">
              Home
            </a>
            <a href="/Services" className="text-gray-700 hover:text-eduka-orange font-medium">
              Services
            </a>
            <a href="/About" className="text-gray-700 hover:text-eduka-orange font-medium">
              A Propos
            </a>
            <a href="/Contact" className="text-gray-700 hover:text-eduka-orange font-medium">
              Contact
            </a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button
              className="bg-eduka-orange hover:bg-blue-700 text-white px-6 py-2 rounded-full"
            >
              Postuler pour un Service
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
