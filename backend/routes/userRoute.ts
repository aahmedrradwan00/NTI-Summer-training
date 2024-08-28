import { Router } from 'express';
import { createUser, deleteUser, getUser, getUsers, resizeUserImage, updateUser, uploadUserImage } from '../controllers/userController';
import { createUserValidator, deleteUserValidator, getUserValidator, updateUserValidator } from '../utils/validation/userValidator';
import { uploadSingleImages } from '../middlewares/uploadsImages';
import { allowedTo, checkActive, protectRoutes } from '../controllers/auth';

const UserRouter: Router = Router();
UserRouter.use(protectRoutes, checkActive, allowedTo('manager'));
UserRouter.route('/').get(getUsers).post(uploadUserImage,resizeUserImage,createUserValidator, createUser);
UserRouter.route('/:id').get(getUserValidator, getUser).put(uploadUserImage,resizeUserImage,updateUserValidator, updateUser).delete(deleteUserValidator, deleteUser);

export default UserRouter;
