import { Router } from 'express';
import {
  getUser,
  resetPassword,
  signinController,
  signupController,
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.post('/signin', signinController);
router.post('/signup', signupController);
router.put('/reset-password', resetPassword);
router.get('/:id', verifyToken, getUser);
export default router;
