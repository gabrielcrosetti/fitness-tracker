const router = require("express").Router();
const Workout = require("../models/workouts")

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

router.put("/api/workouts/:id", (req,res) => {
    console.log(req.params.id)
    Workout.findOneAndUpdate({_id: req.params.id}, { $push: { exercises: req.body }}, { new: true })
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        console.log(err)
        res.status(400).json(err);
    });
})

// Workout.create 


// Workout.aggregate
// cursor sort before
// cursor limit





module.exports = router;

// db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))

// db.scores.aggregate( [
//     {
//       $addFields: {
//         totalHomework: { $sum: "$homework" } ,
//         totalQuiz: { $sum: "$quiz" }
//       }
//     },
//     {
//       $addFields: { totalScore:
//         { $add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ] } }
//     }
//  ] )