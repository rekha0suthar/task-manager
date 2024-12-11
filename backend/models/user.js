import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  profilePicture: { type: String, required: false },
});

const User = model('User', userSchema);

export default User;
