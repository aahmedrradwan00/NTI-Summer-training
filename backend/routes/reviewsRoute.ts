import { Router } from 'express';
import { allowedTo, checkActive, protectRoutes } from '../controllers/authController';
import { createReview, deleteReview, filterReviews, getReview, getReviews, setProductAndUserId, updateReview } from '../controllers/reviewsController';
import { createReviewValidator, deleteReviewValidator, getReviewValidator, updateReviewValidator } from '../utils/validation/reviewsValidator';

const reviewsRouter: Router = Router({ mergeParams: true });

// Get or create reviews 
reviewsRouter.route('/').get(filterReviews, getReviews).post(protectRoutes, checkActive, allowedTo('user'), setProductAndUserId, createReviewValidator, createReview);

reviewsRouter.route('/myReviews').get(protectRoutes, checkActive, allowedTo('user'), filterReviews, getReviews);

// Get, update, or delete a review by ID 
reviewsRouter
    .route('/:id')
    .get(getReviewValidator, getReview)
    .put(protectRoutes, checkActive, allowedTo('user'), updateReviewValidator, updateReview)
    .delete(protectRoutes, checkActive, allowedTo('manager', 'admin', 'user'), deleteReviewValidator, deleteReview);

export default reviewsRouter;
