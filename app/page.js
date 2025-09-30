'use client';
import {Play, GraduationCap, Users, BookOpen, DollarSign, CheckCircle, Phone, Trophy, Star, Clock, Cloud, Cpu, Smartphone, Settings, Shield, Zap, Heart, Award, Github, Linkedin, Twitter, ChevronLeft, ChevronRight} from "lucide-react"
import Header from "./components/header"
import Footer from "./components/footer"
import { useState, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    number: "01",
    icon: Cloud,
    title: "Nos Services",
    description: "Naviguez sur le site et consultez les services que nous offrons",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Sélectionner un Service",
    description: "Choisissez le service qui correspond à vos besoins",
  },
  {
    number: "03",
    icon: Smartphone,
    title: "Postuler pour un Service",
    description: "Postulez facilement en ligne pour le service dont vous avez besoin",
  },
  {
    number: "04",
    icon: Settings,
    title: "Nous Contacter",
    description: "N'hésitez pas à nous contacter en cas de problème",
  },
]

const stats = [
  {
    icon: Trophy,
    number: "200",
    label: "Projets Livrés",
    suffix: "+",
  },
  {
    icon: Users,
    number: "150",
    label: "Clients Satisfaits",
    suffix: "+",
  },
  {
    icon: Settings,
    number: "50",
    label: "Stack Technologique",
    suffix: "+",
  },
  {
    icon: Star,
    number: "10",
    label: "Années d'Expérience",
    suffix: "+",
  },
]

const services = [
  {
    image: "/images/web-development.jpg",
    title: "Développement Web",
    rating: 5,
    clients: 25,
    duration: "À votre rythme",
  },
  {
    image: "/images/graphic-design.jpg",
    title: "Design Graphique",
    clients: 30,
    duration: "Quand vous voulez",
  },
  {
    image: "/images/mobile-development.jpg",
    title: "Développement d'Applications Mobiles",
    rating: 5,
    clients: 20,
    duration: "À votre rythme",
  },
]

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Ingénieure Logiciel Principal",
    image: "/images/design.jpg",
    description: "Développeuse full-stack avec plus de 8 ans d'expérience en React, Node.js et architecture cloud.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Michael Chen",
    role: "Architecte DevOps",
    image: "/images/programmer.jpg",
    description: "Spécialiste en infrastructure cloud axé sur les solutions évolutives et les pipelines de déploiement automatisés.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Emily Rodriguez",
    role: "Designer UI/UX",
    image: "/images/worker.jpg",
    description: "Designer créative passionnée par le design centré sur l'utilisateur et la création d'expériences numériques intuitives.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "David Kim",
    role: "Ingénieur IA/ML",
    image: "/images/design.jpg",
    description: "Expert en apprentissage automatique spécialisé dans l'analyse de données et les solutions d'automatisation intelligente.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#"
    }
  }
]

const whyChooseUs = [
  {
    icon: Shield,
    title: "Expertise Prouvée",
    description: "Plus de 10 ans d'expérience dans la livraison de solutions technologiques de pointe dans diverses industries avec un taux de satisfaction client de 99%."
  },
  {
    icon: Zap,
    title: "Livraison Rapide",
    description: "La méthodologie de développement agile garantit un déploiement rapide sans compromettre les normes de qualité ou de sécurité."
  },
  {
    icon: Heart,
    title: "Centré sur le Client",
    description: "Nous priorisons vos objectifs commerciaux et fournissons des solutions personnalisées qui génèrent des résultats mesurables."
  },
  {
    icon: Award,
    title: "Primé",
    description: "Leader de l'industrie reconnu avec de nombreux prix pour l'innovation, la qualité et l'excellence du service client."
  }
]

