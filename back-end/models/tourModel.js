import mongoose from "mongoose";
import slugify from "slugify";
import validator from "validator";

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is required"],
        unique: true,
        trim: true,
        maxlength: [40, "The maxlength is 40"],
        minlength: [10, "The minlength is 10"],
        // validate: [validator.isAlpha, "The tour name must be characters"]
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, "The duration is required"]
    },
    isSecretTour: {
        type: Boolean,
        default: false
    },
    maxGroupSize: {
        type: Number,
        required: [true, "The max group size is required"]
    },
    difficulty: {
        type: String,
        required: [true, "The difficulty is required"],
        trim: true,
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: "Difficulty is either: easy, medium or difficult" 
        }
    },
    ratingAverage: {
        type: Number,
        default: 4.5,
        max: [5, "Max rating average is 5"],
        min: [1, "Min rating average is 1"]
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "The price is required"]
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function(val) {
                return val < this.price; // <.this> is always point to current docs on NEW document creation
            },
            message: "The discount price {VALUE} must be less than price"
        }
    },    
    summary: {
        type: String,
        trim: true,
        required: [true, "summary is required"]
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, "imageCover is required"]
    },
    image: [String],
    createAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});


// Virtual property
tourSchema.virtual('durationWeek').get(function() {
    return this.duration / 7;
});

//Document middleware only work with save() or create() method, not update() or something else
tourSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true});
    next();
});

// tourSchema.post('save', function(doc, next) {
//     console.log(doc);
//     next();
// })


//Query middleware
//tourSchema.pre('find', function (next) {})
tourSchema.pre(/^find/, function (next) {
    this.find({isSecretTour: {$ne: true}});
    this.start = Date.now();
    next();
});

tourSchema.post(/^find/, function (docs, next) {
    console.log(docs);
    console.log(`This query took ${Date.now() - this.start} miliseconds`);
    next();
});

//Aggregation middleware
tourSchema.pre('aggregate', function(next) {
    this.pipline().unshift({$match: {isSecretTour: {$ne: true}}});
    console.log(this.pipline());
    next();
});
const Tour = new mongoose.model("Tour", tourSchema);

export default Tour;