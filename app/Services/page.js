'use client';
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef } from "react"
import {CheckCircle, Users, Clock, Star, Code, Palette, Smartphone, Globe, Database, Shield, Zap, Settings, ArrowRight, Phone, Mail, X} from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"
import ServiceForm from "../components/ServiceForm"

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8 }
  }
}

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
}

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

// Detailed services data with comprehensive information
const servicesData = [
  {
    id: 1,
    image: "/images/developpement.jpg",
    title: "Développement d'applications Web & Mobile",
    subtitle: "Solutions Digitales Complètes",
    rating: 5,
    clients: 45,
    duration: "À votre rythme",
    shortDescription: "Applications web et mobiles personnalisées construites avec des technologies modernes",
    fullDescription: "Nous créons des solutions digitales complètes incluant des applications web puissantes et des applications mobiles hautes performances. Notre expertise couvre le développement full-stack web avec React, Next.js, Node.js, ainsi que le développement d'applications mobiles natives et multiplateformes pour iOS et Android.",
    features: [
      "Conception web responsive pour tous les appareils",
      "Frameworks JavaScript modernes (React, Vue, Angular)",
      "Développement d'applications mobiles natives (iOS/Android)",
      "Développement multiplateforme (React Native/Flutter)",
      "Développement d'API backend avec Node.js/Python",
      "Conception et optimisation de bases de données",
      "Déploiement et hébergement cloud",
      "Optimisation SEO et amélioration des performances",
      "Développement d'applications web progressives (PWA)",
      "Notifications push et fonctionnalités temps réel",
      "Soumission et optimisation App Store",
      "Intégration e-commerce et paiement"
    ],
    technologies: ["React", "Next.js", "React Native", "Flutter", "Node.js", "MongoDB", "Firebase", "Swift", "Kotlin", "AWS", "Docker"],
    icon: Code,
    color: "from-blue-500 to-green-600",
    price: "À partir de 50,000FCFA",
    timeline: "2-12 semaines"
  },
  {
    id: 2,
    image: "/images/graphisme.jpg",
    title: "Conception et Production Graphique",
    subtitle: "Solutions Visuelles Créatives",
    rating: 5,
    clients: 30,
    duration: "Quand vous voulez",
    shortDescription: "Designs visuels époustouflants qui captivent et convertissent",
    fullDescription: "Notre équipe créative offre des solutions de design graphique exceptionnelles qui renforcent votre identité de marque et engagent votre audience. Des logos aux supports marketing, nous créons des visuels qui racontent votre histoire efficacement.",
    features: [
      "Conception de logo et identité de marque",
      "Supports marketing (brochures, flyers, bannières)",
      "Design UI/UX web et mobile",
      "Graphiques et modèles pour réseaux sociaux",
      "Design d'impression et emballage",
      "Infographies et visualisation de données",
      "Guides de marque et chartes graphiques",
      "Retouche et édition photo"
    ],
    technologies: ["Adobe Creative Suite", "Figma", "Sketch", "Canva Pro", "Illustrator", "Photoshop"],
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    price: "15000FCFA",
    timeline: "1-3 semaines"
  }
]

// Additional services that complement the main three
const additionalServices = [
  {
    icon: Globe,
    title: "Serigraphie & Impression Numérique",
    description: "Haute qualité d'impression pour tous vos besoins marketing et promotionnels."
  },
  {
    icon: Database,
    title: "Photographie & Vidéographie",
    description: "Capturez vos moments précieux avec notre service professionnel de photographie et vidéographie."
  },
  {
    icon: Shield,
    title: "Reseau informatique & Support utilisateur",
    description: "Audits de sécurité complets et mise en œuvre de mesures de sécurité robustes pour vos systèmes."
  },
  {
    icon: Settings,
    title: "Audit des Systèmes d'Information & Fourniture informatiques",
    description: "Intégration transparente de différents systèmes logiciels et API tierces pour un flux de travail optimal."
  }
]

// Process steps for how we work
const processSteps = [
  {
    number: "01",
    title: "Découverte et Planification",
    description: "Nous analysons vos exigences et créons une feuille de route détaillée du projet avec des jalons clairs."
  },
  {
    number: "02", 
    title: "Design et Prototypage",
    description: "Notre équipe de design crée des wireframes et prototypes pour votre approbation avant le développement."
  },
  {
    number: "03",
    title: "Développement et Tests",
    description: "Nous construisons votre solution en utilisant la méthodologie agile avec des tests réguliers et l'assurance qualité."
  },
  {
    number: "04",
    title: "Déploiement et Support",
    description: "Nous déployons votre solution et fournissons une maintenance continue et un support technique."
  }
]

