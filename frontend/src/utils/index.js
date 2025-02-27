import { signIn, signInGoogle, signUp, signUpGoogle } from '../api';
import toast from 'react-hot-toast';

export const signin = async (data2, navigate, setLoading) => {
  try {
    setLoading(true);
    const { data } = await signIn(data2);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.result?._id);

    navigate('/dashboard');
    setLoading(false);
  } catch (err) {
    console.log(err);
  }
};

// export const signinGoogle = async (accessToken, navigate, setLoading) => {
//   try {
//     setLoading(true);
//     const { data } = await signInGoogle(accessToken);
//     localStorage.setItem('token', data.token);
//     localStorage.setItem('userId', data.userId);
//     navigate('/dashboard');
//     toast.success('Successfully signed in!');
//   } catch (err) {
//     console.error('Google signin error:', err);
//     toast.error(err.response?.data?.message || 'Failed to sign in with Google');
//   } finally {
//     setLoading(false);
//   }
// };

export const signup = async (formData, navigate, setLoading) => {
  try {
    setLoading(true);
    // signup user
    await signUp(formData);

    navigate('/');
    setLoading(false);
  } catch (err) {
    console.log(err);
  }
};

// export const signupGoogle = async (accessToken, navigate, setLoading) => {
//   try {
//     setLoading(true);
//     const { data } = await signUpGoogle(accessToken);
//     localStorage.setItem('token', data.token);
//     localStorage.setItem('userId', data.userId);
//     navigate('/dashboard');
//     toast.success('Successfully signed up!');
//   } catch (err) {
//     console.error('Google signup error:', err);
//     toast.error(err.response?.data?.message || 'Failed to sign up with Google');
//   } finally {
//     setLoading(false);
//   }
// };
