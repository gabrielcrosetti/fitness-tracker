const mongoose = require("mongoose");

const Schema = mongoose.Schema

const WorkoutSchema = new Schema({
    day: {
        type: Date
    },
    exercise: [
        {
            type: Schema.Types.ObjectId,
            ref: "excercises"
        }
    ]

})


const Workout = mongoose.model("workouts", WorkoutSchema);
module.exports = Workout;
