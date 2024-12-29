import React, { useState } from 'react';
import OnboardingComplete from './OnboardingComplete';
import OnboardingForm from './OnboardingForm';

const Onboarding = () => {
  const [showForm, setShowForm] = useState(true);

  return (
    <div>
      <h1>Onboarding</h1>
      {showForm ? (
        <OnboardingForm toggleView={() => setShowForm(false)} />
      ) : (
        <OnboardingComplete />
      )}
    </div>
  );
};

export default Onboarding;
