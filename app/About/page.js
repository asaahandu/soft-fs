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
import { motion } from "framer-motion"
import Header from "../components/header"
import Footer from "../components/footer"

const stats = [
  {
    icon: Trophy,
    number: "20",
    label: "Projets Livrés",
    suffix: "+",
  },
  {
    icon: Users,
    number: "15",
    label: "Clients Satisfaits",
    suffix: "+",
  },
  {
    icon: Settings,
    number: "15",
    label: "Stack Technologique",
    suffix: "+",
  },
  {
    icon: Star,
    number: "5",
    label: "Années d'Expérience",
    suffix: "+",
  },
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
    category: "Design",
    icon: Palette,
    technologies: ["Figma", "Adobe XD", "Sketch", "Adobe Creative Suite", "Prototyping", "UI/UX"]
  },
  {
    category: "Réseau",
    icon: Globe,
    technologies: []
  },
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

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const scaleInHover = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  whileTap: { scale: 0.95 }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section - Mobile Responsive */}
      <motion.section 
        className="relative bg-black/70 py-12 sm:py-16 lg:py-20 px-4 overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/design.jpg')`,
          }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        
        <div className="absolute inset-0 bg-black/60" />

        <div className="container mx-auto relative z-10 w-full">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="text-white font-semibold text-sm sm:text-base mb-4 sm:mb-6 flex items-center justify-center gap-2 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-white"
                initial={{ width: 0 }}
                animate={{ width: "1.5rem" }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
              <span className="text-center">À PROPOS DE SOFT FS</span>
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-white"
                initial={{ width: 0 }}
                animate={{ width: "1.5rem" }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </motion.div>

            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Votre partenaire de confiance en
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              <motion.span 
                className="text-eduka-blue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                transformation
              </motion.span> numérique
            </motion.h1>

            <motion.p 
              className="text-gray-200 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Depuis plus de 5 ans, nous accompagnons les entreprises dans leur évolution technologique 
              avec des solutions innovantes, une expertise reconnue et un engagement sans faille envers l'excellence.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 max-w-lg sm:max-w-none mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Company Story Section - Mobile Optimized */}
      <motion.section 
        className="py-12 sm:py-16 lg:py-20 px-4 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Images */}
            <motion.div 
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <motion.div 
                  className="space-y-3 sm:space-y-4"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <motion.img
                    src="/images/web-development.jpg"
                    alt="Développement web"
                    className="rounded-lg w-full h-32 sm:h-40 lg:h-48 object-cover shadow-lg"
                    variants={fadeInUp}
                  />
                  <motion.img
                    src="/images/mobile-development.jpg"
                    alt="Développement mobile"
                    className="rounded-lg w-full h-24 sm:h-28 lg:h-36 object-cover shadow-lg"
                    variants={fadeInUp}
                  />
                </motion.div>
                <motion.div 
                  className="pt-4 sm:pt-6 lg:pt-8"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.img
                    src="/images/graphic-design.jpg"
                    alt="Design graphique"
                    className="rounded-lg w-full h-48 sm:h-56 lg:h-72 object-cover shadow-lg"
                  />
                </motion.div>
              </div>

              {/* Floating Stats Card - Responsive positioning */}
              <motion.div 
                className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-eduka-blue text-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="text-xl sm:text-2xl md:text-3xl font-bold text-sm sm:text-base mb-4 flex items-center gap-2 flex-wrap justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="w-6 sm:w-8 h-0.5 bg-eduka-blue"
                  initial={{ width: 0 }}
                  whileInView={{ width: "1.5rem" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                NOTRE HISTOIRE
              </motion.div>

              <motion.h2 
                className="font-bold text-gray-800 mb-4 sm:mb-6 text-center lg:text-left leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Une passion pour la 
                <br className="hidden sm:block" />
                <span className="text-eduka-blue">technologie</span> depuis 2020
              </motion.h2>

              <motion.p 
                className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Fondée à Douala en 2020, Soft FS est née de la vision de démocratiser l'accès aux technologies 
                de pointe pour les entreprises africaines. Nous avons commencé avec une équipe de 3 développeurs 
                passionnés et avons grandi pour devenir un acteur incontournable du secteur technologique.
              </motion.p>

              <motion.p 
                className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Aujourd'hui, nous sommes fiers de compter plus de 30 collaborateurs talentueux et d'avoir accompagné 
                plus de 15 entreprises dans leur transformation numérique. Notre expertise couvre tous les aspects 
                du développement logiciel, du design à l'infrastructure cloud.
              </motion.p>

              {/* Mission & Vision Pills */}
              <motion.div 
                className="space-y-3 sm:space-y-4 mb-6 sm:mb-8"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.div 
                  className="bg-gray-50 rounded-lg p-3 sm:p-4"
                  variants={fadeInUp}
                >
                  <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-2 flex items-center gap-2 justify-center lg:justify-start">
                    <Target className="w-4 sm:w-5 h-4 sm:h-5 text-eduka-blue flex-shrink-0" />
                    Notre Mission
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-center lg:text-left">
                    Accompagner chaque entreprise dans sa transformation digitale en proposant des solutions 
                    technologiques innovantes, évolutives et adaptées à ses besoins spécifiques.
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-gray-50 rounded-lg p-3 sm:p-4"
                  variants={fadeInUp}
                >
                  <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-2 flex items-center gap-2 justify-center lg:justify-start">
                    <Eye className="w-4 sm:w-5 h-4 sm:h-5 text-eduka-blue flex-shrink-0" />
                    Notre Vision
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-center lg:text-left">
                    Être le leader africain des solutions logicielles innovantes et contribuer au développement 
                    de l'écosystème technologique continental.
                  </p>
                </motion.div>
              </motion.div>

              {/* CTA Section - Mobile Responsive */}
              <motion.div 
                className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.button 
                  className="bg-eduka-blue hover:bg-eduka-blue-dark text-white px-6 sm:px-8 py-3 rounded-full transition-colors text-sm sm:text-base whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  En Savoir Plus
                </motion.button>
                <motion.div 
                  className="flex items-center gap-3 justify-center lg:justify-start"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-eduka-teal rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-xs sm:text-sm text-gray-600">Appelez-nous maintenant</div>
                    <div className="font-bold text-gray-800 text-sm sm:text-base">+237 657765185</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section - Mobile Optimized */}
      <motion.section 
        className="py-12 sm:py-16 lg:py-20 px-4 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
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
          transition={{ duration: 1.2 }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="container mx-auto relative z-10">
          <motion.div 
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-4 px-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Des chiffres qui parlent de notre <span className="text-eduka-blue">excellence</span>
            </motion.h2>
            <motion.p 
              className="text-gray-200 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto px-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Notre track record témoigne de notre engagement envers la qualité et l'innovation 
              dans chaque projet que nous entreprenons.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
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
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="w-12 sm:w-16 h-12 sm:h-16 bg-eduka-blue rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-5 sm:w-6 lg:w-8 h-5 sm:h-6 lg:h-8 text-white" />
                  </motion.div>
                  <motion.div 
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                  >
                    {stat.number}
                    <span className="text-eduka-blue">{stat.suffix}</span>
                  </motion.div>
                  <motion.div 
                    className="text-xs sm:text-sm lg:text-base leading-tight px-1"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.7 }}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Founder Section */}
      <motion.section 
        className="py-12 sm:py-16 lg:py-20 px-4 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-xl sm:text-2xl md:text-3xl font-bold text-sm sm:text-base mb-4 flex items-center justify-center gap-2 flex-wrap px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-eduka-blue"
                initial={{ width: 0 }}
                whileInView={{ width: "1.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <span>LE FONDATEUR</span>
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-eduka-blue"
                initial={{ width: 0 }}
                whileInView={{ width: "1.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>

            <motion.h2 
              className="font-bold text-gray-800 mb-3 sm:mb-4 px-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Rencontrez le <span className="text-eduka-blue">visionnaire</span> derrière Soft FS
            </motion.h2>

            <motion.p 
              className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto px-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Découvrez l'histoire et la vision de la personne qui a créé Soft FS avec une passion 
              pour l'innovation technologique et l'excellence.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
            {/* Founder Image */}
            <motion.div 
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative flex justify-center">
                <motion.img
                  src="/images/promoteur.jpg"
                  alt="Fondateur de Soft FS"
                  className="rounded-full w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-cover shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                
                {/* Quote Card */}
                <motion.div 
                  className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-eduka-blue text-white p-4 sm:p-6 rounded-xl shadow-xl max-w-xs"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-xs sm:text-sm italic leading-relaxed">
                    "La technologie doit servir l'humain et créer des opportunités pour tous"
                  </div>
                  <div className="mt-2 text-xs font-semibold">
                    - Fondateur, Soft FS
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Founder Content */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >

              <motion.div 
                className="text-eduka-blue font-semibold text-base sm:text-lg mb-6 text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Fondateur & CEO
              </motion.div>

              <motion.div 
                className="space-y-4 sm:space-y-6 text-gray-600 text-sm sm:text-base leading-relaxed text-center lg:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p>
                  De son vrai nom Fankam Wometcha Sides, le promoteur et gérant du groupe 
                  Soft FS est un ingénieur camerounais spécialisé en systèmes informatiques et 
                  réseaux, titulaire d’une maîtrise en Management des Systèmes d’Information. 
                </p>

                <p>
                  Son parcours est marqué par de solides expériences professionnelles acquises 
                  au sein d’entreprises camerounaises et multinationales, où il a contribué de 
                  manière significative au développement et à l’optimisation des systèmes 
                  d’information, ainsi qu’à la conception de solutions informatiques adaptées 
                  aux besoins stratégiques des organisations. 
                </p>

                <p>
                  Animé par une vision claire et ambitieuse, il a fondé Soft FS afin de proposer 
                  des services innovants en création digitale et en solutions informatiques de 
                  qualité, avec pour objectif d’optimiser les performances et de créer une 
                  véritable valeur ajoutée pour ses clients et partenaires.
                </p>
              </motion.div>

              {/* Contact Founder */}
              <motion.div 
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.button 
                  className="bg-eduka-blue hover:bg-eduka-blue-dark text-black px-6 sm:px-8 py-3 rounded-full transition-colors text-sm sm:text-base whitespace-nowrap flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-4 h-4" />
                  Connecter sur LinkedIn
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Company Values Section */}
      <motion.section 
        className="py-12 sm:py-16 lg:py-20 px-4 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-xl sm:text-2xl md:text-3xl font-bold text-sm sm:text-base mb-4 flex items-center justify-center gap-2 flex-wrap px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-eduka-blue"
                initial={{ width: 0 }}
                whileInView={{ width: "1.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <span>NOS VALEURS</span>
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-eduka-blue"
                initial={{ width: 0 }}
                whileInView={{ width: "1.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>

            <motion.h2 
              className="font-bold text-gray-800 mb-3 sm:mb-4 px-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Les valeurs qui nous <span className="text-eduka-blue">définissent</span>
            </motion.h2>

            <motion.p 
              className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto px-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Nos valeurs fondamentales guident chaque décision, chaque interaction et chaque ligne de code 
              que nous écrivons. Elles sont le socle sur lequel nous construisons des relations durables.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {companyValues.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100"
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.02,
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="text-center">
                    <motion.div 
                      className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg" 
                      style={{ background: 'linear-gradient(to bottom right, #3B4D8F, #A5A6C8)' }}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-white" />
                    </motion.div>
                    
                    <motion.h3 
                      className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 group-hover:text-eduka-blue transition-colors duration-300 leading-tight"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                    >
                      {value.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-600 text-sm sm:text-base leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
                    >
                      {value.description}
                    </motion.p>
                  </div>
                  
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                    <motion.div 
                      className="w-8 sm:w-10 lg:w-12 h-1 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      style={{ background: 'linear-gradient(to right, #3B4D8F, #A5A6C8)' }}
                      initial={{ width: 0 }}
                      whileHover={{ width: "3rem" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Technologies Section */}
      <motion.section 
        className="py-12 sm:py-16 lg:py-20 px-4 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-xl sm:text-2xl md:text-3xl font-bold text-sm sm:text-base mb-4 flex items-center justify-center gap-2 flex-wrap px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-eduka-blue"
                initial={{ width: 0 }}
                whileInView={{ width: "1.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <span className="text-center">NOTRE STACK TECHNOLOGIQUE</span>
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-eduka-blue"
                initial={{ width: 0 }}
                whileInView={{ width: "1.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>

            <motion.h2 
              className="font-bold text-gray-800 mb-3 sm:mb-4 px-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Technologies de <span className="text-eduka-blue">pointe</span>
            </motion.h2>

            <motion.p 
              className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto px-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Nous maîtrisons un large éventail de technologies modernes pour répondre à tous vos besoins 
              de développement, depuis les applications web jusqu'aux solutions d'intelligence artificielle.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {technologies.map((tech, index) => {
              const IconComponent = tech.icon
              return (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.03,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    <motion.div 
                      className="w-10 sm:w-12 h-10 sm:h-12 bg-eduka-blue rounded-lg flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    </motion.div>
                    <motion.h3 
                      className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-eduka-blue transition-colors duration-300 leading-tight"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                    >
                      {tech.category}
                    </motion.h3>
                  </div>
                  
                  <motion.div 
                    className="flex flex-wrap gap-1.5 sm:gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                  >
                    {tech.technologies.map((technology, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="bg-white text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm border border-gray-200 hover:border-eduka-blue hover:text-eduka-blue transition-colors duration-200 whitespace-nowrap"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: techIndex * 0.05 + index * 0.1 + 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {technology}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>
      
      {/* Why Choose Us Section */}
      <motion.section 
        className="py-12 sm:py-16 lg:py-20 px-4 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-xl sm:text-2xl md:text-3xl font-bold text-sm sm:text-base mb-4 flex items-center justify-center gap-2 flex-wrap px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-eduka-blue"
                initial={{ width: 0 }}
                whileInView={{ width: "1.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <span className="text-center">POURQUOI NOUS CHOISIR</span>
              <motion.div 
                className="w-6 sm:w-8 h-0.5 bg-eduka-blue"
                initial={{ width: 0 }}
                whileInView={{ width: "1.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>

            <motion.h2 
              className="font-bold text-gray-800 mb-3 sm:mb-4 px-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Pourquoi <span className="text-eduka-blue">Soft FS</span> est votre meilleur choix
            </motion.h2>

            <motion.p 
              className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto px-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Nous combinons l'excellence technique avec l'expertise métier pour livrer des solutions 
              qui non seulement répondent à vos besoins actuels mais vous positionnent pour la croissance future.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
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
                  className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100"
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.02,
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="text-center">
                    <motion.div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg" 
                      style={{ background: 'linear-gradient(to bottom right, #3B4D8F, #A5A6C8)' }}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <motion.h3 
                      className="text-xl font-bold text-gray-800 mb-4 group-hover:text-eduka-blue transition-colors duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                    >
                      {feature.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-600 leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <motion.div 
                      className="w-12 h-1 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      style={{ background: 'linear-gradient(to right, #3B4D8F, #A5A6C8)' }}
                      initial={{ width: 0 }}
                      whileHover={{ width: 48 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* CTA Section - Mobile Optimized */}
          <motion.div 
            className="text-center mt-12 sm:mt-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="bg-blue-700 rounded-2xl p-6 sm:p-8 shadow-lg text-white max-w-4xl mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 
                className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Transformer Votre Entreprise avec Soft FS
              </motion.h3>
              <motion.p 
                className="mb-6 max-w-2xl mx-auto opacity-90 text-sm sm:text-base lg:text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Rejoignez des centaines de clients satisfaits qui ont choisi Soft FS pour accélérer 
                leur parcours de transformation numérique. Discutons de votre projet aujourd'hui.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.button 
                  onClick={() => router.push('/Contact')}
                  className="bg-white text-blue-700 hover:bg-gray-100 px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition-colors whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Demander un Devis
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      <Footer />
    </div>
  )
}
