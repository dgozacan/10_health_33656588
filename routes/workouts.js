// routes/workouts.js
const express = require("express");
const router = express.Router();

function redirectLogin(req, res, next) {
  if (!req.session.loggedIn) {
    return res.redirect("/users/login");
  }
  next();
}

router.get("/add", redirectLogin, (req, res) => {
  res.render("add_workout", { error: null });
});

router.post("/add", redirectLogin, (req, res) => {
  const workout_date = req.body.workout_date;
  const type = req.body.type;
  const duration_mins = req.body.duration_mins;
  const notes = req.body.notes;

  if (!workout_date || !type || !duration_mins) {
    return res.render("add_workout", { error: "Fill in date, type and duration." });
  }

  const sql =
    "INSERT INTO workouts (user_id, workout_date, type, duration_mins, notes) VALUES (?, ?, ?, ?, ?)";
  global.db.query(
    sql,
    [req.session.user_id, workout_date, type, duration_mins, notes || null],
    (err) => {
      if (err) {
        console.log(err);
        return res.render("add_workout", { error: "Could not save workout." });
      }
      res.redirect("/workouts/search");
    }
  );
});

router.get("/search", redirectLogin, (req, res) => {
  const q = req.query.q ? req.query.q.trim() : "";

  let sql =
    "SELECT workout_date, type, duration_mins, notes FROM workouts WHERE user_id = ?";
  let params = [req.session.user_id];

  if (q) {
    sql += " AND (type LIKE ? OR notes LIKE ?)";
    params.push("%" + q + "%", "%" + q + "%");
  }

  sql += " ORDER BY workout_date DESC";

  global.db.query(sql, params, (err, results) => {
    if (err) {
      console.log(err);
      return res.render("search_workout", { q, rows: [] });
    }
    res.render("search_workout", { q, rows: results });
  });
});

module.exports = router;
