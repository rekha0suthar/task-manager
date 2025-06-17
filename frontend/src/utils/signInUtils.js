import { signInApi } from '../api';
import { showErrorToast, showSuccessToast } from './toastUtils';

export const signin = async (user_credentails, navigate, setLoading) => {
  try {
    setLoading(true);
    const { data } = await signInApi(user_credentails);
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
