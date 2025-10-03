'use client';
import { Phone, Mail, MapPin, Clock, Send, User, MessageCircle, Building, Globe, Facebook, Linkedin, Instagram, CheckCircle, ArrowRight } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"
import { useState } from "react"
import { motion } from "framer-motion"
import { serviceRequestsAPI } from "../firebaseService"

// Custom X (Twitter) Icon Component
const XIcon = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

// Contact information data
const contactInfo = [
  {
    icon: Phone,
    title: "Téléphone",
    details: ["+237 657765185", "+237 655571011"],
    description: "Appelez-nous à tout moment"
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@softfsgroup.com", "sidesfankam@gmail.com"],
    description: "Envoyez-nous un message"
  },
  {
    icon: MapPin,
    title: "Adresse",
    details: ["Logpom Basson, Douala - Cameroun"],
    description: "Venez nous rendre visite"
  },
  {
    icon: Clock,
    title: "Heures d'Ouverture",
    details: ["Lun - Ven: 8h - 17h", "Sam: 9h - 14h"],
    description: "Nos heures de bureau"
  }
]

// Social media links
const socialLinks = [
  { icon: Facebook, url: "https://www.facebook.com/softfsgroup", name: "Facebook" },
  { icon: XIcon, url: "https://x.com/soft_fs", name: "X" },
  { icon: Linkedin, url: "https://www.linkedin.com/company/soft-fs-group/", name: "LinkedIn" },
  { icon: Instagram, url: "https://www.instagram.com/softfs_group", name: "Instagram" },
  { icon: MessageCircle, url: "https://wa.me/237657765185", name: "WhatsApp" }
]

