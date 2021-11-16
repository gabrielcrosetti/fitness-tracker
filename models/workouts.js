const mongoose = require("mongoose");

const Schema = mongoose.Schema

const WorkoutSchema = new Schema({
    day: {
        type: Date, 
        default: Date.now
    },
    exercises: [
        {
            name: {type: String},
            type: {type: String},
            weight: {type: Number},
            sets: {type: Number},
            reps: {type: Number},
            duration: {type: Number},
            distance: {type: Number}
        }
    ]

})


const Workout = mongoose.model("workouts", WorkoutSchema);
module.exports = Workout;
