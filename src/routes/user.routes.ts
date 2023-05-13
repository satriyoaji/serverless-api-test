import express from 'express';
import {
    getMeHandler,
    getUserListHandler,
    deleteUserByIdHandler,
    restoreUserByIdHandler,
    updateUserByIdHandler,
    getUserByIdHandler, createUserHandler
} from '../controllers/user.controller';
import { registerUserHandler } from '../controllers/auth.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { hasRole } from '../middleware/hasRole';
import { validate } from '../middleware/validate';
import {createUserSchema, updateUserSchema} from '../schemas/user.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get currently logged in user
router.get('/me', getMeHandler);

// Get user list
router.get('/', hasRole(['Admin']), getUserListHandler);

// Get user by id
router.get('/:user_id', hasRole(['Admin']), getUserByIdHandler);

// Create new user
router.post('/', hasRole(['Admin']), validate(createUserSchema), createUserHandler);

// Update user by id
router.put('/:user_id', hasRole(['Admin']), validate(updateUserSchema), updateUserByIdHandler);

// Delete user by id
router.delete('/:user_id', hasRole(['Admin']), deleteUserByIdHandler);

// Restore user by id
router.post('/restore/:user_id', hasRole(['Admin']), restoreUserByIdHandler);

export default router;