'use client';
import {CheckCircle, Users, Clock, Star, Code, Palette, Smartphone, Globe, Database, Shield, Zap, Settings, ArrowRight, Phone, Mail} from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

// Detailed services data with comprehensive information
const servicesData = [
  {
    id: 1,
    image: "/images/web-development.jpg",
    title: "Développement Web",
    subtitle: "Solutions Web Full-Stack",
    rating: 5,
    clients: 25,
    duration: "À votre rythme",
    shortDescription: "Applications web personnalisées construites avec des technologies modernes",
    fullDescription: "Nous créons des applications web puissantes et évolutives en utilisant des technologies de pointe comme React, Next.js, Node.js et les plateformes cloud. Notre approche de développement full-stack assure une intégration transparente entre les systèmes frontend et backend.",
    features: [
      "Conception web responsive pour tous les appareils",
      "Frameworks JavaScript modernes (React, Vue, Angular)",
      "Développement d'API backend avec Node.js/Python",
      "Conception et optimisation de bases de données",
      "Déploiement et hébergement cloud",
      "Optimisation SEO et amélioration des performances",
      "Développement d'applications web progressives (PWA)",
      "Intégration e-commerce et paiement"
    ],
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "AWS", "Docker"],
    icon: Code,
    color: "from-blue-500 to-blue-700",
    price: "À partir de 50,000FCFA",
    timeline: "2-8 semaines"
  },
  {
    id: 2,
    image: "/images/graphic-design.jpg",
    title: "Design Graphique",
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
    price: "À partir de 15000FCFA",
    timeline: "1-3 semaines"
  },
  {
    id: 3,
    image: "/images/mobile-development.jpg",
    title: "Développement d'Applications Mobiles",
    subtitle: "Applications iOS et Android",
    rating: 5,
    clients: 20,
    duration: "À votre rythme",
    shortDescription: "Applications mobiles natives et multiplateformes",
    fullDescription: "Nous développons des applications mobiles hautes performances pour les plateformes iOS et Android en utilisant des technologies natives et multiplateformes. Nos applications sont conçues pour une expérience utilisateur optimale et une fonctionnalité transparente.",
    features: [
      "Développement natif iOS et Android",
      "Développement multiplateforme avec React Native/Flutter",
      "Design UI/UX optimisé pour mobile",
      "Intégration API et connectivité backend",
      "Notifications push et fonctionnalités temps réel",
      "Soumission et optimisation App Store",
      "Surveillance des performances et analytics",
      "Fonctionnalité hors ligne et synchronisation de données"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Redux"],
    icon: Smartphone,
    color: "from-green-500 to-emerald-600",
    price: "À partir de 100,000FCFA",
    timeline: "3-12 semaines"
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

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section - Smaller than home page */}
      <section className="relative bg-gradient-to-r from-black-900 to-black-700 py-16 px-4 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/web-development.jpg')`,
          }}
        />
        
        <div className="absolute inset-0 bg-blue-900/80" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-white font-semibold mb-4 flex items-center justify-center gap-2">
              <div className="w-8 h-0.5 bg-white" />
              NOS SERVICES
              <div className="w-8 h-0.5 bg-white" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Solutions <span className="text-eduka-blue">Technologiques</span>
              <br />
              Complètes pour Votre Entreprise
            </h1>

            <p className="text-gray-200 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Du développement web aux applications mobiles et au design créatif, nous livrons des solutions innovantes 
              qui stimulent la croissance et transforment votre présence numérique.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-eduka-blue text-white hover:bg-blue-700 px-8 py-3 rounded-full text-lg flex items-center justify-center gap-2 transition-colors">
                Voir Nos Réalisations
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-gray-800 px-8 py-3 rounded-full text-lg flex items-center justify-center gap-2 bg-transparent transition-colors">
                Devis Gratuit
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="text-eduka-blue font-semibold mb-4 flex items-center justify-center gap-2">
              <div className="w-8 h-0.5 bg-eduka-blue" />
              SERVICES PRINCIPAUX
              <div className="w-8 h-0.5 bg-eduka-blue" />
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Nos Services <span className="text-eduka-blue">Essentiels</span>
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous nous spécialisons dans trois domaines principaux de solutions technologiques, chacun conçu pour 
              aider votre entreprise à prospérer dans le paysage numérique.
            </p>
          </div>

          {/* Detailed Services */}
          <div className="space-y-20">
            {servicesData.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div
                  key={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{service.title}</h3>
                        <p className="text-eduka-blue font-semibold">{service.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      {service.fullDescription}
                    </p>

                    {/* Key Features */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">Caractéristiques Clés:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.features.slice(0, 6).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">Technologies que Nous Utilisons:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:border-eduka-blue hover:text-eduka-blue transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats and CTA */}
                    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-eduka-blue">{service.rating}.0</div>
                          <div className="text-sm text-gray-600">Note</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-eduka-blue">{service.clients}+</div>
                          <div className="text-sm text-gray-600">Clients</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-eduka-blue">{service.timeline}</div>
                          <div className="text-sm text-gray-600">Délai</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-eduka-blue">{service.price.split(' ')[2]}</div>
                          <div className="text-sm text-gray-600">À partir de</div>
                        </div>
                      </div>

                      <button className="w-full bg-blue-700 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center gap-2">
                        Commencer avec {service.title}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className="relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                      
                      {/* Floating badge */}
                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-eduka-blue px-4 py-2 rounded-full font-semibold shadow-lg">
                        ⭐ {service.rating}.0 Note
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="text-eduka-blue font-semibold mb-4 flex items-center justify-center gap-2">
              <div className="w-8 h-0.5 bg-eduka-blue" />
              SERVICES ADDITIONNELS
              <div className="w-8 h-0.5 bg-eduka-blue" />
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Plus de Façons de Nous <span className="text-eduka-blue">Aider</span>
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Au-delà de nos services principaux, nous offrons des solutions supplémentaires pour soutenir 
              votre parcours complet de transformation numérique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-eduka-blue to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center group-hover:text-eduka-blue transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 text-center leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="w-12 h-1 bg-gradient-to-r from-eduka-blue to-blue-700 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="text-eduka-blue font-semibold mb-4 flex items-center justify-center gap-2">
              <div className="w-8 h-0.5 bg-eduka-blue" />
              NOTRE PROCESSUS
              <div className="w-8 h-0.5 bg-eduka-blue" />
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Comment Nous <span className="text-eduka-blue">Travaillons</span> Avec Vous
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Notre méthodologie éprouvée assure une livraison de projet réussie de 
              la consultation initiale au déploiement final et au-delà.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Connection line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2 z-0" />
                )}
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-eduka-blue to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-400 to-blue-700">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à Démarrer Votre Projet ?
          </h2>
          
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Discutons de vos exigences et créons une solution qui fait avancer votre entreprise. 
            Obtenez une consultation gratuite et un devis de projet aujourd'hui.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-eduka-blue hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2 transition-colors">
              <Phone className="w-5 h-5" />
              Appelez-Nous
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-eduka-blue px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2 transition-colors">
              <Mail className="w-5 h-5" />
              Envoyer un Message
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">Support Disponible</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-blue-100">Satisfaction Client</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">48h</div>
              <div className="text-blue-100">Temps de Réponse</div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
