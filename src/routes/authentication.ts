import { Router } from 'express';
export const router = Router();

import { registration, login, loadUser } from '../controller/authentication';

router.post('/signup',  registration);
router.post('/login', login);
router.get('/:token', loadUser);