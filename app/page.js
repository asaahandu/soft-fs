'use client';
import {Play, GraduationCap, Users, BookOpen, DollarSign, CheckCircle, Phone, Trophy, Star, Clock, Cloud, Cpu, Smartphone, Settings, Shield, Zap, Heart, Award, Github, Linkedin, Twitter, ChevronLeft, ChevronRight} from "lucide-react"
import Header from "./components/header"
import Footer from "./components/footer"
import { useState, useEffect } from "react"

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

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

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
    <div className="min-h-screen">
      <Header />
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-20 px-4 overflow-hidden pb-32">
        {/* Slideshow Background */}
        <div className="absolute inset-0 overflow-hidden">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url('${image.url}')`,
              }}
            />
          ))}
        </div>
        
        <div className="absolute inset-0 bg-blue-900/70" />

        {/* Slideshow Navigation */}
        <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Slideshow Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

       <div className="container mx-auto relative z-10">
        <div className="max-w-2xl ml-30">
          <div className="text-white font-semibold mb-4 flex items-center gap-2">
            <div className="w-8 h-0.5" />
            BIENVENUE CHEZ SOFT FS !
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Construisez Votre
            <br />
            <span className="text-eduka-blue">Avenir</span> Numérique
          </h1>

          <p className="text-gray-200 text-lg mb-8 leading-relaxed">
            Transformez votre entreprise avec des solutions technologiques de pointe. Nous proposons un développement logiciel innovant, 
            des services cloud et des stratégies de transformation numérique qui favorisent la croissance et l'efficacité.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="border border-white text-white hover:bg-white hover:text-gray-800 px-8 py-3 rounded-full text-lg flex items-center gap-2 bg-transparent transition-colors">
              Nos Services
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-gray-800 px-8 py-3 rounded-full text-lg flex items-center gap-2 bg-transparent transition-colors">
              Nous Contacter
            </button>
          </div>
        </div>
      </div>
    </section>
      
      {/*Features Section - Overlapping Cards*/}
      <section className="relative -mt-16 z-20 px-4">
        <div className="container mx-auto">
          <div className="ml-auto max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div 
                    key={index} 
                    className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-4 md:p-5 group border border-gray-100 backdrop-blur-sm"
                  >
                  <div className="relative mb-4">
                    <div 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md"
                      style={{
                        background: 'linear-gradient(to bottom right, #A5A6C8, #A5A6C8)'
                      }}
                    >
                      <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div 
                      className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg"
                      style={{
                        background: 'linear-gradient(to right, #3B4D8F, #3B4D8F)'
                      }}
                    >
                      {feature.number}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 transition-colors duration-300 leading-tight" style={{ '--hover-color': '#A5A6C8' }} onMouseEnter={(e) => e.target.style.color = '#A5A6C8'} onMouseLeave={(e) => e.target.style.color = ''}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-xs md:text-sm">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Decorative bottom border */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div 
                      className="w-12 h-1 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(to right, #3B4D8F, #A5A6C8)'
                      }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
          </div>
        </div>
      </section>
      
      {/* Spacer section to maintain layout */}
      <section className="py-8 md:py-16 bg-gray-50"></section>
      {/*About Section*/}
        <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="/images/design.jpg"
                  alt="Designing"
                  className="rounded-lg w-full h-48 object-cover"
                />
                <img
                  src="/images/worker.jpg"
                  alt="Working"
                  className="rounded-lg w-full h-36 object-cover"
                />
              </div>
              <div className="pt-8">
                <img
                  src="/images/programmer.jpg"
                  alt="Programming"
                  className="rounded-lg w-full h-72 object-cover"
                />
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute bottom-4 left-4 bg-eduka-blue text-white p-4 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm">Années d'Excellence</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="text-eduka-blue font-semibold mb-4 flex items-center gap-2">
              <div className="w-8 h-0.5 bg-eduka-blue" />
              À PROPOS DE NOUS
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Nos Solutions Technologiques
              <br />
              <span className="text-eduka-blue">Renforcent</span> Votre Entreprise.
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Chez Soft FS, nous exploitons une technologie de pointe pour transformer les entreprises et stimuler l'innovation. Notre équipe 
              d'experts développeurs et ingénieurs livre des solutions évolutives qui améliorent l'efficacité et accélèrent la croissance.
            </p>

            {/* Services */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-eduka-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Excellence Technologique</h4>
                  <p className="text-gray-600 text-sm">
                    Nous restons à la pointe des tendances technologiques, en implémentant les derniers frameworks et outils pour livrer 
                    des solutions logicielles exceptionnelles qui dépassent les attentes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#A5A6C8' }}>
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Portée Mondiale</h4>
                  <p className="text-gray-600 text-sm">
                    Notre équipe distribuée sert des clients dans le monde entier, livrant des solutions logicielles de haute qualité dans 
                    différentes industries et fuseaux horaires avec une collaboration transparente.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                className="text-white px-8 py-3 rounded-full transition-colors" 
                style={{ backgroundColor: '#A5A6C8' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#9293B8'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#A5A6C8'}
              >
                En Savoir Plus
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-eduka-blue rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Appelez à tout moment</div>
                  <div className="font-bold text-gray-800">+1 (555) 123-TECH</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      
      {/*Stats Section*/}
        <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/programmer.jpg')`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center text-white">
                <div className="w-16 h-16 bg-eduka-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2">
                  {stat.number}
                  <span className="text-eduka-blue">{stat.suffix}</span>
                </div>
                <div className="text-lg">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
      {/*Services Section*/}
        <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-eduka-blue font-semibold mb-4 flex items-center justify-center gap-2">
            <div className="w-8 h-0.5 bg-eduka-blue" />
            NOS SERVICES
            <div className="w-8 h-0.5 bg-eduka-blue" />
          </div>

          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Explorez Nos Services <span className="text-eduka-blue">Technologiques</span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Nous offrons des solutions technologiques complètes conçues pour transformer votre entreprise, améliorer l'efficacité, 
            et stimuler l'innovation sur tous les points de contact numériques.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img src={service.image || "/placeholder.svg"} alt={service.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4 bg-eduka-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Recommandé
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>

                <div className="flex items-center justify-between mb-4">

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {service.clients}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {service.duration}
                    </div>
                  </div>
                </div>

                <button 
                  className="w-full text-white py-2 px-4 rounded transition-colors" 
                  style={{ backgroundColor: '#3B4D8F' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#9293B8'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#A5A6C8'}
                >
                  Voir les Détails du Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Our Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="text-eduka-blue font-semibold mb-4 flex items-center justify-center gap-2">
              <div className="w-8 h-0.5 bg-eduka-blue" />
              NOTRE ÉQUIPE
              <div className="w-8 h-0.5 bg-eduka-blue" />
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Rencontrez Notre Équipe <span className="text-eduka-blue">d'Experts</span>
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Notre équipe diversifiée de professionnels passionnés rassemble des décennies d'expérience en technologie, 
              design et innovation pour livrer des résultats exceptionnels à nos clients.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Social Links */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href={member.social.github} className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-eduka-blue transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href={member.social.linkedin} className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-eduka-blue transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href={member.social.twitter} className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-eduka-blue transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-eduka-blue font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="text-eduka-blue font-semibold mb-4 flex items-center justify-center gap-2">
              <div className="w-8 h-0.5 bg-eduka-blue" />
              POURQUOI NOUS CHOISIR
              <div className="w-8 h-0.5 bg-eduka-blue" />
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Pourquoi <span className="text-eduka-blue">Soft FS</span> est Votre Meilleur Choix
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous combinons l'excellence technique avec l'expertise métier pour livrer des solutions qui non seulement répondent 
              à vos besoins actuels mais vous positionnent également pour la croissance et le succès futurs.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg" style={{ background: 'linear-gradient(to bottom right, #3B4D8F, #A5A6C8)' }}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-eduka-blue transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Decorative bottom accent */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="w-12 h-1 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to right, #3B4D8F, #A5A6C8)' }}></div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Prêt à Transformer Votre Entreprise ?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Rejoignez des centaines de clients satisfaits qui ont choisi Soft FS pour accélérer leur parcours de transformation numérique.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="border-2 border-eduka-blue text-eduka-blue hover:bg-gray-100 hover:text-white px-8 py-3 rounded-full text-lg transition-colors">
                  Nous Contacter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
