import { Router } from 'express';
export const router = Router();

import { registration, login, loadUser } from '../controller/authentication';
import { users, user, updateProfile, change_password, delete_user } from '../controller/user';

router.post('/authentication/signup',  registration);
router.post('/login', login);
router.get('/me/:token', loadUser);
router.patch('/update/:id', updateProfile );
router.get('/',  users);
router.get('/:id', user);
router.patch('/change/:id',  change_password);
router.delete('/delete/:id',  delete_user);
