'use client';
import { Phone, Mail, MapPin, Clock, Send, User, MessageCircle, Building, Globe, Facebook, Twitter, Linkedin, Instagram, CheckCircle, ArrowRight } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"
import { useState } from "react"

// Contact information data
const contactInfo = [
  {
    icon: Phone,
    title: "Téléphone",
    details: ["+237 671 178 892", "+237 695 123 456"],
    description: "Appelez-nous à tout moment"
  },
  {
    icon: Mail,
    title: "Email",
    details: ["contact@softfs.com", "info@softfs.com"],
    description: "Envoyez-nous un message"
  },
  {
    icon: MapPin,
    title: "Adresse",
    details: ["Douala, Cameroun", "Bonanjo, Rue de la Liberté"],
    description: "Venez nous rendre visite"
  },
  {
    icon: Clock,
    title: "Heures d'Ouverture",
    details: ["Lun - Ven: 8h - 18h", "Sam: 9h - 16h"],
    description: "Nos heures de bureau"
  }
]

// Social media links
const socialLinks = [
  { icon: Facebook, url: "#", name: "Facebook" },
  { icon: Twitter, url: "#", name: "Twitter" },
  { icon: Linkedin, url: "#", name: "LinkedIn" },
  { icon: Instagram, url: "#", name: "Instagram" }
]

