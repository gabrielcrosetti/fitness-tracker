const router = require("express").Router();
const Workout = require("../models/workouts")



// get route to show previous workouts
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

// Put route to continue existing workouts
router.put("/api/workouts/:id", (req, res) => {
    console.log(req.params.id)
    Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } }, { new: true })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        });
})

// Post route for new workouts
router.post("/api/workouts", (req, res) => {
    Workout.create({})
        .then(response => {
            res.json(response)
        }).catch(err => {
            res.json(err)
        });
})

// Get route for stats page 
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ]).sort({ _id: -1 }).limit(8)
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.json(err);
        });
})

module.exports = router;

