import React, { useState } from 'react';
import { Phone, Send, Calendar, Shield, Truck, Settings } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    location: '',
    businessName: '',
    solutions: [] as string[],
    helpWith: '' // Changed to string for single selection
  });

  const [errors, setErrors] = useState({
    email: '',
    solutions: '',
    helpWith: '',
    businessName: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear email error when user starts typing
    if (name === 'email' && errors.email) {
      setErrors(prev => ({
        ...prev,
        email: ''
      }));
    }

    // Clear business name error when user starts typing
    if (name === 'businessName' && errors.businessName) {
      setErrors(prev => ({
        ...prev,
        businessName: ''
      }));
    }
  };

  const handleSolutionChange = (solution: string) => {
    const newSolutions = formData.solutions.includes(solution)
      ? formData.solutions.filter(s => s !== solution)
      : [...formData.solutions, solution];
    
    setFormData(prev => ({
      ...prev,
      solutions: newSolutions
    }));

    // Clear solutions error when user makes a selection
    if (newSolutions.length > 0 && errors.solutions) {
      setErrors(prev => ({
        ...prev,
        solutions: ''
      }));
    }
  };

  const handleHelpWithChange = (option: string) => {
    setFormData(prev => ({
      ...prev,
      helpWith: option
    }));

    // Clear helpWith error when user makes a selection
    if (errors.helpWith) {
      setErrors(prev => ({
        ...prev,
        helpWith: ''
      }));
    }
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (email && !validateEmail(email)) {
      setErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email address (e.g., example@domain.com)'
      }));
    }
  };

  // Check if location and solutions fields should be shown
  const shouldShowLocationAndSolutions = formData.helpWith === 'location-assessment' || formData.helpWith === 'general-inquiry';

  // Dynamic message text based on selection
  const getMessageLabel = () => {
    if (formData.helpWith === 'other') {
      return 'What brings you by today?';
    }
    return 'Providing a few more details about your location and convenience needs will help us tailor the perfect solution for you.';
  };

  // Generate dynamic subject line
  const generateSubjectLine = () => {
    const parts = [];
    
    if (formData.name.trim()) {
      parts.push(formData.name.trim());
    }
    
    if (formData.helpWith) {
      const helpWithLabels = {
        'location-assessment': 'Location Assessment',
        'general-inquiry': 'General Inquiry',
        'other': 'Other'
      };
      parts.push(helpWithLabels[formData.helpWith as keyof typeof helpWithLabels] || formData.helpWith);
    }
    
    if (shouldShowLocationAndSolutions && formData.businessName.trim()) {
      parts.push(formData.businessName.trim());
    }
    
    if (shouldShowLocationAndSolutions && formData.solutions.length > 0) {
      parts.push(formData.solutions.join(', '));
    }
    
    return parts.length > 0 ? parts.join(' - ') : 'New Contact Form Submission';
  };

  const encode = (data: Record<string, any>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasErrors = false;
    const newErrors = { email: '', solutions: '', helpWith: '', businessName: '' };

    // Validate email before submission
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., example@domain.com)';
      hasErrors = true;
    }

    // Validate helpWith selection
    if (!formData.helpWith) {
      newErrors.helpWith = 'Please select an option for how we can help you';
      hasErrors = true;
    }

    // Validate solutions selection only if location/solutions fields should be shown
    if (shouldShowLocationAndSolutions && formData.solutions.length === 0) {
      newErrors.solutions = 'Please select at least one solution you are interested in';
      hasErrors = true;
    }

    // Validate business name only if location/solutions fields should be shown
    if (shouldShowLocationAndSolutions) {
      if (!formData.businessName.trim()) {
        newErrors.businessName = 'Please enter your business name';
        hasErrors = true;
      } else if (formData.businessName.trim().length < 3) {
        newErrors.businessName = 'Business name must be at least 3 characters long';
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // Clear any existing errors
    setErrors({ email: '', solutions: '', helpWith: '', businessName: '' });
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Prepare form data for Netlify with dynamic subject
      const submitData = {
        'form-name': 'contact',
        'subject': generateSubjectLine(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        location: formData.location,
        businessName: formData.businessName,
        solutions: formData.solutions.join(', '),
        helpWith: formData.helpWith
      };

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(submitData)
      });

      if (response.ok) {
        setSubmitMessage('Thanks for your message! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          location: '',
          businessName: '',
          solutions: [],
          helpWith: ''
        });
        
        // Scroll to top on mobile after successful submission
        if (window.innerWidth < 768) {
          setTimeout(() => {
            scrollToTop();
          }, 100);
        }
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const solutionOptions = [
    { value: 'smart-store', label: 'Smart Store' },
    { value: 'micro-market', label: 'Micro Market' },
    { value: 'smart-traditional-vending', label: 'Smart Traditional Vending' }
  ];

  const helpWithOptions = [
    { value: 'location-assessment', label: 'Location Assessment' },
    { value: 'general-inquiry', label: 'General Inquiry About Solutions' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-mint">Get in</span> <span className="text-coral">Touch</span>
          </h2>
          <p className="text-lg text-lavender/80 max-w-3xl mx-auto">
            At Smart Market Retail, we make it easy to enhance your property with fresh, 24/7 convenience—at no cost to you. From the first conversation to ongoing support, we handle everything so you don’t have to.
          </p>
        
          <p className="text-lg text-peach/90 max-w-3xl mx-auto">
            Let’s Bring Smarter Vending to Your Space
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <div className="backdrop-blur-sm p-6 md:p-8 rounded-lg border border-mint/20">
              <h3 className="text-2xl font-semibold text-mint mb-6">
	              <span className="text-mint">Our Process and</span> <span className="text-coral">Commitment</span>
              </h3>
              <div className="space-y-8">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-coral mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-mint mb-2">Get in Touch</h3>
                    <p className="text-peach/80 leading-relaxed">
                      Fill out the form or contact us directly at <a href="tel:+14102205652" className="text-mint hover:text-coral transition-colors font-semibold">(410) 220-5652</a> to start the conversation.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="h-6 w-6 text-coral mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-mint mb-2">Free On-Site Consultation</h3>
                    <p className="text-peach/80 leading-relaxed">
                      We'll schedule a convenient time to visit your location, assess your needs, and recommend the best Unattended Retail solution.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-coral mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-mint mb-2">Zero-Risk, No-Contract Guarantee</h3>
                    <p className="text-peach/80 leading-relaxed">
                      We earn your business with great service—not long-term contracts. Cancel anytime if you're not completely satisfied. No penalties, no pressure.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Truck className="h-6 w-6 text-coral mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-mint mb-2">Free Delivery & Setup</h3>
                    <p className="text-peach/80 leading-relaxed">
                      We install our Smart Stores, Micro Markets, or Smart Traditional Vending at zero cost to you—including setup, stocking, and tech integration.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Settings className="h-6 w-6 text-coral mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-mint mb-2">Full-Service Maintenance</h3>
                    <p className="text-peach/80 leading-relaxed">
                      We manage inventory, restocking, and repairs through remote monitoring. If anything goes wrong, we're on-site fast—usually the same day.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-mint/20 text-center">
                <p className="text-lg text-lavender/80 mb-4 leading-relaxed">
                  Smart Market Retail is here to serve your team, guests, or tenants—efficiently, reliably, and risk-free.
                </p>
                <p className="text-xl font-semibold text-coral">
                  Ready to get started? Contact us today!
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <form 
              onSubmit={handleSubmit} 
              className="backdrop-blur-sm p-6 md:p-8 rounded-lg border border-mint/20" 
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              {/* Hidden fields for Netlify */}
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="subject" value={generateSubjectLine()} />
              <input type="hidden" name="bot-field" />
              
              {/* Submit message */}
              {submitMessage && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitMessage.includes('Thanks') 
                    ? 'bg-mint/20 text-mint border border-mint/40' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/40'
                }`}>
                  {submitMessage}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-mint mb-2">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-navy/50 border border-mint/20 rounded-lg focus:ring-2 focus:ring-mint focus:border-transparent text-peach placeholder-peach/50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-mint mb-2">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="Please enter a valid email address (e.g., example@domain.com)"
                    className={`w-full px-4 py-2 bg-navy/50 border rounded-lg focus:ring-2 focus:ring-mint focus:border-transparent text-peach placeholder-peach/50 ${
                      errors.email ? 'border-red-500' : 'border-mint/20'
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-mint mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-navy/50 border border-mint/20 rounded-lg focus:ring-2 focus:ring-mint focus:border-transparent text-peach placeholder-peach/50"
                  />
                </div>
                <div>
                  <label className="block text-mint mb-3">
                    How can we help you today? *
                  </label>
                  <div className="space-y-3">
                    {helpWithOptions.map((option) => (
                      <label key={option.value} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="helpWith"
                          value={option.value}
                          checked={formData.helpWith === option.value}
                          onChange={() => handleHelpWithChange(option.value)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 border-2 rounded-full mr-3 flex items-center justify-center transition-all ${
                          formData.helpWith === option.value
                            ? 'bg-mint border-mint'
                            : errors.helpWith 
                            ? 'border-red-500 group-hover:border-red-400'
                            : 'border-mint/40 group-hover:border-mint/60'
                        }`}>
                          {formData.helpWith === option.value && (
                            <div className="w-2 h-2 bg-navy rounded-full"></div>
                          )}
                        </div>
                        <span className={`text-peach transition-colors text-sm ${
                          formData.helpWith === option.value ? 'text-mint' : 'group-hover:text-mint'
                        }`}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.helpWith && (
                    <p className="text-red-400 text-sm mt-2">{errors.helpWith}</p>
                  )}
                </div>
              </div>

              {/* Conditionally show Location Type field */}
              {shouldShowLocationAndSolutions && (
                <div className="mb-6">
                  <label htmlFor="location" className="block text-mint mb-2">Location Type *</label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-navy/50 border border-mint/20 rounded-lg focus:ring-2 focus:ring-mint focus:border-transparent text-peach placeholder-peach/50"
                    required={shouldShowLocationAndSolutions}
                  >
                    <option value="">Select a location type</option>
                    <option value="office">Office Buildings</option>
                    <option value="education">Colleges and Universities</option>
                    <option value="healthcare">Healthcare Facilities</option>
                    <option value="dealership">Car Dealerships & Auto Shops</option>
                    <option value="sports">Sports & Fitness Centers</option>
                    <option value="hotel">Hotels & Motels</option>
                    <option value="senior">Senior Living</option>
                    <option value="highschool">High Schools</option>
                    <option value="warehouse">Warehouse & Distribution</option>
                    <option value="apartments">Mid & High-Rise Apartments</option>
                    <option value="construction">Construction Sites</option>
                    <option value="other">Other High Traffic Location</option>
                  </select>
                </div>
              )}

              {/* Conditionally show Business Name field */}
              {shouldShowLocationAndSolutions && (
                <div className="mb-6">
                  <label htmlFor="businessName" className="block text-mint mb-2">Business Name *</label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    minLength={3}
                    className={`w-full px-4 py-2 bg-navy/50 border rounded-lg focus:ring-2 focus:ring-mint focus:border-transparent text-peach placeholder-peach/50 ${
                      errors.businessName ? 'border-red-500' : 'border-mint/20'
                    }`}
                    placeholder="Enter your business name"
                    required={shouldShowLocationAndSolutions}
                  />
                  {errors.businessName && (
                    <p className="text-red-400 text-sm mt-1">{errors.businessName}</p>
                  )}
                </div>
              )}

              {/* Conditionally show Solutions field */}
              {shouldShowLocationAndSolutions && (
                <div className="mb-6">
                  <label className="block text-mint mb-3">
                    Which of our Unattended Retail solutions are you considering for your location? *
                  </label>
                  <div className="space-y-3">
                    {solutionOptions.map((option) => (
                      <label key={option.value} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          name="solutions"
                          value={option.value}
                          checked={formData.solutions.includes(option.value)}
                          onChange={() => handleSolutionChange(option.value)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center transition-all ${
                          formData.solutions.includes(option.value)
                            ? 'bg-mint border-mint'
                            : errors.solutions 
                            ? 'border-red-500 group-hover:border-red-400'
                            : 'border-mint/40 group-hover:border-mint/60'
                        }`}>
                          {formData.solutions.includes(option.value) && (
                            <svg className="w-3 h-3 text-navy" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-peach transition-colors ${
                          formData.solutions.includes(option.value) ? 'text-mint' : 'group-hover:text-mint'
                        }`}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.solutions && (
                    <p className="text-red-400 text-sm mt-2">{errors.solutions}</p>
                  )}
                  <p className="text-peach/60 text-sm mt-2">Select all that apply</p>
                </div>
              )}
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-mint mb-2">{getMessageLabel()}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-navy/50 border border-mint/20 rounded-lg focus:ring-2 focus:ring-mint focus:border-transparent text-peach placeholder-peach/50"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-pastel text-navy px-6 py-3 rounded-full font-semibold hover:shadow-neon transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} 
                {!isSubmitting && <Send size={18} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;