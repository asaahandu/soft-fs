'use client';
import { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  User, 
  MessageSquare, 
  Briefcase, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Eye,
  EyeOff,
  Star,
  Clock,
  Shield,
  X
} from 'lucide-react';

const ServiceForm = ({ onClose }) => {
  const { createRequest } = useServiceRequests();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formProgress, setFormProgress] = useState(0);
  const [showFormTips, setShowFormTips] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Available services with enhanced metadata
  const serviceOptions = [
    { 
      value: 'web-development', 
      label: 'Développement Web',
      icon: '🌐',
      description: 'Sites web modernes et applications'
    },
    { 
      value: 'graphic-design', 
      label: 'Design Graphique',
      icon: '🎨',
      description: 'Identité visuelle et créations'
    },
    { 
      value: 'mobile-development', 
      label: 'Développement d\'Applications Mobiles',
      icon: '📱',
      description: 'Apps iOS et Android natives'
    },
    { 
      value: 'serigraphie', 
      label: 'Serigraphie & Impression Numérique',
      icon: '🖨️',
      description: 'Impression professionnelle'
    },
    { 
      value: 'photography', 
      label: 'Photographie & Vidéographie',
      icon: '📸',
      description: 'Contenu visuel de qualité'
    },
    { 
      value: 'network-support', 
      label: 'Réseau informatique & Support utilisateur',
      icon: '🔧',
      description: 'Infrastructure et maintenance'
    },
    { 
      value: 'system-audit', 
      label: 'Audit des Systèmes d\'Information & Fourniture informatiques',
      icon: '🔍',
      description: 'Analyse et optimisation'
    },
    { 
      value: 'other', 
      label: 'Autre service',
      icon: '💼',
      description: 'Projet personnalisé'
    }
  ];

  // Form validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Le nom est requis';
        if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères';
        if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) return 'Le nom ne peut contenir que des lettres';
        return '';
      case 'email':
        if (!value.trim()) return 'L\'email est requis';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Format d\'email invalide';
        return '';
      case 'phone':
        if (!value.trim()) return 'Le téléphone est requis';
        if (!/^[\+]?[\d\s\-\(\)]{8,15}$/.test(value)) return 'Format de téléphone invalide';
        return '';
      case 'serviceType':
        if (!value) return 'Veuillez sélectionner un service';
        return '';
      case 'message':
        if (!value.trim()) return 'La description est requise';
        if (value.trim().length < 10) return 'La description doit contenir au moins 10 caractères';
        if (value.trim().length > 1000) return 'La description ne doit pas dépasser 1000 caractères';
        return '';
      default:
        return '';
    }
  };

  // Calculate form completion progress
  useEffect(() => {
    const fields = ['name', 'email', 'phone', 'serviceType', 'message'];
    const completedFields = fields.filter(field => {
      const value = formData[field];
      return value && value.toString().trim() !== '' && !validateField(field, value);
    });
    setFormProgress((completedFields.length / fields.length) * 100);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleFieldBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleFieldFocus = (fieldName) => {
    // Optional: Add field-specific tips when focused
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(Object.keys(formData).reduce((acc, field) => ({ ...acc, [field]: true }), {}));
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitError(null);

    try {
      // Submit to Firebase via our API
      const result = await createRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.serviceType,
        message: formData.message
      });

      console.log('Service request created:', result);
      setIsSubmitted(true);
      
      // Reset form after 5 seconds (longer to read success message)
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: '',
          message: ''
        });
        setTouched({});
        setErrors({});
        setFormProgress(0);
        setSubmitError(null);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error.message || 'Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-lg mx-auto">
        {/* Success Animation Container */}
        <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-100 relative overflow-hidden">
          {/* Close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors group"
            >
              <X className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
            </button>
          )}
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-100 to-transparent rounded-bl-full opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-eduka-blue/10 to-transparent rounded-tr-full"></div>
          
          <div className="text-center relative z-10">
            {/* Animated success icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
              <CheckCircle className="w-8 h-8 text-white animate-bounce" />
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Demande envoyée avec succès ! ✨
            </h3>
            
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Merci <strong className="text-eduka-blue">{formData.name}</strong> pour votre confiance ! 
              Notre équipe analyse votre projet et vous contactera très prochainement.
            </p>

            {/* Service selected confirmation */}
            {formData.serviceType && (
              <div className="bg-eduka-blue/5 border border-eduka-blue/20 rounded-lg p-3 mb-4">
                <p className="text-eduka-blue font-medium flex items-center justify-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 flex-shrink-0" />
                  <span>Service : {serviceOptions.find(s => s.value === formData.serviceType)?.label}</span>
                </p>
              </div>
            )}

            {/* What's next section */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <Clock className="w-5 h-5 text-eduka-blue mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-800">Analyse</p>
                <p className="text-xs text-gray-600">2-4h</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <Phone className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-800">Contact</p>
                <p className="text-xs text-gray-600">24-48h</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <Star className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-800">Devis</p>
                <p className="text-xs text-gray-600">48-72h</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-eduka-blue/10 to-eduka-teal/10 border border-eduka-blue/20 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-eduka-blue flex-shrink-0" />
                <p className="text-eduka-blue font-bold text-sm">Engagement qualité</p>
              </div>
              <p className="text-gray-700 text-xs text-center">
                Devis gratuit • Sans engagement • Réponse sous 48h
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 relative overflow-hidden">
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors group"
          >
            <X className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
          </button>
        )}
        
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-eduka-blue/5 to-transparent rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-eduka-teal/5 to-transparent rounded-tr-full"></div>
        
        <div className="relative z-10 p-4 sm:p-6">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-700 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              Demande de <span className="text-eduka-blue">Service</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Obtenez un devis personnalisé et gratuit
            </p>
            
            {/* Progress bar */}
            <div className="mt-3 max-w-xs mx-auto">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Progression</span>
                <span className="font-bold text-eduka-blue">{Math.round(formProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-eduka-blue to-eduka-blue-dark h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${formProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Form tips toggle */}
            <button
              type="button"
              onClick={() => setShowFormTips(!showFormTips)}
              className="mt-2 text-eduka-blue hover:text-eduka-blue-dark transition-colors text-xs font-medium flex items-center gap-1 mx-auto px-2 py-1 rounded hover:bg-blue-50"
            >
              {showFormTips ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              <span>{showFormTips ? 'Masquer conseils' : 'Conseils'}</span>
            </button>

            {showFormTips && (
              <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3 text-left">
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Soyez précis dans la description</li>
                  <li>• Mentionnez délais et budget</li>
                  <li>• Indiquez vos références</li>
                </ul>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Name Field */}
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4" />
                Nom complet *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`w-4 h-4 transition-colors ${
                    errors.name ? 'text-red-400' : 
                    touched.name && !errors.name ? 'text-green-400' : 
                    'text-gray-400 group-hover:text-eduka-blue'
                  }`} />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  onFocus={() => handleFieldFocus('name')}
                  className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-lg bg-white transition-all duration-300 text-sm ${
                    errors.name 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : touched.name && !errors.name
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-100'
                        : 'border-gray-200 focus:border-eduka-blue focus:ring-eduka-blue/10 hover:border-gray-300'
                  } focus:outline-none focus:ring-2 placeholder-gray-400`}
                  placeholder="Ex: Jean Baptiste Dupont"
                />
                {touched.name && !errors.name && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                )}
              </div>
              {errors.name && (
                <div className="flex items-start gap-2 text-red-600 text-xs">
                  <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Adresse email *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`w-4 h-4 transition-colors ${
                    errors.email ? 'text-red-400' : 
                    touched.email && !errors.email ? 'text-green-400' : 
                    'text-gray-400 group-hover:text-eduka-blue'
                  }`} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  onFocus={() => handleFieldFocus('email')}
                  className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-lg bg-white transition-all duration-300 text-sm ${
                    errors.email 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : touched.email && !errors.email
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-100'
                        : 'border-gray-200 focus:border-eduka-blue focus:ring-eduka-blue/10 hover:border-gray-300'
                  } focus:outline-none focus:ring-2 placeholder-gray-400`}
                  placeholder="votre@email.com"
                />
                {touched.email && !errors.email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                )}
              </div>
              {errors.email && (
                <div className="flex items-start gap-2 text-red-600 text-xs">
                  <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-1">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Numéro de téléphone *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className={`w-4 h-4 transition-colors ${
                    errors.phone ? 'text-red-400' : 
                    touched.phone && !errors.phone ? 'text-green-400' : 
                    'text-gray-400 group-hover:text-eduka-blue'
                  }`} />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  onFocus={() => handleFieldFocus('phone')}
                  className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-lg bg-white transition-all duration-300 text-sm ${
                    errors.phone 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : touched.phone && !errors.phone
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-100'
                        : 'border-gray-200 focus:border-eduka-blue focus:ring-eduka-blue/10 hover:border-gray-300'
                  } focus:outline-none focus:ring-2 placeholder-gray-400`}
                  placeholder="+237 6XX XXX XXX"
                />
                {touched.phone && !errors.phone && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                )}
              </div>
              {errors.phone && (
                <div className="flex items-start gap-2 text-red-600 text-xs">
                  <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>

            {/* Service Type Field */}
            <div className="space-y-1">
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Type de service *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Briefcase className={`w-4 h-4 transition-colors ${
                    errors.serviceType ? 'text-red-400' : 
                    touched.serviceType && !errors.serviceType ? 'text-green-400' : 
                    'text-gray-400 group-hover:text-eduka-blue'
                  }`} />
                </div>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  onFocus={() => handleFieldFocus('serviceType')}
                  className={`w-full pl-10 pr-10 py-2.5 border-2 rounded-lg bg-white transition-all duration-300 appearance-none text-sm ${
                    errors.serviceType 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : touched.serviceType && !errors.serviceType
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-100'
                        : 'border-gray-200 focus:border-eduka-blue focus:ring-eduka-blue/10 hover:border-gray-300'
                  } focus:outline-none focus:ring-2`}
                >
                  <option value="">Choisissez un service...</option>
                  {serviceOptions.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.icon} {service.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {touched.serviceType && !errors.serviceType ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-eduka-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
              </div>
              {errors.serviceType && (
                <div className="flex items-start gap-2 text-red-600 text-xs">
                  <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  <span>{errors.serviceType}</span>
                </div>
              )}
              {formData.serviceType && !errors.serviceType && (
                <div className="bg-eduka-blue/5 border border-eduka-blue/20 rounded-lg p-2">
                  <p className="text-xs text-eduka-blue">
                    <span>{serviceOptions.find(s => s.value === formData.serviceType)?.icon}</span> {' '}
                    <span className="font-medium">
                      {serviceOptions.find(s => s.value === formData.serviceType)?.description}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-1">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Décrivez votre projet *
              </label>
              <div className="relative group">
                <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                  <MessageSquare className={`w-4 h-4 transition-colors ${
                    errors.message ? 'text-red-400' : 
                    touched.message && !errors.message ? 'text-green-400' : 
                    'text-gray-400 group-hover:text-eduka-blue'
                  }`} />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  onFocus={() => handleFieldFocus('message')}
                  rows={4}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-white transition-all duration-300 resize-none text-sm ${
                    errors.message 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : touched.message && !errors.message
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-100'
                        : 'border-gray-200 focus:border-eduka-blue focus:ring-eduka-blue/10 hover:border-gray-300'
                  } focus:outline-none focus:ring-2 placeholder-gray-400`}
                  placeholder="Décrivez votre projet : objectifs, délais, budget approximatif, références..."
                />
                {touched.message && !errors.message && (
                  <div className="absolute top-3 right-0 pr-3 flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between text-xs">
                {errors.message ? (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{errors.message}</span>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    💡 Plus vous êtes détaillé, meilleur sera le devis
                  </p>
                )}
                <span className={`font-mono px-2 py-1 rounded ${
                  formData.message.length > 1000 ? 'bg-red-100 text-red-600' :
                  formData.message.length > 800 ? 'bg-yellow-100 text-yellow-600' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {formData.message.length}/1000
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting || Object.keys(errors).some(key => errors[key])}
                className="w-full bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 relative overflow-hidden group"
              >
                <div className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                      <span>Envoyer ma demande</span>                    
                    </>
                  )}
                </div>
              </button>
              
              {/* Submit error display */}
              {submitError && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-start gap-2 text-red-800 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                </div>
              )}
              
              {/* Form validation summary */}
              {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-start gap-2 text-red-800 font-medium mb-2 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Veuillez corriger les erreurs suivantes :</span>
                  </div>
                  <ul className="text-xs text-red-700 space-y-1">
                    {Object.entries(errors).map(([field, error]) => error && (
                      <li key={field} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0 mt-2"></div>
                        <span>{error}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>


    </div>
  );
};

export default ServiceForm;