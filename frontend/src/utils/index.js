import { signIn, signInGoogle, signUp, signUpGoogle } from '../api';

export const signin = async (data2, navigate) => {
  try {
    const { data } = await signIn(data2);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.result?._id);

    navigate('/dashboard');
  } catch (err) {
    console.log(err);
  }
};

export const signinGoogle = async (accessToken, navigate) => {
  try {
    // login user
    const { data } = await signInGoogle(accessToken);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.result?._id);
    navigate('/dashboard');
  } catch (err) {
    console.log(err);
  }
};

export const signup = async (formData, navigate) => {
  try {
    // signup user
    await signUp(formData);

    navigate('/');
  } catch (err) {
    console.log(err);
  }
};

export const signupGoogle = async (accessToken, navigate) => {
  try {
    // signup user
    await signUpGoogle(accessToken);

    navigate('/');
  } catch (err) {
    console.log(err);
  }
};
