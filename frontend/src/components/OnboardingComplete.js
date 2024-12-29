import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { completeOnboarding } from './redux/onboardingSlice';
import { Link } from 'react-router-dom';

const OnboardingComplete = () => {
  const onboardingCompleted = useSelector((state) => state.onboarding.completed);
  const dispatch = useDispatch();

  const handleComplete = () => {
    dispatch(completeOnboarding());
  };

  return (
    <div>
      {onboardingCompleted ? (
        <p>Onboarding is already completed!</p>
      ) : (
        <button onClick={handleComplete}>Mark as Completed</button>
      )}
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default OnboardingComplete;
