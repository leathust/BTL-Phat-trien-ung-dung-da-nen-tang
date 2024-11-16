
import { fileURLToPath } from "url";
import { dirname } from "path";
import Tour from "../models/tourModel.js";
import APIFeature from "./../utils/apiFeature.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingAverage price';
    req.query.fields = 'name,price,ratingAverage,summary,difficulty';
    next(); 
};

const getTours = async (req, res) => {
    try {
        //Create the query
        const apiFeature = new APIFeature(Tour.find(), req.query).filter().sort().limitFields().paginate();
        //Execute the query
        const tours = await apiFeature.query;
        //Send response
        res.status(200).json({
            status: "success",
            result: tours.length,
            data: {
                tours
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

const getTourByID = async (req, res) => {
    try {
        const foundTour = await Tour.findById(req.params.id);
        // const foundTour = Tour.findOne({_id: req.params.id});
        if(!foundTour) {
            res.status(404).json({
                status: "fail",
                message: "Tour not found"
            });
        } else {
            res.status(200).json({
            status: "success",
            data: {
                foundTour
            }
        });
        }
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

const createTour = async (req, res) => {
    try {
        // const newTour = new Tour({});
        // newTour.save();
        const newTour = await Tour.create(req.body);

        res
            .status(201)
            .json({
                status: "success",
                data: {
                    tour: newTour
                }
            });
    } catch (err) {
        res
            .status(400)
            .json({
                status: "fail",
                message: err
           });
    }

};

const updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

const deleteTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);
            res.status(204)
            .json({
                status: "success",
                message: null
            });            
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: "Tour not found"
        });
    }

};

const tourStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    _id: { $toUpper:'$difficulty' },
                    numTours: { $sum: 1 },
                    numRatings: { $sum: '$ratingQuantity' },
                    avgRating: { $avg: '$ratingAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                $sort: { avgPrice: 1 }
            }
        ]);

        res.status(200).json({
            status: "success",
            data: {
                stats
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error
        });        
    }
};

const monthPlan = async (req, res) => {
    const year = req.params.year * 1;

    try {
        const monthPlan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: { startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }}
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numTourStarts: {$sum: 1},
                    tours: {$push: '$name'}
                }
            },
            {
                $project: { _id: 0 }
            },
            {
                $sort: { numTourStarts: 1 }
            },
            {
                $limit: 12
            }
            
        ]);

        res.status(200).json({
            status: "success",
            data: {
                monthPlan
            }
        })        
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error
        });           
    }


}

const tourControllers = {aliasTopTours ,getTours, getTourByID, createTour, updateTour, deleteTour, tourStats, monthPlan};
export default tourControllers;