// Slideshow images for hero section
const heroImages = [
  {
    url: "/images/web-development.jpg",
    alt: "Web Development Solutions"
  },
  {
    url: "/images/mobile-development.jpg", 
    alt: "Mobile App Development"
  },
  {
    url: "/images/graphic-design.jpg",
    alt: "Creative Design Services"
  }
]

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const slideIn = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <section ref={heroRef} className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-12 sm:py-16 md:py-20 lg:py-24 px-4 overflow-hidden pb-20 sm:pb-28 md:pb-32">
        {/* Slideshow Background with parallax */}
        <motion.div className="absolute inset-0 overflow-hidden" style={{ y }}>
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ scale: 1.1 }}
              animate={{ 
                scale: index === currentSlide ? 1 : 1.1,
                opacity: index === currentSlide ? 1 : 0 
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${image.url}')`,
              }}
            />
          ))}
        </motion.div>
        
        <div className="absolute inset-0 bg-blue-900/70" />

        {/* Slideshow Navigation - Hidden on small screens */}
        <motion.div 
          className="absolute inset-0 items-center justify-between px-2 sm:px-4 z-10 hidden sm:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.button
            onClick={prevSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors touch-manipulation"
            aria-label="Previous slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors touch-manipulation"
            aria-label="Next slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        </motion.div>

        {/* Slideshow Dots */}
        <motion.div 
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors touch-manipulation ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </motion.div>

       <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center sm:text-left">
          <motion.div 
            className="text-white font-semibold mb-3 sm:mb-4 flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div 
              className="w-6 h-0.5 sm:w-8 bg-white"
              initial={{ width: 0 }}
              animate={{ width: 24 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            />
            BIENVENUE CHEZ SOFT FS !
          </motion.div>

          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Construisez Votre
            <br />
            <motion.span 
              className="text-eduka-blue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Avenir
            </motion.span> Numérique
          </motion.h1>

          <motion.p 
            className="text-gray-200 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto sm:mx-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Transformez votre entreprise avec des solutions technologiques de pointe. Nous proposons un développement logiciel innovant, 
            des services cloud et des stratégies de transformation numérique qui favorisent la croissance et l'efficacité.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.button 
              className="border border-white text-white hover:bg-white hover:text-gray-800 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base sm:text-lg flex items-center justify-center gap-2 bg-transparent transition-colors touch-manipulation"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Nos Services
            </motion.button>
            <motion.button 
              className="border border-white text-white hover:bg-white hover:text-gray-800 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base sm:text-lg flex items-center justify-center gap-2 bg-transparent transition-colors touch-manipulation"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Nous Contacter
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
      
      {/*Features Section - Overlapping Cards*/}
      <motion.section 
        className="relative -mt-8 sm:-mt-12 md:-mt-16 z-20 px-4"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto">
          <div className="w-full max-w-6xl mx-auto">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <motion.div 
                    key={index} 
                    className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-5 md:p-6 group border border-gray-100 backdrop-blur-sm touch-manipulation"
                    variants={{
                      initial: { opacity: 0, y: 50, scale: 0.9 },
                      animate: { opacity: 1, y: 0, scale: 1 }
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                  <div className="relative mb-4">
                    <div 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md"
                      style={{
                        background: 'linear-gradient(to bottom right, #A5A6C8, #A5A6C8)'
                      }}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div 
                      className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg"
                      style={{
                        background: 'linear-gradient(to right, #3B4D8F, #3B4D8F)'
                      }}
                    >
                      {feature.number}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-2 transition-colors duration-300 leading-tight" style={{ '--hover-color': '#A5A6C8' }} onMouseEnter={(e) => e.target.style.color = '#A5A6C8'} onMouseLeave={(e) => e.target.style.color = ''}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Decorative bottom border */}
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                    <div 
                      className="w-8 sm:w-12 h-0.5 sm:h-1 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(to right, #3B4D8F, #A5A6C8)'
                      }}
                    ></div>
                  </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Spacer section to maintain layout */}
      <section className="py-4 sm:py-6 md:py-8 lg:py-16 bg-gray-50"></section>
      {/*About Section*/}
      <motion.section 
        className="py-12 sm:py-16 md:py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Images */}
            <motion.div 
              className="relative order-2 lg:order-1"
              variants={fadeInLeft}
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-3 sm:space-y-4">
                  <motion.img
                    src="/images/design.jpg"
                    alt="Designing"
                    className="rounded-lg w-full h-32 sm:h-40 md:h-48 object-cover"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  />
                  <motion.img
                    src="/images/worker.jpg"
                    alt="Working"
                    className="rounded-lg w-full h-24 sm:h-28 md:h-36 object-cover"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
                <div className="pt-4 sm:pt-6 md:pt-8">
                  <motion.img
                    src="/images/programmer.jpg"
                    alt="Programming"
                    className="rounded-lg w-full h-48 sm:h-56 md:h-72 object-cover"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
              </div>

              {/* Floating Stats Card */}
              <motion.div 
                className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-eduka-blue text-white p-3 sm:p-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <div className="text-center">
                  <motion.div 
                    className="text-xl sm:text-2xl font-bold"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                  >
                    10+
                  </motion.div>
                  <div className="text-xs sm:text-sm">Années d'Excellence</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div variants={fadeInRight} className="order-1 lg:order-2">
              <motion.div 
                className="text-eduka-blue font-semibold mb-3 sm:mb-4 flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="w-6 sm:w-8 h-0.5 bg-eduka-blue"
                  initial={{ width: 0 }}
                  whileInView={{ width: 24 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                À PROPOS DE NOUS
              </motion.div>

              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 text-center lg:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Nos Solutions Technologiques
                <br />
                <motion.span 
                  className="text-eduka-blue"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Renforcent
                </motion.span> Votre Entreprise.
              </motion.h2>

              <motion.p 
                className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Chez Soft FS, nous exploitons une technologie de pointe pour transformer les entreprises et stimuler l'innovation. Notre équipe 
                d'experts développeurs et ingénieurs livre des solutions évolutives qui améliorent l'efficacité et accélèrent la croissance.
              </motion.p>

            {/* Services */}
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-eduka-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Excellence Technologique</h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    Nous restons à la pointe des tendances technologiques, en implémentant les derniers frameworks et outils pour livrer 
                    des solutions logicielles exceptionnelles qui dépassent les attentes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#A5A6C8' }}>
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Portée Mondiale</h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    Notre équipe distribuée sert des clients dans le monde entier, livrant des solutions logicielles de haute qualité dans 
                    différentes industries et fuseaux horaires avec une collaboration transparente.
                  </p>
                </div>
              </div>
            </div>

              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.button 
                  className="text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-colors touch-manipulation text-sm sm:text-base" 
                  style={{ backgroundColor: '#A5A6C8' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#9293B8'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#A5A6C8'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  En Savoir Plus
                </motion.button>
                <motion.div 
                  className="flex items-center gap-2 sm:gap-3"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <motion.div 
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-eduka-blue rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.div>
                  <div className="text-center sm:text-left">
                    <div className="text-xs sm:text-sm text-gray-600">Appelez à tout moment</div>
                    <div className="font-bold text-gray-800 text-sm sm:text-base">+1 (555) 123-TECH</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/*Stats Section*/}
      <motion.section 
        className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/programmer.jpg')`,
          }}
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="container mx-auto relative z-10">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <motion.div 
                  key={index} 
                  className="text-center text-white"
                  variants={{
                    initial: { opacity: 0, y: 50, scale: 0.8 },
                    animate: { opacity: 1, y: 0, scale: 1 }
                  }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <motion.div 
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-eduka-blue rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </motion.div>
                  <motion.div 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1, type: "spring" }}
                  >
                    {stat.number}
                    <span className="text-eduka-blue">{stat.suffix}</span>
                  </motion.div>
                  <motion.div 
                    className="text-sm sm:text-base md:text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>
      {/*Services Section*/}
      <motion.section 
        className="py-12 sm:py-16 md:py-20 px-4 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-10 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-eduka-blue font-semibold mb-3 sm:mb-4 flex items-center justify-center gap-2 text-sm sm:text-base"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-eduka-blue"
                initial={{ width: 0 }}
                whileInView={{ width: 24 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              NOS SERVICES
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-eduka-blue"
                initial={{ width: 0 }}
                whileInView={{ width: 24 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.div>

            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Explorez Nos Services <motion.span 
                className="text-eduka-blue"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Technologiques
              </motion.span>
            </motion.h2>

            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Nous offrons des solutions technologiques complètes conçues pour transformer votre entreprise, améliorer l'efficacité, 
              et stimuler l'innovation sur tous les points de contact numériques.
            </motion.p>
          </motion.div>

          {/* Services Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden touch-manipulation"
                variants={{
                  initial: { opacity: 0, y: 50, scale: 0.9 },
                  animate: { opacity: 1, y: 0, scale: 1 }
                }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="relative overflow-hidden">
                  <motion.img 
                    src={service.image || "/placeholder.svg"} 
                    alt={service.title} 
                    className="w-full h-40 sm:h-44 md:h-48 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-eduka-blue text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Recommandé
                  </motion.div>
                </div>

                <div className="p-4 sm:p-5 md:p-6">
                  <motion.h3 
                    className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {service.title}
                  </motion.h3>

                  <motion.div 
                    className="flex items-center justify-between mb-3 sm:mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                        {service.clients}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">{service.duration}</span>
                        <span className="sm:hidden">Flexible</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.button 
                    className="w-full text-white py-2 sm:py-2.5 px-4 rounded transition-colors text-sm sm:text-base touch-manipulation" 
                    style={{ backgroundColor: '#3B4D8F' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#9293B8'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#A5A6C8'}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="hidden sm:inline">Voir les Détails du Service</span>
                    <span className="sm:hidden">Voir Détails</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Our Team Section */}
      <motion.section 
        className="py-12 sm:py-16 md:py-20 px-4 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-10 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-eduka-blue font-semibold mb-3 sm:mb-4 flex items-center justify-center gap-2 text-sm sm:text-base"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-eduka-blue"
                initial={{ width: 0 }}
                whileInView={{ width: 24 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              NOTRE ÉQUIPE
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-eduka-blue"
                initial={{ width: 0 }}
                whileInView={{ width: 24 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.div>

            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Rencontrez Notre Équipe <motion.span 
                className="text-eduka-blue"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                d'Experts
              </motion.span>
            </motion.h2>

            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Notre équipe diversifiée de professionnels passionnés rassemble des décennies d'expérience en technologie, 
              design et innovation pour livrer des résultats exceptionnels à nos clients.
            </motion.p>
          </motion.div>

          {/* Team Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden group touch-manipulation"
                variants={{
                  initial: { opacity: 0, y: 50, scale: 0.9 },
                  animate: { opacity: 1, y: 0, scale: 1 }
                }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="relative overflow-hidden">
                  <motion.img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Social Links */}
                  <motion.div 
                    className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.a 
                      href={member.social.github} 
                      className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-eduka-blue transition-colors touch-manipulation"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.a>
                    <motion.a 
                      href={member.social.linkedin} 
                      className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-eduka-blue transition-colors touch-manipulation"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.a>
                    <motion.a 
                      href={member.social.twitter} 
                      className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-eduka-blue transition-colors touch-manipulation"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Twitter className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.a>
                  </motion.div>
                </div>

                <div className="p-4 sm:p-5 md:p-6">
                  <motion.h3 
                    className="text-lg sm:text-xl font-bold text-gray-800 mb-1"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {member.name}
                  </motion.h3>
                  <motion.p 
                    className="text-eduka-blue font-semibold mb-2 sm:mb-3 text-sm sm:text-base"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {member.role}
                  </motion.p>
                  <motion.p 
                    className="text-gray-600 text-xs sm:text-sm leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {member.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      {/* Why Choose Us Section */}
      <motion.section 
        className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-10 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-eduka-blue font-semibold mb-3 sm:mb-4 flex items-center justify-center gap-2 text-sm sm:text-base"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-eduka-blue"
                initial={{ width: 0 }}
                whileInView={{ width: 24 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              POURQUOI NOUS CHOISIR
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-eduka-blue"
                initial={{ width: 0 }}
                whileInView={{ width: 24 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.div>

            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Pourquoi <motion.span 
                className="text-eduka-blue"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Soft FS
              </motion.span> est Votre Meilleur Choix
            </motion.h2>

            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Nous combinons l'excellence technique avec l'expertise métier pour livrer des solutions qui non seulement répondent 
              à vos besoins actuels mais vous positionnent également pour la croissance et le succès futurs.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {whyChooseUs.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100 group touch-manipulation"
                  variants={{
                    initial: { opacity: 0, y: 50, scale: 0.9 },
                    animate: { opacity: 1, y: 0, scale: 1 }
                  }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02, 
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    rotateY: 5 
                  }}
                >
                  <div className="text-center">
                    <motion.div 
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 shadow-lg" 
                      style={{ background: 'linear-gradient(to bottom right, #3B4D8F, #A5A6C8)' }}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1, type: "spring" }}
                    >
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </motion.div>
                    
                    <motion.h3 
                      className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                      whileHover={{ color: "#3B4D8F" }}
                    >
                      {feature.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-600 leading-relaxed text-xs sm:text-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                  
                  {/* Decorative bottom accent */}
                  <div className="mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t border-gray-100">
                    <motion.div 
                      className="w-8 sm:w-10 md:w-12 h-0.5 sm:h-0.5 md:h-1 rounded-full mx-auto" 
                      style={{ background: 'linear-gradient(to right, #3B4D8F, #A5A6C8)' }}
                      initial={{ opacity: 0, width: 0 }}
                      whileHover={{ opacity: 1, width: window.innerWidth < 640 ? 32 : window.innerWidth < 768 ? 40 : 48 }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="text-center mt-10 sm:mt-12 md:mt-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              <motion.h3 
                className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Prêt à Transformer Votre Entreprise ?
              </motion.h3>
              <motion.p 
                className="text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base px-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Rejoignez des centaines de clients satisfaits qui ont choisi Soft FS pour accélérer leur parcours de transformation numérique.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.button 
                  className="border-2 border-eduka-blue text-eduka-blue hover:bg-gray-100 hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base sm:text-lg transition-colors touch-manipulation"
                  whileHover={{ scale: 1.05, backgroundColor: "#3B4D8F", color: "white" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Nous Contacter
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      <Footer />
    </motion.div>
  )
}
