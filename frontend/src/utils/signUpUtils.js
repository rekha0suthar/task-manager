import { signUp } from '../api';
import { showErrorToast, showSuccessToast } from './toastUtils';

export const signup = async (formData, navigate, setLoading) => {
  try {
    setLoading(true);
    await signUp(formData);
    showSuccessToast('Sign up successfully');

    navigate('/');
    setLoading(false);
  } catch (err) {
    console.log(err);
    showErrorToast('Failed to sign up');
  }
};

export const isValidForm = (formData) => {
  const { firstName, lastName, email, password, confirmPassword } = formData;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    alert('Please fill all fields');
    return false;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return false;
  }

  if (password.length < 4) {
    alert('Password must be at least 4 characters');
    return false;
  }

  return true;
};
