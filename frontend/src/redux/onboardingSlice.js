import { createSlice } from '@reduxjs/toolkit';

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: { completed: false },
  reducers: {
    completeOnboarding: (state) => {
      state.completed = true;
    },
  },
});

export const { completeOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;
