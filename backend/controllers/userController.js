import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const signinController = async (req, res) => {
  const { email, password } = req.body;
  if (email === '' || password === '')
    return res.status(400).json({ message: 'Invalid field!' });
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User don't exist!" });

    const isPasswordOk = bcrypt.compare(password, existingUser.password);

    if (!isPasswordOk)
      return res.status(400).json({ message: 'Invalid credintials!' });

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

const signupController = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    if (
      email === '' ||
      password === '' ||
      firstName === '' ||
      (lastName === '' && password === confirmPassword && password.length >= 4)
    )
      return res.status(400).json({ message: 'Invalid field!' });

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: 'User already exist!' });

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.status(200).json({ msg: 'Signup successfull' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User  not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ msg: 'Password reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

export { signinController, signupController, getUser, resetPassword };
