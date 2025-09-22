'use client';
import { 
  CheckCircle, 
  Phone, 
  Trophy, 
  Users, 
  Settings, 
  Star, 
  Shield, 
  Zap, 
  Heart, 
  Award,
  Target,
  Eye,
  Lightbulb,
  Rocket,
  Globe,
  Code,
  Smartphone,
  Palette,
  Database,
  Cloud,
  Github,
  Linkedin,
  Twitter,
  ArrowRight,
  Play
} from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

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

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Ingénieure Logiciel Principal",
    image: "/images/design.jpg",
    description: "Développeuse full-stack avec plus de 8 ans d'expérience en React, Node.js et architecture cloud. Sarah dirige notre équipe de développement frontend et a contribué à plus de 100 projets réussis.",
    specialties: ["React", "Node.js", "AWS", "TypeScript"],
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
    description: "Spécialiste en infrastructure cloud axé sur les solutions évolutives et les pipelines de déploiement automatisés. Michael optimise nos processus de développement et garantit une livraison continue de qualité.",
    specialties: ["Docker", "Kubernetes", "CI/CD", "Azure"],
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
    description: "Designer créative passionnée par le design centré sur l'utilisateur et la création d'expériences numériques intuitives. Emily transforme les idées complexes en interfaces utilisateur élégantes et fonctionnelles.",
    specialties: ["Figma", "Adobe XD", "Prototyping", "User Research"],
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
    description: "Expert en apprentissage automatique spécialisé dans l'analyse de données et les solutions d'automatisation intelligente. David développe des algorithmes innovants qui automatisent les processus métier.",
    specialties: ["Python", "TensorFlow", "Machine Learning", "Data Science"],
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
    description: "Plus de 10 ans d'expérience dans la livraison de solutions technologiques de pointe dans diverses industries avec un taux de satisfaction client de 99%. Notre équipe certifiée maîtrise les dernières technologies et méthodologies."
  },
  {
    icon: Zap,
    title: "Livraison Rapide",
    description: "La méthodologie de développement agile garantit un déploiement rapide sans compromettre les normes de qualité ou de sécurité. Nous livrons des MVPs en 4-6 semaines et itérons rapidement selon vos retours."
  },
  {
    icon: Heart,
    title: "Centré sur le Client",
    description: "Nous priorisons vos objectifs commerciaux et fournissons des solutions personnalisées qui génèrent des résultats mesurables. Chaque projet commence par une analyse approfondie de vos besoins spécifiques."
  },
  {
    icon: Award,
    title: "Primé",
    description: "Leader de l'industrie reconnu avec de nombreux prix pour l'innovation, la qualité et l'excellence du service client. Nos solutions ont été distinguées par plusieurs organismes professionnels."
  }
]

const companyValues = [
  {
    icon: Target,
    title: "Innovation",
    description: "Nous adoptons les technologies émergentes pour créer des solutions avant-gardistes qui donnent à nos clients un avantage concurrentiel sur leur marché."
  },
  {
    icon: Eye,
    title: "Transparence",
    description: "Communication ouverte et honnête à chaque étape du projet. Vous avez toujours une visibilité complète sur l'avancement et les décisions prises."
  },
  {
    icon: Lightbulb,
    title: "Créativité",
    description: "Nous pensons différemment pour résoudre des problèmes complexes avec des approches créatives et des solutions sur mesure adaptées à chaque contexte."
  },
  {
    icon: Rocket,
    title: "Excellence",
    description: "Nous visons l'excellence dans chaque ligne de code, chaque design et chaque interaction client. La qualité n'est pas négociable dans notre processus."
  }
]

