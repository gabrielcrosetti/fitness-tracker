const mongoose = require("mongoose");

const Schema = mongoose.Schema

const ExerciseSchema = new Schema({
    name: String,
    type: String,
    weight: Number,
    sets: Number,
    reps: Number,
    duration: Number,
    distance: Number
})

const Exercise = mongoose.model("exercises", ExerciseSchema);
module.exports = Exercise; 