// Custom hook for scroll animations
function useScrollAnimation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return [ref, isInView]
}

export default function ServicesPage() {
  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false)
  const router = useRouter()
  
  // Animation refs
  const [heroRef, heroInView] = useScrollAnimation()
  const [servicesRef, servicesInView] = useScrollAnimation()
  const [additionalRef, additionalInView] = useScrollAnimation()
  const [processRef, processInView] = useScrollAnimation()
  const [ctaRef, ctaInView] = useScrollAnimation()

  const openServiceForm = () => {
    setIsServiceFormOpen(true)
  }

  const closeServiceForm = () => {
    setIsServiceFormOpen(false)
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section - Mobile Optimized */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        className="relative bg-gradient-to-r from-black-900/70 to-black-700/70 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden min-h-[60vh] sm:min-h-[70vh] flex items-center"
      >
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/web-development.jpg')`,
          }}
        />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute inset-0 bg-blue-900/80" 
        />

        <div className="container mx-auto relative z-10 w-full">
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div 
              variants={fadeInUp}
              className="text-white font-semibold mb-4 sm:mb-6 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 24 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-0.5 bg-white hidden sm:block" 
              />
              NOS SERVICES
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 24 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="h-0.5 bg-white hidden sm:block" 
              />
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2"
            >
              Solutions <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-eduka-blue"
              >
                Technologiques
              </motion.span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Complètes pour Votre Entreprise
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-gray-200 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-2"
            >
              Du développement web aux applications mobiles et au design créatif, nous livrons des solutions innovantes 
              qui stimulent la croissance et transforment votre présence numérique.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 max-w-lg sm:max-w-none mx-auto"
            >
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-eduka-blue text-white hover:bg-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg flex items-center justify-center gap-2 transition-colors shadow-lg font-semibold w-full sm:w-auto"
              >
                <span>Obtenez un Devis</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Services Section */}
      <motion.section 
        ref={servicesRef}
        initial="hidden"
        animate={servicesInView ? "visible" : "hidden"}
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gray-50"
      >
        <div className="container mx-auto">
          {/* Header */}
          <motion.div 
            variants={staggerChildren}
            className="text-center mb-12 sm:mb-16 px-2"
          >
            <motion.div 
              variants={fadeInUp}
              className="text-eduka-blue font-semibold mb-4 sm:mb-6 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <motion.div 
                initial={{ width: 0 }}
                animate={servicesInView ? { width: 24 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-0.5 bg-eduka-blue hidden sm:block" 
              />
              SERVICES PRINCIPAUX
              <motion.div 
                initial={{ width: 0 }}
                animate={servicesInView ? { width: 24 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-0.5 bg-eduka-blue hidden sm:block" 
              />
            </motion.div>

            <motion.h2 
              variants={fadeInUp}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6"
            >
              Nos Services <motion.span 
                initial={{ opacity: 0 }}
                animate={servicesInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-eduka-blue"
              >
                Essentiels
              </motion.span>
            </motion.h2>

            <motion.p 
              variants={fadeInUp}
              className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed"
            >
              Nous nous spécialisons dans trois domaines principaux de solutions technologiques, chacun conçu pour 
              aider votre entreprise à prospérer dans le paysage numérique.
            </motion.p>
          </motion.div>

          {/* Detailed Services */}
          <motion.div 
            variants={staggerChildren}
            className="space-y-16 sm:space-y-20 lg:space-y-24"
          >
            {servicesData.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={service.id}
                  variants={index % 2 === 0 ? slideInLeft : slideInRight}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Content */}
                  <motion.div 
                    variants={staggerChildren}
                    className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} px-4 sm:px-0`}
                  >
                    <motion.div 
                      variants={fadeInUp}
                      className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
                    >
                      <motion.div 
                        variants={scaleIn}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                      >
                        <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="min-w-0">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">{service.title}</h3>
                        <p className="text-eduka-blue font-semibold text-sm sm:text-base mt-1">{service.subtitle}</p>
                      </motion.div>
                    </motion.div>

                    <motion.p 
                      variants={fadeInUp}
                      className="text-gray-600 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed"
                    >
                      {service.fullDescription}
                    </motion.p>

                    {/* Key Features */}
                    <motion.div 
                      variants={fadeInUp}
                      className="mb-6 sm:mb-8"
                    >
                      <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Caractéristiques Clés:</h4>
                      <motion.div 
                        variants={staggerChildren}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
                      >
                        {service.features.slice(0, 6).map((feature, idx) => (
                          <motion.div 
                            key={idx}
                            variants={fadeIn}
                            whileHover={{ x: 5 }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 text-xs sm:text-sm leading-relaxed">{feature}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>

                    {/* Technologies */}
                    <motion.div 
                      variants={fadeInUp}
                      className="mb-6 sm:mb-8"
                    >
                      <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Technologies que Nous Utilisons:</h4>
                      <motion.div 
                        variants={staggerChildren}
                        className="flex flex-wrap gap-2"
                      >
                        {service.technologies.map((tech, idx) => (
                          <motion.span
                            key={idx}
                            variants={scaleIn}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="bg-white border border-gray-200 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium hover:border-eduka-blue hover:text-eduka-blue transition-colors cursor-pointer"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>

                    {/* Stats and CTA */}
                    <motion.div 
                      variants={fadeInUp}
                      className="bg-white rounded-lg p-4 sm:p-6 shadow-md border border-gray-100"
                    >
                      <motion.div 
                        variants={staggerChildren}
                        className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4 sm:mb-6"
                      >
                        <motion.div 
                          variants={fadeInUp}
                          whileHover={{ y: -5 }}
                          className="text-center"
                        >
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="text-xl sm:text-2xl font-bold text-eduka-blue"
                          >
                            {service.rating}.0
                          </motion.div>
                          <div className="text-xs sm:text-sm text-gray-600">Note</div>
                        </motion.div>
                        <motion.div 
                          variants={fadeInUp}
                          whileHover={{ y: -5 }}
                          className="text-center"
                        >
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
                            className="text-xl sm:text-2xl font-bold text-eduka-blue"
                          >
                            {service.clients}+
                          </motion.div>
                          <div className="text-xs sm:text-sm text-gray-600">Clients</div>
                        </motion.div>
                        <motion.div 
                          variants={fadeInUp}
                          whileHover={{ y: -5 }}
                          className="text-center"
                        >
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                            className="text-xl sm:text-2xl font-bold text-eduka-blue"
                          >
                            {service.timeline}
                          </motion.div>
                          <div className="text-xs sm:text-sm text-gray-600">Délai</div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Image */}
                  <motion.div 
                    variants={index % 2 === 0 ? slideInRight : slideInLeft}
                    className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} px-4 sm:px-0`}
                  >
                    <motion.div 
                      whileHover={{ y: -10 }}
                      className="relative"
                    >
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        src={service.image}
                        alt={service.title}
                        className="rounded-lg sm:rounded-2xl shadow-2xl w-full h-[550px] sm:h-[350px] lg:h-[400px]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg sm:rounded-2xl" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Additional Services */}
      <motion.section 
        ref={additionalRef}
        initial="hidden"
        animate={additionalInView ? "visible" : "hidden"}
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white"
      >
        <div className="container mx-auto">
          <motion.div 
            variants={staggerChildren}
            className="text-center mb-12 sm:mb-16 px-2"
          >
            <motion.div 
              variants={fadeInUp}
              className="text-eduka-blue font-semibold mb-4 sm:mb-6 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <motion.div 
                initial={{ width: 0 }}
                animate={additionalInView ? { width: 24 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-0.5 bg-eduka-blue hidden sm:block" 
              />
              SERVICES ADDITIONNELS
              <motion.div 
                initial={{ width: 0 }}
                animate={additionalInView ? { width: 24 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-0.5 bg-eduka-blue hidden sm:block" 
              />
            </motion.div>

            <motion.h2 
              variants={fadeInUp}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6"
            >
              Plus de Façons de Nous <motion.span 
                initial={{ opacity: 0 }}
                animate={additionalInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-eduka-blue"
              >
                Aider
              </motion.span>
            </motion.h2>

            <motion.p 
              variants={fadeInUp}
              className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed"
            >
              Au-delà de nos services principaux, nous offrons des solutions supplémentaires pour soutenir 
              votre parcours complet de transformation numérique.
            </motion.p>
          </motion.div>

          <motion.div 
            variants={staggerChildren}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-0"
          >
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="bg-gray-50 rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group border border-gray-100"
                >
                  <motion.div 
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 10,
                      transition: { duration: 0.3 }
                    }}
                    className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-eduka-blue to-blue-700 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg"
                  >
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center group-hover:text-eduka-blue transition-colors duration-300 leading-tight"
                  >
                    {service.title}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    className="text-gray-600 text-center leading-relaxed text-sm sm:text-base"
                  >
                    {service.description}
                  </motion.p>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileHover={{ width: 48 }}
                      className="h-1 bg-gradient-to-r from-eduka-blue to-blue-700 rounded-full mx-auto transition-all duration-300"
                    />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Our Process */}
      <motion.section 
        ref={processRef}
        initial="hidden"
        animate={processInView ? "visible" : "hidden"}
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gray-50"
      >
        <div className="container mx-auto">
          <motion.div 
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.div 
              variants={fadeInUp}
              className="text-eduka-blue font-semibold mb-4 flex items-center justify-center gap-2"
            >
              <motion.div 
                initial={{ width: 0 }}
                animate={processInView ? { width: 32 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-0.5 bg-eduka-blue" 
              />
              NOTRE PROCESSUS
              <motion.div 
                initial={{ width: 0 }}
                animate={processInView ? { width: 32 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-0.5 bg-eduka-blue" 
              />
            </motion.div>

            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold text-gray-800 mb-4"
            >
              Comment Nous <motion.span 
                initial={{ opacity: 0 }}
                animate={processInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-eduka-blue"
              >
                Travaillons
              </motion.span> Avec Vous
            </motion.h2>

            <motion.p 
              variants={fadeInUp}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Notre méthodologie éprouvée assure une livraison de projet réussie de 
              la consultation initiale au déploiement final et au-delà.
            </motion.p>
          </motion.div>

          <motion.div 
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {processSteps.map((step, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="text-center relative"
              >
                {/* Connection line */}
                {index < processSteps.length - 1 && (
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={processInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                    className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2 z-0 origin-left" 
                  />
                )}
                
                <motion.div 
                  variants={fadeInUp}
                  className="relative z-10"
                >
                  <motion.div 
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)",
                      transition: { duration: 0.2 }
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 200 
                    }}
                    className="w-16 h-16 bg-gradient-to-r from-eduka-blue to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg cursor-pointer"
                  >
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </motion.div>
                  
                  <motion.h3 
                    variants={fadeInUp}
                    className="text-xl font-bold text-gray-800 mb-4"
                  >
                    {step.title}
                  </motion.h3>
                  
                  <motion.p 
                    variants={fadeInUp}
                    className="text-gray-600 leading-relaxed"
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-400 to-blue-700"
      >
        <div className="container mx-auto text-center">
          <motion.h2 
            variants={fadeInUp}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 px-2"
          >
            Prêt à Démarrer Votre Projet ?
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-blue-100 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-3xl mx-auto px-2 leading-relaxed"
          >
            Discutons de vos exigences et créons une solution qui fait avancer votre entreprise. 
            Obtenez une consultation gratuite et un devis de projet aujourd'hui.
          </motion.p>

          <motion.div 
            variants={staggerChildren}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 max-w-lg sm:max-w-none mx-auto"
          >
            <motion.button
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/Contact')}
              className="bg-white text-eduka-blue hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              Appelez-Nous
            </motion.button>
            <motion.button
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                backgroundColor: "rgba(255,255,255,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={openServiceForm}
              className="border-2 border-white text-white hover:bg-white hover:text-eduka-blue px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg w-full sm:w-auto"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              Envoyer un Message
            </motion.button>
          </motion.div>

          <motion.div 
            variants={staggerChildren}
            className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-2"
          >
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={ctaInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-2xl sm:text-3xl font-bold text-white mb-2"
              >
                24/7
              </motion.div>
              <div className="text-blue-100 text-sm sm:text-base">Support Disponible</div>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={ctaInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-2xl sm:text-3xl font-bold text-white mb-2"
              >
                100%
              </motion.div>
              <div className="text-blue-100 text-sm sm:text-base">Satisfaction Client</div>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={ctaInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-2xl sm:text-3xl font-bold text-white mb-2"
              >
                48h
              </motion.div>
              <div className="text-blue-100 text-sm sm:text-base">Temps de Réponse</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      <Footer />

      {/* Service Form Modal */}
      <AnimatePresence>
        {isServiceFormOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
            onClick={closeServiceForm}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-xs sm:max-w-2xl lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeServiceForm}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors group"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-gray-800" />
              </motion.button>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <ServiceForm onClose={closeServiceForm} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