// Services for contact form
const serviceOptions = [
  "Conception et production graphique",
  "Photographie & Vidéographie", 
  "Sérigraphie & Impression Numérique",
  "Développement d'applications Web & Mobile",
  "Réseau Informatique & Support utilisateur",
  "Audit des Systèmes d'Information & Fourniture informatique",
  "Autre"
]

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const cardHover = {
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" }
  }
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
}

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
  const [error, setError] = useState(null)

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
    setError(null) // Clear any previous errors
    
    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim() || !formData.service || !formData.message.trim()) {
        throw new Error('Veuillez remplir tous les champs requis.')
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email.trim())) {
        throw new Error('Veuillez entrer une adresse email valide.')
      }

      // Prepare the data to be submitted
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        company: formData.company.trim() || null,
        service: formData.service,
        message: formData.message.trim(),
        source: 'contact_form' // To identify the source of the request
      }

      // Submit to database using Firebase Firestore
      const result = await serviceRequestsAPI.create(submissionData)
      
      console.log('Contact form submitted successfully:', result)
      
      // Show success message and reset form
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
      
    } catch (error) {
      console.error('Error submitting contact form:', error)
      
      // Set error message for user
      setError(error.message || 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer ou nous contacter directement.')
      
      // Clear error message after 8 seconds
      setTimeout(() => setError(null), 8000)
      
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 py-16 sm:py-20 lg:py-24 px-4 overflow-hidden">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/contact.jpg')`,
          }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        
        <div className="absolute inset-0 bg-black/60" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="text-white font-semibold text-xs sm:text-sm mb-4 flex items-center justify-center gap-2 flex-wrap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="w-4 sm:w-6 h-0.5 bg-white"
                initial={{ width: 0 }}
                animate={{ width: 16 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              CONTACTEZ-NOUS
              <motion.div 
                className="w-4 sm:w-6 h-0.5 bg-white"
                initial={{ width: 0 }}
                animate={{ width: 16 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>

            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Parlons de votre projet{" "}
              <span className="text-blue-200 block sm:inline">ensemble</span>
            </motion.h1>

            <motion.p 
              className="text-gray-200 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Prêt à transformer vos idées en réalité numérique ? Notre équipe d'experts est là pour vous aider à chaque étape de votre parcours technologique.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto px-4 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards - Mobile Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div 
              className="text-xl sm:text-2xl md:text-3xl text-blue-600 font-bold text-xs sm:text-sm mb-3 sm:mb-4 flex items-center justify-center gap-2 flex-wrap"
              variants={fadeInUp}
            >
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-blue-600"
                initial={{ width: 0 }}
                whileInView={{ width: 24 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              INFORMATIONS DE CONTACT
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-blue-600"
                initial={{ width: 0 }}
                whileInView={{ width: 24 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>

            <motion.h2 
              className="font-bold text-gray-800 mb-3 sm:mb-4 px-4"
              variants={fadeInUp}
            >
              Plusieurs façons de nous{" "}
              <span className="text-blue-600 block sm:inline">joindre</span>
            </motion.h2>

            <motion.p 
              className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4"
              variants={fadeInUp}
            >
              Choisissez le moyen de communication qui vous convient le mieux. Nous sommes disponibles et prêts à vous aider.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl border border-gray-100 group cursor-pointer min-h-[200px] sm:min-h-[220px] flex flex-col justify-between"
                  variants={fadeInUp}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex-1">
                    <motion.div 
                      className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -10, 10, -10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      <IconComponent className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                    </motion.div>
                    
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 text-center group-hover:text-blue-600 transition-colors duration-300">
                      {info.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-gray-500 text-center mb-3">
                      {info.description}
                    </p>

                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <div key={idx} className="text-gray-700 text-center text-xs sm:text-sm font-medium break-words">
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                    <motion.div 
                      className="w-8 sm:w-12 h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mx-auto"
                      initial={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Map Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
            {/* Contact Form */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.div className="mb-6 sm:mb-8" variants={fadeInLeft}>
                <motion.div 
                  className="text-blue-600 font-semibold text-xs sm:text-sm mb-3 sm:mb-4 flex items-center gap-2 flex-wrap"
                  variants={fadeInLeft}
                >
                  <motion.div 
                    className="w-6 sm:w-8 h-0.5 bg-blue-600"
                    initial={{ width: 0 }}
                    whileInView={{ width: 24 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  FORMULAIRE DE CONTACT
                </motion.div>

                <motion.h2 
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4"
                  variants={fadeInLeft}
                >
                  Démarrons Votre{" "}
                  <span className="text-blue-600 block sm:inline">Projet</span>
                </motion.h2>

                <motion.p 
                  className="text-gray-600 text-sm sm:text-base leading-relaxed"
                  variants={fadeInLeft}
                >
                  Remplissez le formulaire ci-dessous et nous vous contacterons dans les 24 heures pour discuter de vos besoins spécifiques.
                </motion.p>
              </motion.div>

              {/* Success Message - Mobile Responsive */}
              {isSubmitted && (
                <motion.div 
                  className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 flex items-start sm:items-center gap-3"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="flex-shrink-0 mt-0.5 sm:mt-0"
                  >
                    <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-800 text-sm sm:text-base">Message envoyé avec succès !</h4>
                    <p className="text-green-600 text-xs sm:text-sm">Nous vous contacterons bientôt.</p>
                  </div>
                </motion.div>
              )}

              {/* Error Message - Mobile Responsive */}
              {error && (
                <motion.div 
                  className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 flex items-start sm:items-center gap-3"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="flex-shrink-0 mt-0.5 sm:mt-0"
                  >
                    <svg className="w-5 sm:w-6 h-5 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-800 text-sm sm:text-base">Erreur d'envoi</h4>
                    <p className="text-red-600 text-xs sm:text-sm">{error}</p>
                  </div>
                </motion.div>
              )}

              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-4 sm:space-y-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeInUp}>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Nom Complet *
                    </label>
                    <div className="relative">
                      <User className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <motion.input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Votre nom complet"
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="votre@email.com"
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeInUp}>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <div className="relative">
                      <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <motion.input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="+237 XXX XXX XXX"
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label htmlFor="company" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Entreprise
                    </label>
                    <div className="relative">
                      <Building className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <motion.input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Nom de votre entreprise"
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="service" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Service Souhaité *
                  </label>
                  <motion.select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <option value="">Sélectionnez un service</option>
                    {serviceOptions.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </motion.select>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 top-3" />
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none min-h-[120px] sm:min-h-[140px]"
                      placeholder="Décrivez votre projet ou vos besoins en détail..."
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 sm:py-4 px-6 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 flex items-center justify-center gap-2 font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                      <span>Envoyer le Message</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.div className="mb-6 sm:mb-8" variants={fadeInRight}>
                <motion.div 
                  className="text-blue-600 font-semibold text-xs sm:text-sm mb-3 sm:mb-4 flex items-center gap-2 flex-wrap"
                  variants={fadeInRight}
                >
                  <motion.div 
                    className="w-6 sm:w-8 h-0.5 bg-blue-600"
                    initial={{ width: 0 }}
                    whileInView={{ width: 24 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  NOTRE LOCALISATION
                </motion.div>

                <motion.h2 
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4"
                  variants={fadeInRight}
                >
                  Trouvez-Nous à{" "}
                  <span className="text-blue-600 block sm:inline">Douala</span>
                </motion.h2>

                <motion.p 
                  className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6"
                  variants={fadeInRight}
                >
                  Notre bureau principal est situé au cœur de Douala, facilement accessible et équipé pour accueillir nos clients dans un environnement moderne et professionnel.
                </motion.p>
              </motion.div>

              {/* Why Contact Us - Mobile Responsive */}
              <motion.div 
                className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 sm:p-6 text-white"
                variants={scaleIn}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3 
                  className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Pourquoi Nous Contacter ?
                </motion.h3>
                <motion.div 
                  className="space-y-2 sm:space-y-3"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  {[
                    "Consultation gratuite et personnalisée",
                    "Réponse rapide dans les 24h", 
                    "Devis détaillé et transparent",
                    "Équipe d'experts dédiés"
                  ].map((text, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-2 sm:gap-3"
                      variants={fadeInLeft}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                      >
                        <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 mt-0.5" />
                      </motion.div>
                      <span className="text-xs sm:text-sm leading-relaxed">{text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Social Media - Mobile Responsive */}
              <motion.div 
                className="mt-6 sm:mt-8"
                variants={fadeInUp}
              >
                <motion.h3 
                  className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4"
                  variants={fadeInUp}
                >
                  Suivez-Nous
                </motion.h3>
                <motion.div 
                  className="flex gap-3 sm:gap-4 flex-wrap"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                        aria-label={social.name}
                        variants={scaleIn}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: [0, -10, 10, 0],
                          transition: { duration: 0.4 }
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconComponent className="w-4 sm:w-5 h-4 sm:h-5" />
                      </motion.a>
                    )
                  })}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Mobile Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div 
              className="text-blue-600 font-semibold text-xs sm:text-sm mb-3 sm:mb-4 flex items-center justify-center gap-2 flex-wrap"
              variants={fadeInUp}
            >
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-blue-600"
                initial={{ width: 0 }}
                whileInView={{ width: 24 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              QUESTIONS FRÉQUENTES
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-blue-600"
                initial={{ width: 0 }}
                whileInView={{ width: 24 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>

            <motion.h2 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 px-4"
              variants={fadeInUp}
            >
              Réponses aux{" "}
              <span className="text-blue-600 block sm:inline">Questions</span>{" "}
              Courantes
            </motion.h2>

            <motion.p 
              className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4"
              variants={fadeInUp}
            >
              Trouvez rapidement les réponses aux questions les plus fréquemment posées par nos clients.
            </motion.p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.div 
                className="space-y-4 sm:space-y-6"
                variants={staggerContainer}
              >
                {[
                  {
                    q: "Quels sont vos délais de livraison ?",
                    a: "Les délais varient selon la complexité du projet. En général, un site web prend 2-8 semaines, une application mobile 3-12 semaines."
                  },
                  {
                    q: "Proposez-vous un support après livraison ?",
                    a: "Oui, nous offrons 3 mois de support gratuit après livraison, puis des plans de maintenance mensuels."
                  },
                  {
                    q: "Comment se déroule le processus de paiement ?",
                    a: "Nous demandons 50% à la signature du contrat, 25% à mi-parcours et 25% à la livraison finale."
                  }
                ].map((faq, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg"
                    variants={fadeInLeft}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h3 
                      className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 leading-tight"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {faq.q}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 text-xs sm:text-sm leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      {faq.a}
                    </motion.p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="space-y-4 sm:space-y-6"
                variants={staggerContainer}
              >
                {[
                  {
                    q: "Travaillez-vous avec des clients internationaux ?",
                    a: "Absolument ! Nous servons des clients dans le monde entier avec des outils de collaboration modernes."
                  },
                  {
                    q: "Quelles technologies utilisez-vous ?",
                    a: "Nous utilisons les dernières technologies : React, Next.js, Node.js, Flutter, React Native, etc."
                  },
                  {
                    q: "Puis-je voir des exemples de vos réalisations ?",
                    a: "Bien sûr ! Contactez-nous pour voir notre portfolio complet et des études de cas détaillées."
                  }
                ].map((faq, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg"
                    variants={fadeInRight}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h3 
                      className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 leading-tight"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {faq.q}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 text-xs sm:text-sm leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      {faq.a}
                    </motion.p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700 overflow-hidden">
        <div className="container mx-auto text-center">
          <motion.h2 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Prêt à Démarrer Votre Projet ?
          </motion.h2>
          
          <motion.p 
            className="text-blue-100 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ne laissez pas vos idées en attente. Contactez-nous aujourd'hui et transformons ensemble votre vision en réalité digitale.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.a 
              href="tel:+237657765185"
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Phone className="w-4 sm:w-5 h-4 sm:h-5" />
              </motion.div>
              <span className="hidden sm:inline">+237 657765185</span>
              <span className="sm:hidden">Appelez-nous</span>
            </motion.a>
          </motion.div>

          <motion.div 
            className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {[
              { number: "24h", label: "Temps de Réponse" },
              { number: "20+", label: "Projets Réalisés" },
              { number: "99%", label: "Clients Satisfaits" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <motion.div 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.2 + 0.6, 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {stat.number}
                </motion.div>
                <motion.div 
                  className="text-blue-100 text-xs sm:text-sm leading-tight"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.8 }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