const technologies = [
  {
    category: "Frontend",
    icon: Code,
    technologies: ["React", "Vue.js", "Angular", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    category: "Backend",
    icon: Database,
    technologies: ["Node.js", "Python", "Java", "PHP", "Laravel", "Express.js"]
  },
  {
    category: "Mobile",
    icon: Smartphone,
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic", "Xamarin"]
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Jenkins"]
  },
  {
    category: "Design",
    icon: Palette,
    technologies: ["Figma", "Adobe XD", "Sketch", "Adobe Creative Suite", "Prototyping", "UI/UX"]
  },
  {
    category: "Emerging Tech",
    icon: Globe,
    technologies: ["AI/ML", "Blockchain", "IoT", "AR/VR", "Microservices", "GraphQL"]
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section - Smaller than home page */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-16 px-4 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/design.jpg')`,
          }}
        />
        
        <div className="absolute inset-0 bg-blue-900/70" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-white font-semibold mb-4 flex items-center justify-center gap-2">
              <div className="w-8 h-0.5 bg-white" />
              À PROPOS DE SOFT FS
              <div className="w-8 h-0.5 bg-white" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Votre Partenaire de Confiance en
              <br />
              <span className="text-eduka-blue">Transformation</span> Numérique
            </h1>

            <p className="text-gray-200 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Depuis plus de 10 ans, nous accompagnons les entreprises dans leur évolution technologique 
              avec des solutions innovantes, une expertise reconnue et un engagement sans faille envers l'excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-eduka-blue hover:bg-eduka-blue-dark text-white px-8 py-3 rounded-full text-lg flex items-center justify-center gap-2 transition-colors">
                <Play className="w-5 h-5" />
                Voir Notre Histoire
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-gray-800 px-8 py-3 rounded-full text-lg flex items-center justify-center gap-2 bg-transparent transition-colors">
                Nos Réalisations
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="/images/design.jpg"
                    alt="Équipe de conception"
                    className="rounded-lg w-full h-48 object-cover shadow-lg"
                  />
                  <img
                    src="/images/worker.jpg"
                    alt="Développement en action"
                    className="rounded-lg w-full h-36 object-cover shadow-lg"
                  />
                </div>
                <div className="pt-8">
                  <img
                    src="/images/programmer.jpg"
                    alt="Programmation avancée"
                    className="rounded-lg w-full h-72 object-cover shadow-lg"
                  />
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-4 -right-4 bg-eduka-blue text-white p-6 rounded-lg shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold">200+</div>
                  <div className="text-sm">Projets Réussis</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="text-eduka-blue font-semibold mb-4 flex items-center gap-2">
                <div className="w-8 h-0.5 bg-eduka-blue" />
                NOTRE HISTOIRE
              </div>

              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Une Passion pour la 
                <br />
                <span className="text-eduka-blue">Technologie</span> Depuis 2014
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Fondée à Douala en 2014, Soft FS est née de la vision de démocratiser l'accès aux technologies 
                de pointe pour les entreprises africaines. Nous avons commencé avec une équipe de 3 développeurs 
                passionnés et avons grandi pour devenir un acteur incontournable du secteur technologique.
              </p>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Aujourd'hui, nous sommes fiers de compter plus de 30 collaborateurs talentueux et d'avoir accompagné 
                plus de 150 entreprises dans leur transformation numérique. Notre expertise couvre tous les aspects 
                du développement logiciel, du design à l'infrastructure cloud.
              </p>

              {/* Mission & Vision Pills */}
              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5 text-eduka-blue" />
                    Notre Mission
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Accompagner chaque entreprise dans sa transformation digitale en proposant des solutions 
                    technologiques innovantes, évolutives et adaptées à ses besoins spécifiques.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-eduka-blue" />
                    Notre Vision
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Être le leader africain des solutions logicielles innovantes et contribuer au développement 
                    de l'écosystème technologique continental.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="bg-eduka-blue hover:bg-eduka-blue-dark text-white px-8 py-3 rounded-full transition-colors">
                  En Savoir Plus
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-eduka-teal rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Appelez-nous maintenant</div>
                    <div className="font-bold text-gray-800">+237 671 178 892</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/web-development.jpg')`,
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Des Chiffres qui Parlent de Notre <span className="text-eduka-blue">Excellence</span>
            </h2>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Notre track record témoigne de notre engagement envers la qualité et l'innovation 
              dans chaque projet que nous entreprenons.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center text-white">
                  <div className="w-16 h-16 bg-eduka-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
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

      {/* Company Values Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="text-eduka-blue font-semibold mb-4 flex items-center justify-center gap-2">
              <div className="w-8 h-0.5 bg-eduka-blue" />
              NOS VALEURS
              <div className="w-8 h-0.5 bg-eduka-blue" />
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Les Valeurs qui Nous <span className="text-eduka-blue">Définissent</span>
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Nos valeurs fondamentales guident chaque décision, chaque interaction et chaque ligne de code 
              que nous écrivons. Elles sont le socle sur lequel nous construisons des relations durables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => {
              const IconComponent = value.icon
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
                      {value.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="w-12 h-1 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to right, #3B4D8F, #A5A6C8)' }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="text-eduka-blue font-semibold mb-4 flex items-center justify-center gap-2">
              <div className="w-8 h-0.5 bg-eduka-blue" />
              NOTRE STACK TECHNOLOGIQUE
              <div className="w-8 h-0.5 bg-eduka-blue" />
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Technologies de <span className="text-eduka-blue">Pointe</span>
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous maîtrisons un large éventail de technologies modernes pour répondre à tous vos besoins 
              de développement, depuis les applications web jusqu'aux solutions d'intelligence artificielle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => {
              const IconComponent = tech.icon
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-eduka-blue rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-eduka-blue transition-colors duration-300">
                      {tech.category}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {tech.technologies.map((technology, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200 hover:border-eduka-blue hover:text-eduka-blue transition-colors duration-200"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
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
              Notre équipe diversifiée de professionnels passionnés rassemble des décennies d'expérience 
              en technologie, design et innovation pour livrer des résultats exceptionnels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
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
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.description}</p>
                  
                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((specialty, specIndex) => (
                      <span
                        key={specIndex}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
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
              Nous combinons l'excellence technique avec l'expertise métier pour livrer des solutions 
              qui non seulement répondent à vos besoins actuels mais vous positionnent pour la croissance future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100"
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
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="w-12 h-1 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to right, #3B4D8F, #A5A6C8)' }}></div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-eduka-blue to-eduka-teal rounded-2xl p-8 shadow-lg text-white max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Prêt à Transformer Votre Entreprise ?
              </h3>
              <p className="mb-6 max-w-2xl mx-auto opacity-90">
                Rejoignez des centaines de clients satisfaits qui ont choisi Soft FS pour accélérer 
                leur parcours de transformation numérique. Discutons de votre projet aujourd'hui.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-eduka-blue hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold transition-colors">
                  Démarrer Votre Projet
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-eduka-blue px-8 py-3 rounded-full text-lg font-semibold transition-colors">
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
