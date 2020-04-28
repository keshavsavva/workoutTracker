const db = require("../models");

module.exports = function(app) {
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            // .populate("exercises")
            .then(Workout => {
                res.json(Workout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .limit(8)
            .then(Workout => {
                res.json(Workout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.get("/api/workouts/:id", (req, res) => {
        db.Workout.findOne({_id: req.params.id})
            // .populate("exercises")
            .then(Workout => {
                res.json(Workout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.post("/api/workouts", ({body}, res) => {
        body.day = new Date();
        body.exercises = [];
        db.Workout.create(body)
            .then(Workout => {
                res.json(Workout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.put("/api/workouts/:id", (req, res) => {
        console.log(req.body);
        db.Workout.update(
            {_id: req.params.id},
            { $push: {exercises: req.body}},
            (err, data) => {
                res.json(data);
            })
    });
}