import React, { useState } from 'react';
import { Users, Coffee, Building, Building2, MapPin, Utensils, ShoppingBag, Leaf, CreditCard, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

// NOTE: Since this is a self-contained component, the 'Link' component from react-router-dom
// has been replaced with a standard anchor tag '<a>'. In a full React application,
// you would use the Link component as you had before.
// import { Link } from 'react-router-dom';

interface QuizState {
  currentStep: number;
  teamSize: string;
  spaceType: string;
  preferences: string[];
  completed: boolean;
}

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, index) => (
        <React.Fragment key={index}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
            index + 1 <= currentStep ? 'bg-mint text-navy' : 'bg-navy/40 border-2 border-mint/30 text-lavender/60'
          }`}>
            {index + 1 <= currentStep ? <CheckCircle2 size={16} /> : index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div className={`w-12 h-1 mx-2 transition-all duration-300 ${
              index + 1 < currentStep ? 'bg-mint' : 'bg-mint/20'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const BreakroomBuilder: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentStep: 1,
    teamSize: '',
    spaceType: '',
    preferences: [],
    completed: false
  });

  const teamSizeOptions = [
    { value: '1-25', label: '1-25 Employees', icon: <Users size={24} /> },
    { value: '26-75', label: '26-75 Employees', icon: <Users size={28} /> },
    { value: '76-150', label: '76-150 Employees', icon: <Users size={32} /> },
    { value: '150+', label: '150+ Employees', icon: <Users size={36} /> }
  ];

  const spaceOptions = [
    { value: 'corner', label: 'Small Corner', description: 'Limited space in a corner or hallway', icon: <Coffee size={32} /> },
    { value: 'room', label: 'Dedicated Room', description: 'A dedicated break room or kitchen area', icon: <Building size={32} /> },
    { value: 'large', label: 'Large Area', description: 'Spacious area for multiple solutions', icon: <Building2 size={32} /> },
    { value: 'corridor', label: 'Building Corridor', description: 'Hallway or corridor space with foot traffic', icon: <MapPin size={32} /> },
    { value: 'lobby', label: 'Lobby Space', description: 'Open lobby or entrance area', icon: <Building size={32} /> },
    { value: 'dedicated', label: 'Dedicated Space', description: 'Specifically designated breakroom space', icon: <Building2 size={32} /> }
  ];

  const preferenceOptions = [
    { value: 'healthy', label: 'Healthy Meals & Snacks', icon: <Leaf size={24} /> },
    { value: 'coffee', label: 'Gourmet Coffee & Beverages', icon: <Coffee size={24} /> },
    { value: 'classic', label: 'Classic Snacks & Treats', icon: <ShoppingBag size={24} /> },
    { value: 'fresh', label: 'Fresh Food Options', icon: <Utensils size={24} /> },
    { value: 'payment', label: 'Payment Flexibility', icon: <CreditCard size={24} /> }
  ];

  /**
   * Determines all recommended breakroom solutions based on user's quiz answers.
   * The logic checks against predefined rules for different products and collects all matches.
   * @returns An array of objects, each with a title and description of a recommended solution.
   */
  const getRecommendations = () => {
    const { teamSize, spaceType, preferences } = quizState;
    const recommendations = [];

    // Helper function to check if any of the user's preferences match a given list.
    // Returns true if there are no preferences selected, as they are optional.
    const checkPreferences = (validPreferences: string[]) => {
        if (preferences.length === 0) return true;
        return preferences.some(p => validPreferences.includes(p));
    };

    // Rule for Smart Store 700
    if (
        ['76-150', '150+'].includes(teamSize) &&
        ['corridor', 'large', 'dedicated'].includes(spaceType) &&
        checkPreferences(['healthy', 'fresh', 'payment', 'classic', 'coffee'])
    ) {
        recommendations.push({ title: 'Smart Store 700', description: 'Our largest and most advanced smart store, perfect for large teams in high-traffic areas. Offers a wide variety of fresh food, snacks, and gourmet coffee.' });
    }

    // Rule for Micro Market
    if (
        ['26-75', '76-150', '150+'].includes(teamSize) &&
        ['room', 'dedicated'].includes(spaceType) &&
        checkPreferences(['healthy', 'fresh', 'payment', 'classic', 'coffee'])
    ) {
        recommendations.push({ title: 'Micro Market', description: 'Transform your dedicated breakroom into a self-serve market. Ideal for medium to large teams, offering fresh food, healthy choices, and classic snacks.' });
    }

    // Rule for Smart Store 600
    if (
        ['1-25', '26-75', '76-150'].includes(teamSize) &&
        ['lobby', 'dedicated'].includes(spaceType) &&
        checkPreferences(['healthy', 'fresh', 'payment', 'classic', 'coffee'])
    ) {
        recommendations.push({ title: 'Smart Store 600', description: 'A versatile smart store solution for small to medium teams. Fits well in lobbies or dedicated spaces, providing a premium experience with diverse options.' });
    }
    
    // Rule for Smart Coolers
    if (
        ['1-25', '26-75', '76-150'].includes(teamSize) &&
        ['corner', 'room', 'corridor', 'dedicated'].includes(spaceType) &&
        checkPreferences(['healthy', 'fresh', 'payment', 'classic'])
    ) {
        recommendations.push({ title: 'Smart Coolers', description: 'A flexible solution that brings fresh and healthy options to any space. Great for small to medium teams who prioritize wellness and convenience.' });
    }

    // Rule for Smart Traditional Vending
    if (
        ['1-25', '26-75', '76-150', '150+'].includes(teamSize) &&
        ['corner', 'corridor'].includes(spaceType) &&
        checkPreferences(['classic'])
    ) {
        recommendations.push({ title: 'Smart Traditional Vending', description: 'Modern vending machines with reliable service and classic snack options. A great fit for any team size where space is limited.' });
    }

    // Fallback recommendation if no specific rules match
    if (recommendations.length === 0) {
        recommendations.push({ title: 'Custom Solution', description: "Your needs are unique! Let's build a custom breakroom solution that's a perfect fit for your team and space." });
    }

    return recommendations;
  };


  const handleNext = () => {
    if (quizState.currentStep < 3) {
      setQuizState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    } else {
      setQuizState(prev => ({ ...prev, completed: true }));
    }
  };

  const handlePrev = () => {
    if (quizState.currentStep > 1) {
      setQuizState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const handleTeamSizeChange = (value: string) => {
    setQuizState(prev => ({ ...prev, teamSize: value }));
  };

  const handleSpaceTypeChange = (value: string) => {
    setQuizState(prev => ({ ...prev, spaceType: value }));
  };

  const handlePreferenceChange = (value: string) => {
    setQuizState(prev => ({
      ...prev,
      preferences: prev.preferences.includes(value)
        ? prev.preferences.filter(p => p !== value)
        : [...prev.preferences, value]
    }));
  };

  const canProceed = () => {
    switch (quizState.currentStep) {
      case 1: return quizState.teamSize !== '';
      case 2: return quizState.spaceType !== '';
      case 3: return true; // Preferences are optional
      default: return false;
    }
  };

  if (quizState.completed) {
    const recommendations = getRecommendations();
    return (
      <section className="py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-elegant">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="text-mint">Your Perfect</span>{' '}
                  <span className="text-coral">Breakroom Solution{recommendations.length > 1 ? 's' : ''}</span>
                </h2>
                <p className="text-lavender/80">
                  Based on your responses, we recommend the following solution{recommendations.length > 1 ? 's' : ''} for your team.
                </p>
              </div>

              <div className="space-y-8 mb-8">
                {recommendations.map((rec, index) => (
                  <div key={index} className={index < recommendations.length - 1 ? "pb-8 border-b border-mint/20" : ""}>
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-mint mb-3">{rec.title}</h3>
                      <p className="text-lavender/80 max-w-2xl mx-auto">{rec.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8 pt-8 border-t border-mint/20">
                <div className="text-center">
                  <div className="text-mint mb-2 font-semibold">Team Size</div>
                  <div className="text-coral font-bold text-lg">{quizState.teamSize} Employees</div>
                </div>
                <div className="text-center">
                  <div className="text-mint mb-2 font-semibold">Space Type</div>
                  <div className="text-coral font-bold text-lg">
                    {spaceOptions.find(opt => opt.value === quizState.spaceType)?.label}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-mint mb-2 font-semibold">Preferences</div>
                  <div className="text-coral font-bold text-lg">{quizState.preferences.length} Selected</div>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="/contact"
                  className="btn-primary-interactive group mb-4 inline-flex items-center gap-2"
                >
                  Get a Personalized Quote
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </a>
                <div className="text-sm text-lavender/60">
                  Free consultation • No obligation • Quick response
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => setQuizState({
                  currentStep: 1,
                  teamSize: '',
                  spaceType: '',
                  preferences: [],
                  completed: false
                })}
                className="link-interactive"
              >
                Start Over
              </button>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-mint">Your Perfect</span>{' '}
                <span className="text-coral">Breakroom Solution{recommendations.length > 1 ? 's' : ''}</span>
              </h2>
              <p className="text-lavender/80">
                Based on your responses, here's what we recommend for your team.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {recommendations.map((rec, index) => (
                <div key={index} className="card-interactive bg-navy/40 border border-mint/20 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-mint mb-3 text-center">{rec.title}</h3>
                  <p className="text-lavender/80 text-center">{rec.description}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 mb-8">
              <div className="bg-navy/30 border border-mint/20 rounded-xl p-4 text-center">
                <div className="text-mint mb-1 font-semibold">Team Size</div>
                <div className="text-coral font-bold">{quizState.teamSize} Employees</div>
              </div>
              <div className="bg-navy/30 border border-mint/20 rounded-xl p-4 text-center">
                <div className="text-mint mb-1 font-semibold">Space Type</div>
                <div className="text-coral font-bold">
                  {spaceOptions.find(opt => opt.value === quizState.spaceType)?.label}
                </div>
              </div>
              <div className="bg-navy/30 border border-mint/20 rounded-xl p-4 text-center">
                <div className="text-mint mb-1 font-semibold">Preferences</div>
                <div className="text-coral font-bold">{quizState.preferences.length} Selected</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <a
                href="/contact"
                className="btn-primary-interactive group w-full inline-flex items-center justify-center gap-2"
              >
                Get a Personalized Quote
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </a>
              <div className="text-sm text-lavender/60">
                Free consultation • No obligation • Quick response
              </div>
              <button
                onClick={() => setQuizState({
                  currentStep: 1,
                  teamSize: '',
                  spaceType: '',
                  preferences: [],
                  completed: false
                })}
                className="link-interactive"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-elegant">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-mint">Build Your Perfect</span>{' '}
                <span className="text-coral">Breakroom</span>
              </h2>
              <p className="text-lavender/80">
                Answer a few quick questions to discover the ideal solution for your workplace.
              </p>
            </div>

            <StepIndicator currentStep={quizState.currentStep} totalSteps={3} />

            {/* Step 1: Team Size */}
            {quizState.currentStep === 1 && (
              <div>
                <h3 className="text-center text-2xl font-bold text-mint mb-8">What's your team size?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {teamSizeOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`card-interactive flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-interactive duration-300 hover:border-mint/70 ${
                        quizState.teamSize === option.value
                          ? 'border-mint bg-mint/10'
                          : 'border-mint/30 hover:bg-mint/5'
                      }`}
                    >
                      <input
                        type="radio"
                        name="teamSize"
                        value={option.value}
                        checked={quizState.teamSize === option.value}
                        onChange={(e) => handleTeamSizeChange(e.target.value)}
                        className="sr-only"
                      />
                      <div className="text-mint">
                        {option.icon}
                      </div>
                      <div className="text-lavender font-semibold">
                        {option.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Available Space */}
            {quizState.currentStep === 2 && (
              <div>
                <h3 className="text-center text-2xl font-bold text-mint mb-8">What space do you have available?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {spaceOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`card-interactive p-6 rounded-xl border-2 cursor-pointer transition-interactive duration-300 hover:border-mint/70 ${
                        quizState.spaceType === option.value
                          ? 'border-mint bg-mint/10'
                          : 'border-mint/30 hover:bg-mint/5'
                      }`}
                    >
                      <input
                        type="radio"
                        name="spaceType"
                        value={option.value}
                        checked={quizState.spaceType === option.value}
                        onChange={(e) => handleSpaceTypeChange(e.target.value)}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-mint mb-3 flex justify-center">
                          {option.icon}
                        </div>
                        <div className="text-lavender font-semibold mb-2">
                          {option.label}
                        </div>
                        <div className="text-lavender/70 text-sm">
                          {option.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Team Preferences */}
            {quizState.currentStep === 3 && (
              <div>
                <h3 className="text-center text-2xl font-bold text-mint mb-4">What does your team prefer?</h3>
                <p className="text-center text-lavender/70 mb-8 text-sm">
                  Select all that apply (optional)
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {preferenceOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`card-interactive flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-interactive duration-300 hover:border-mint/70 ${
                        quizState.preferences.includes(option.value)
                          ? 'border-mint bg-mint/10'
                          : 'border-mint/30 hover:bg-mint/5'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={quizState.preferences.includes(option.value)}
                        onChange={(e) => handlePreferenceChange(e.target.value)}
                        className="sr-only"
                      />
                      <div className="text-mint">
                        {option.icon}
                      </div>
                      <div className="text-lavender font-semibold">
                        {option.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-mint/20">
              <button
                onClick={handlePrev}
                disabled={quizState.currentStep === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-interactive duration-300 ${
                  quizState.currentStep === 1
                    ? 'text-lavender/40 cursor-not-allowed'
                    : 'btn-secondary-interactive'
                }`}
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              <div className="text-lavender/60 text-sm">
                Step {quizState.currentStep} of 3
              </div>

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2 transition-interactive duration-300 ${
                  canProceed()
                    ? 'btn-primary-interactive'
                    : 'px-6 py-3 rounded-full bg-navy/40 text-lavender/40 cursor-not-allowed'
                }`}
              >
                {quizState.currentStep === 3 ? 'Get Results' : 'Next'}
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-mint">Build Your Perfect</span>{' '}
              <span className="text-coral">Breakroom</span>
            </h2>
            <p className="text-lavender/80">
              Answer a few quick questions to discover the ideal solution for your workplace.
            </p>
          </div>

          <StepIndicator currentStep={quizState.currentStep} totalSteps={3} />

          {/* Step 1: Team Size - Mobile */}
          {quizState.currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-center text-xl font-bold text-mint mb-6">What's your team size?</h3>
              <div className="space-y-3">
                {teamSizeOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-interactive duration-300 ${
                      quizState.teamSize === option.value
                        ? 'border-mint bg-mint/10'
                        : 'border-mint/30 hover:bg-mint/5'
                    }`}
                  >
                    <input
                      type="radio"
                      name="teamSize"
                      value={option.value}
                      checked={quizState.teamSize === option.value}
                      onChange={(e) => handleTeamSizeChange(e.target.value)}
                      className="sr-only"
                    />
                    <div className="text-mint">
                      {option.icon}
                    </div>
                    <div className="text-lavender font-semibold">
                      {option.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Available Space - Mobile */}
          {quizState.currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-center text-xl font-bold text-mint mb-6">What space do you have available?</h3>
              <div className="space-y-3">
                {spaceOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-interactive duration-300 ${
                      quizState.spaceType === option.value
                        ? 'border-mint bg-mint/10'
                        : 'border-mint/30 hover:bg-mint/5'
                    }`}
                  >
                    <input
                      type="radio"
                      name="spaceType"
                      value={option.value}
                      checked={quizState.spaceType === option.value}
                      onChange={(e) => handleSpaceTypeChange(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-4">
                      <div className="text-mint">
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-lavender font-semibold mb-1">
                          {option.label}
                        </div>
                        <div className="text-lavender/70 text-sm">
                          {option.description}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Team Preferences - Mobile */}
          {quizState.currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-mint mb-2">What does your team prefer?</h3>
                <p className="text-lavender/70 text-sm">
                  Select all that apply (optional)
                </p>
              </div>
              <div className="space-y-3">
                {preferenceOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-interactive duration-300 ${
                      quizState.preferences.includes(option.value)
                        ? 'border-mint bg-mint/10'
                        : 'border-mint/30 hover:bg-mint/5'
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={quizState.preferences.includes(option.value)}
                      onChange={(e) => handlePreferenceChange(e.target.value)}
                      className="sr-only"
                    />
                    <div className="text-mint">
                      {option.icon}
                    </div>
                    <div className="text-lavender font-semibold">
                      {option.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Navigation - Mobile */}
          <div className="flex flex-col space-y-3 mt-8 pt-6 border-t border-mint/20">
            {/* Next button on top */}
            <div className="flex justify-center">
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2 transition-interactive duration-300 ${
                  canProceed()
                    ? 'btn-primary-interactive'
                    : 'px-6 py-3 rounded-full bg-navy/40 text-lavender/40 cursor-not-allowed'
                }`}
              >
                {quizState.currentStep === 3 ? 'Get Results' : 'Next'}
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Step indicator in middle */}
            <div className="text-center text-lavender/60 text-sm">
              Step {quizState.currentStep} of 3
            </div>

            {/* Previous button on bottom */}
            <div className="flex justify-center">
              <button
                onClick={handlePrev}
                disabled={quizState.currentStep === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-interactive duration-300 ${
                  quizState.currentStep === 1
                    ? 'text-lavender/40 cursor-not-allowed'
                    : 'text-mint hover:text-lavender hover:bg-mint/20'
                }`}
              >
                Previous
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreakroomBuilder;