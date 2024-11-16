import express from "express";
import tourControllers from "../controllers/tourControllers.js";

const tourRouter = express.Router();

// Param middleware
// tourRouter.param('id', tourControllers.checkID);

tourRouter.route('/top-5-cheap').get(tourControllers.aliasTopTours, tourControllers.getTours);

tourRouter.route('/tour-stats').get(tourControllers.tourStats);

tourRouter.route('/month-plan/:year').get(tourControllers.monthPlan);

tourRouter
    .route('/')
    .get(tourControllers.getTours)
    .post(tourControllers.createTour);

tourRouter
    .route('/:id')
    .get(tourControllers.getTourByID)
    .patch(tourControllers.updateTour)
    .delete(tourControllers.deleteTour);

export default tourRouter;