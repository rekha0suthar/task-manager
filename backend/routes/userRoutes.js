import { Router } from 'express';
import {
  getUser,
  signinController,
  signupController,
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.post('/signin', signinController);
router.post('/signup', signupController);
router.get('/:id', verifyToken, getUser);

export default router;
