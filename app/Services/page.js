'use client';
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef } from "react"
import {CheckCircle, Users, Clock, Star, Code, Palette, Smartphone, Globe, Database, Shield, Zap, Settings, ArrowRight, Phone, Mail, X} from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

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

// Detailed services data with comprehensive information for all services
const servicesData = [
  {
    id: 1,
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
  },
  {
    id: 2,
    image: "/images/photographie.jpg",
    title: "Photographie & Vidéographie",
    subtitle: "Création de Contenu Visuel Premium",
    rating: 5,
    clients: 35,
    duration: "Flexible",
    shortDescription: "Services professionnels de photographie et vidéographie pour tous vos événements et projets",
    fullDescription: "Notre équipe de photographes et vidéographes professionnels capture vos moments les plus précieux avec une expertise technique et artistique exceptionnelle. Des événements corporatifs aux productions commerciales, nous créons du contenu visuel qui raconte votre histoire de manière captivante.",
    features: [
      "Photographie d'événements professionnels",
      "Sessions photo portrait et corporate",
      "Photographie de produits e-commerce",
      "Vidéographie événementielle HD/4K",
      "Production de clips promotionnels",
      "Couverture photo/vidéo mariage",
      "Photographie architecturale",
      "Vidéos corporatives et institutionnelles",
      "Post-production et retouche professionnelle",
      "Streaming en direct d'événements",
      "Photographie aérienne par drone",
      "Galeries en ligne sécurisées"
    ],
    technologies: ["Canon EOS R5", "Sony FX3", "DJI Mavic Pro", "Adobe Lightroom", "Adobe Premiere Pro", "DaVinci Resolve"],
    icon: Database,
    color: "from-pink-500 to-purple-600",
    price: "À partir de 25,000FCFA",
    timeline: "1-7 jours"
  },
  {
    id: 3,
    image: "/images/serigraphie.jpg",
    title: "Serigraphie & Impression Numérique",
    subtitle: "Solutions d'Impression Professionnelle",
    rating: 5,
    clients: 25,
    duration: "Selon projet",
    shortDescription: "Services d'impression haute qualité pour tous vos besoins marketing et promotionnels",
    fullDescription: "Notre service de sérigraphie et d'impression numérique offre des solutions complètes pour tous vos besoins d'impression commerciale. De la conception à la production, nous garantissons une qualité exceptionnelle pour vos supports de communication, produits promotionnels et matériels marketing.",
    features: [
      "Sérigraphie haute qualité sur textile",
      "Impression numérique grand format",
      "Cartes de visite et papeterie d'entreprise",
      "Banderoles et signalétique extérieure",
      "Objets promotionnels personnalisés",
      "Catalogues et brochures professionnels",
      "Stickers et étiquettes adhésives",
      "Impression sur supports rigides",
      "Finitions de luxe (dorure, gaufrage)",
      "Emballages personnalisés",
      "Supports textiles événementiels",
      "Certification qualité ISO"
    ],
    technologies: ["Sérigraphie", "Impression Offset", "Impression Numérique", "Sublimation", "Flexographie", "Adobe Creative Suite"],
    icon: Globe,
    color: "from-orange-500 to-red-500",
    price: "À partir de 5,000FCFA",
    timeline: "1-5 jours"
  },
  {
    id: 4,
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
    id: 5,
    image: "/images/reseau.jpg",
    title: "Réseau Informatique & Support Utilisateur",
    subtitle: "Infrastructure IT & Support Technique",
    rating: 5,
    clients: 40,
    duration: "Support continu",
    shortDescription: "Solutions complètes de réseau informatique et support technique professionnel",
    fullDescription: "Nous offrons des services complets d'infrastructure informatique incluant la conception, l'installation et la maintenance de réseaux d'entreprise. Notre équipe de support technique assure un service client de qualité supérieure pour garantir le bon fonctionnement de vos systèmes informatiques.",
    features: [
      "Conception et installation de réseaux LAN/WAN",
      "Configuration de serveurs d'entreprise",
      "Mise en place de systèmes de sécurité réseau",
      "Support technique 24/7",
      "Maintenance préventive des équipements",
      "Sauvegarde et récupération de données",
      "Formation utilisateurs sur logiciels",
      "Gestion des comptes et permissions",
      "Monitoring réseau en temps réel",
      "Virtualisation de serveurs",
      "Solutions de télétravail sécurisé",
      "Audit de sécurité informatique"
    ],
    technologies: ["Windows Server", "Linux", "Cisco", "VMware", "Active Directory", "VPN", "Firewall", "RAID"],
    icon: Shield,
    color: "from-green-500 to-blue-600",
    price: "À partir de 75,000FCFA",
    timeline: "Support permanent"
  },
  {
    id: 6,
    image: "/images/programmer.jpg",
    title: "Audit des Systèmes d'Information & Fourniture Informatique",
    subtitle: "Optimisation IT & Solutions Matérielles",
    rating: 5,
    clients: 20,
    duration: "Selon évaluation",
    shortDescription: "Audits complets SI et fourniture d'équipements informatiques professionnels",
    fullDescription: "Nos experts en systèmes d'information réalisent des audits complets pour optimiser vos infrastructures IT. Nous proposons également des solutions de fourniture d'équipements informatiques adaptées à vos besoins spécifiques, garantissant performance et compatibilité.",
    features: [
      "Audit complet des systèmes d'information",
      "Évaluation de la sécurité informatique",
      "Analyse de performance des réseaux",
      "Recommandations d'optimisation",
      "Fourniture d'ordinateurs et serveurs",
      "Équipements réseau professionnels",
      "Logiciels et licences d'entreprise",
      "Installation et configuration matériel",
      "Garantie et service après-vente",
      "Formation technique du personnel",
      "Documentation technique complète",
      "Support migration de données"
    ],
    technologies: ["Network Analysis", "Security Assessment", "HP Enterprise", "Dell EMC", "Microsoft Licensing", "Cisco Equipment"],
    icon: Settings,
    color: "from-blue-600 to-indigo-700",
    price: "Devis personnalisé",
    timeline: "2-8 semaines"
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
            backgroundImage: `url('/images/services.jpg')`,
          }}
        />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute inset-0 bg-black/60" 
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
                technologiques
              </motion.span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              complètes pour votre entreprise
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
                <span>Obtenez un devis</span>
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
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <motion.div 
                initial={{ width: 0 }}
                animate={servicesInView ? { width: 24 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-0.5 bg-eduka-blue hidden sm:block" 
              />
              TOUS NOS SERVICES
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
              Tous nos <motion.span 
                initial={{ opacity: 0 }}
                animate={servicesInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-eduka-blue"
              >
                services
              </motion.span> détaillés
            </motion.h2>

            <motion.p 
              variants={fadeInUp}
              className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed"
            >
              Découvrez l'ensemble complet de nos solutions technologiques, chacune conçue avec expertise pour 
              répondre aux besoins spécifiques de votre entreprise et vous accompagner dans votre transformation numérique.
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
                      className="relative lg:h-full"
                    >
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        className="rounded-lg sm:rounded-2xl shadow-2xl w-full h-[320px] sm:h-[320px] lg:h-full object-cover object-center"
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
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-2"
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
              className="font-bold text-gray-800 mb-4"
            >
              Comment nous <motion.span 
                initial={{ opacity: 0 }}
                animate={processInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-eduka-blue"
              >
                travaillons
              </motion.span> avec vous
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
                backgroundColor: "rgba(255,255,255,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/Contact')}
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
    </div>
  )
}