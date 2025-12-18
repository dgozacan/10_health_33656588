// routes/workouts.js
const express = require("express");
const router = express.Router();

function redirectLogin(req, res, next) {
  if (!req.session.loggedIn) {
    return res.redirect("../users/login");
  }
  next();
}

router.get("/add", redirectLogin, (req, res) => {
  res.render("add_workout", { error: null });
});

router.post("/add", redirectLogin, (req, res) => {
  const workout_date = req.body.workout_date;
  const workout_name = req.body.workout_name;
  const body_part = req.body.body_part;
  const duration_mins = req.body.duration_mins;
  const notes = req.body.notes;

  if (!workout_date || !workout_name || !body_part || !duration_mins) {
    return res.render("add_workout", {
      error: "Please fill in all required fields."
    });
  }

  const sql = `
    INSERT INTO workouts
    (user_id, workout_date, workout_name, body_part, duration_mins, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  global.db.query(
    sql,
    [
      req.session.user_id,
      workout_date,
      workout_name,
      body_part,
      duration_mins,
      notes || null
    ],
    err => {
      if (err) {
        console.log(err);
        return res.render("add_workout", {
          error: "Could not save workout."
        });
      }

      
      res.redirect("../");
    }
  );
});

// Search workouts
router.get("/search", redirectLogin, (req, res) => {
  const q = req.query.q ? req.query.q.trim() : "";

  let sql = `
    SELECT workout_date, workout_name, body_part, duration_mins, notes
    FROM workouts
    WHERE user_id = ?
  `;
  let params = [req.session.user_id];

  if (q) {
    sql += " AND (workout_name LIKE ? OR body_part LIKE ? OR notes LIKE ?)";
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
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
