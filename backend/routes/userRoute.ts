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
    changeLoggedUserPasssword,
    updateLoggedUser,
    setLoggedUserId,
    changeUserPassword,
} from '../controllers/userController';
import { changeLoggedUserPasswordValidator, changeUserPasswordValidator, createUserValidator, deleteUserValidator, getUserValidator, updateUserValidator } from '../utils/validation/userValidator';
import { allowedTo, checkActive, protectRoutes } from '../controllers/authController';

const UserRouter: Router = Router();

UserRouter.use(protectRoutes, checkActive);
UserRouter.get('/me', getLoggedUser, getUser);
UserRouter.put('/updateMe', updateUserValidator, updateLoggedUser);
UserRouter.put('/changeMyPassword', changeLoggedUserPasswordValidator, changeLoggedUserPasssword);
UserRouter.delete('/deleteMe', allowedTo('user'), setLoggedUserId, deleteUser);
UserRouter.use(allowedTo('manager'));
UserRouter.route('/').get(getUsers).post(uploadUserImage, resizeUserImage, createUserValidator, createUser);
UserRouter.route('/:id').get(getUserValidator, getUser).put(uploadUserImage, resizeUserImage, updateUserValidator, updateUser).delete(deleteUserValidator, deleteUser);

UserRouter.put('/:id/changePassword', changeUserPasswordValidator, changeUserPassword);

export default UserRouter;
