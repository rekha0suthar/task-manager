import { signIn, signInGoogle, signUp, signUpGoogle } from '../api';

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

export const signinGoogle = async (accessToken, navigate, setLoading) => {
  try {
    setLoading(true);
    // login user
    const { data } = await signInGoogle(accessToken);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.result?._id);
    navigate('/dashboard');
    setLoading(false);
  } catch (err) {
    console.log(err);
  }
};

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

export const signupGoogle = async (accessToken, navigate, setLoading) => {
  try {
    setLoading(false);

    // signup user
    await signUpGoogle(accessToken);

    navigate('/');
    setLoading(false);
  } catch (err) {
    console.log(err);
  }
};
