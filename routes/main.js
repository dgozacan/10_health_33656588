// routes/main.js
const express = require("express");
const router = express.Router();

// Simple fallback plan if the user didn't set a next body part
function suggestNextBodyPart(lastBodyPart) {
  const plan = {
    Legs: "Chest",
    Chest: "Back",
    Back: "Shoulders",
    Shoulders: "Arms",
    Arms: "Core",
    Core: "Legs",
    Cardio: "Legs"
  };

  return plan[lastBodyPart] || "Full body";
}

router.get("/", (req, res) => {
  // Not logged in -> show basic home page
  if (!req.session.loggedIn) {
    return res.render("index", {
      lastWorkout: null,
      suggestion: null,
      nextPlan: null
    });
  }

  const sql = `
    SELECT workout_date, workout_name, body_part, next_body_part, duration_mins, notes
    FROM workouts
    WHERE user_id = ?
    ORDER BY workout_date DESC, id DESC
    LIMIT 1
  `;

  global.db.query(sql, [req.session.user_id], (err, results) => {
    if (err) {
      console.log(err);
      return res.render("index", {
        lastWorkout: null,
        suggestion: "Could not load your last workout right now.",
        nextPlan: null
      });
    }

    if (results.length === 0) {
      return res.render("index", {
        lastWorkout: null,
        suggestion: "Start with a full body workout or some light cardio.",
        nextPlan: null
      });
    }

    const lastWorkout = results[0];

    // If user planned a next workout, show that. Otherwise, make a basic suggestion.
    const nextPlan = lastWorkout.next_body_part || null;
    const suggestion = nextPlan
      ? `Next planned workout: ${nextPlan}.`
      : `Based on your last workout (${lastWorkout.body_part}), your next workout could be: ${suggestNextBodyPart(lastWorkout.body_part)}.`;

    return res.render("index", {
      lastWorkout,
      suggestion,
      nextPlan
    });
  });
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
