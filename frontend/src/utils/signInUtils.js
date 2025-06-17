import { signIn } from '../api';
import { showErrorToast, showSuccessToast } from './toastUtils';

export const signin = async (data2, navigate, setLoading) => {
  try {
    setLoading(true);
    const { data } = await signIn(data2);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.result?._id);
    showSuccessToast('Sign in successfully');

    navigate('/dashboard');
    setLoading(false);
  } catch (err) {
    console.log(err);
    showErrorToast('Failed to sign in');
  }
};