// Services for contact form
const serviceOptions = [
  "Développement Web",
  "Design Graphique", 
  "Développement d'Applications Mobiles",
  "Serigraphie & Impression Numérique",
  "Photographie & Vidéographie",
  "Réseau Informatique & Support",
  "Audit des Systèmes d'Information",
  "Autre"
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section - Smaller than Services page */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 py-12 px-4 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/design.jpg')`,
          }}
        />
        
        <div className="absolute inset-0 bg-blue-900/80" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-white font-semibold mb-3 flex items-center justify-center gap-2">
              <div className="w-6 h-0.5 bg-white" />
              CONTACTEZ-NOUS
              <div className="w-6 h-0.5 bg-white" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Parlons de Votre Projet <span className="text-eduka-blue">Ensemble</span>
            </h1>

            <p className="text-gray-200 text-base mb-6 leading-relaxed max-w-xl mx-auto">
              Prêt à transformer vos idées en réalité numérique ? Notre équipe d'experts est là pour vous aider à chaque étape de votre parcours technologique.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <div className="bg-eduka-blue text-white hover:bg-blue-700 px-6 py-2 rounded-full text-sm flex items-center justify-center gap-2 transition-colors">
                <Phone className="w-4 h-4" />
                Appelez Maintenant
              </div>
              <div className="border border-white text-white hover:bg-white hover:text-gray-800 px-6 py-2 rounded-full text-sm flex items-center justify-center gap-2 bg-transparent transition-colors">
                <Mail className="w-4 h-4" />
                Envoyez un Email
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="text-eduka-blue font-semibold mb-4 flex items-center justify-center gap-2">
              <div className="w-8 h-0.5 bg-eduka-blue" />
              INFORMATIONS DE CONTACT
              <div className="w-8 h-0.5 bg-eduka-blue" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Plusieurs Façons de Nous <span className="text-eduka-blue">Joindre</span>
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Choisissez le moyen de communication qui vous convient le mieux. Nous sommes disponibles et prêts à vous aider.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-eduka-blue to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center group-hover:text-eduka-blue transition-colors duration-300">
                    {info.title}
                  </h3>
                  
                  <p className="text-sm text-gray-500 text-center mb-3">
                    {info.description}
                  </p>

                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <div key={idx} className="text-gray-700 text-center text-sm font-medium">
                        {detail}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="w-12 h-1 bg-gradient-to-r from-eduka-blue to-blue-700 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <div className="text-eduka-blue font-semibold mb-4 flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-eduka-blue" />
                  FORMULAIRE DE CONTACT
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Démarrons Votre <span className="text-eduka-blue">Projet</span>
                </h2>

                <p className="text-gray-600 leading-relaxed">
                  Remplissez le formulaire ci-dessous et nous vous contacterons dans les 24 heures pour discuter de vos besoins spécifiques.
                </p>
              </div>

              {/* Success Message */}
              {isSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-green-800">Message envoyé avec succès !</h4>
                    <p className="text-green-600 text-sm">Nous vous contacterons bientôt.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom Complet *
                    </label>
                    <div className="relative">
                      <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eduka-blue focus:border-transparent transition-colors"
                        placeholder="Votre nom complet"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eduka-blue focus:border-transparent transition-colors"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <div className="relative">
                      <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eduka-blue focus:border-transparent transition-colors"
                        placeholder="+237 XXX XXX XXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                      Entreprise
                    </label>
                    <div className="relative">
                      <Building className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eduka-blue focus:border-transparent transition-colors"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Souhaité *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eduka-blue focus:border-transparent transition-colors"
                  >
                    <option value="">Sélectionnez un service</option>
                    {serviceOptions.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageCircle className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eduka-blue focus:border-transparent transition-colors resize-none"
                      placeholder="Décrivez votre projet ou vos besoins en détail..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-700 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div>
              <div className="mb-8">
                <div className="text-eduka-blue font-semibold mb-4 flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-eduka-blue" />
                  NOTRE LOCALISATION
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Trouvez-Nous à <span className="text-eduka-blue">Douala</span>
                </h2>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Notre bureau principal est situé au cœur de Douala, facilement accessible et équipé pour accueillir nos clients dans un environnement moderne et professionnel.
                </p>
              </div>

              {/* Placeholder Map */}
              <div className="bg-gray-200 rounded-xl h-64 mb-6 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Carte Interactive</p>
                  <p className="text-sm text-gray-400">Douala, Cameroun</p>
                </div>
              </div>

              {/* Why Contact Us */}
              <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Pourquoi Nous Contacter ?</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Consultation gratuite et personnalisée</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Réponse rapide dans les 24h</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Devis détaillé et transparent</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Équipe d'experts dédiés</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Suivez-Nous</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <a
                        key={index}
                        href={social.url}
                        className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-eduka-blue hover:text-white transition-colors"
                        aria-label={social.name}
                      >
                        <IconComponent className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="text-eduka-blue font-semibold mb-4 flex items-center justify-center gap-2">
              <div className="w-8 h-0.5 bg-eduka-blue" />
              QUESTIONS FRÉQUENTES
              <div className="w-8 h-0.5 bg-eduka-blue" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Réponses aux <span className="text-eduka-blue">Questions</span> Courantes
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Trouvez rapidement les réponses aux questions les plus fréquemment posées par nos clients.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Quels sont vos délais de livraison ?</h3>
                  <p className="text-gray-600 text-sm">Les délais varient selon la complexité du projet. En général, un site web prend 2-8 semaines, une application mobile 3-12 semaines.</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Proposez-vous un support après livraison ?</h3>
                  <p className="text-gray-600 text-sm">Oui, nous offrons 3 mois de support gratuit après livraison, puis des plans de maintenance mensuels.</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Comment se déroule le processus de paiement ?</h3>
                  <p className="text-gray-600 text-sm">Nous demandons 50% à la signature du contrat, 25% à mi-parcours et 25% à la livraison finale.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Travaillez-vous avec des clients internationaux ?</h3>
                  <p className="text-gray-600 text-sm">Absolument ! Nous servons des clients dans le monde entier avec des outils de collaboration modernes.</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Quelles technologies utilisez-vous ?</h3>
                  <p className="text-gray-600 text-sm">Nous utilisons les dernières technologies : React, Next.js, Node.js, Flutter, React Native, etc.</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Puis-je voir des exemples de vos réalisations ?</h3>
                  <p className="text-gray-600 text-sm">Bien sûr ! Contactez-nous pour voir notre portfolio complet et des études de cas détaillées.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-700 to-blue-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à Démarrer Votre Projet ?
          </h2>
          
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Ne laissez pas vos idées en attente. Contactez-nous aujourd'hui et transformons ensemble votre vision en réalité digitale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white text-eduka-blue hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold flex items-center justify-center gap-2 transition-colors">
              <Phone className="w-5 h-5" />
              +237 671 178 892
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">24h</div>
              <div className="text-blue-100 text-sm">Temps de Réponse</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">100+</div>
              <div className="text-blue-100 text-sm">Projets Réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">99%</div>
              <div className="text-blue-100 text-sm">Clients Satisfaits</div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
