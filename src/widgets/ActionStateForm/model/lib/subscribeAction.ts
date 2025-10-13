import type { FormState } from '../types';

export const subscribeAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const email = formData.get('email') as string;

  await new Promise(resolve => setTimeout(resolve, 5000));

  if (!email) {
    return {
      ...prevState,
      success: false,
      error: 'Email is required',
      step: 1,
    };
  }

  if (!email.includes('@')) {
    return {
      ...prevState,
      success: false,
      error: 'Please enter a valid email address.',
      step: 1,
    };
  }

  const currentStep = parseInt(formData.get('step') as string) || 1;

  if (currentStep === 1) {
    return {
      ...prevState,
      success: false,
      error: null,
      step: 2,
    };
  }

  return {
    success: true,
    message: `Subscription for ${email} successfully completed!`,
    error: null,
    step: 2,
  };
};
