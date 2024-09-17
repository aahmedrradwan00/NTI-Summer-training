import { Router } from 'express';
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    resizeUserImage,
    updateUser,
    uploadUserImage,
    getLoggedUser,
    changeLoggedUserPassword,
    updateLoggedUser,
    setLoggedUserId,
    changeUserPassword,
} from '../controllers/userController';
import { changeLoggedUserPasswordValidator, changeUserPasswordValidator, createUserValidator, deleteUserValidator, getUserValidator, updateUserValidator } from '../utils/validation/userValidator';
import { allowedTo, checkActive, protectRoutes } from '../controllers/authController';

const UserRouter: Router = Router();

// Protect routes and ensure user is active
UserRouter.use(protectRoutes, checkActive);

// Routes for the logged-in user
UserRouter.get('/me', getLoggedUser, getUser);
UserRouter.put('/updateMe',uploadUserImage,resizeUserImage, updateUserValidator, updateLoggedUser);
UserRouter.put('/changeMyPassword', changeLoggedUserPasswordValidator, changeLoggedUserPassword);
UserRouter.delete('/deleteMe', allowedTo('user'), setLoggedUserId, deleteUser);

// Admin/manager restricted routes
UserRouter.use(allowedTo('manager'));

// Routes for managing users 
UserRouter.route('/').get(getUsers).post(uploadUserImage, resizeUserImage, createUserValidator, createUser);

// Routes for user by ID 
UserRouter.route('/:id').get(getUserValidator, getUser).put(uploadUserImage, resizeUserImage, updateUserValidator, updateUser).delete(deleteUserValidator, deleteUser);

// Change password for a specific user 
UserRouter.put('/:id/changePassword', changeUserPasswordValidator, changeUserPassword);

export default UserRouter;
