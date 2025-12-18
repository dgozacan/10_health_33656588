// routes/main.js
const express = require("express");
const router = express.Router();

function guessCategory(typeText) {
  const t = (typeText || "").toLowerCase();

  if (t.includes("leg") || t.includes("squat") || t.includes("lunge")) return "legs";
  if (t.includes("chest") || t.includes("bench") || t.includes("push")) return "chest";
  if (t.includes("back") || t.includes("row") || t.includes("pull")) return "back";
  if (t.includes("shoulder") || t.includes("ohp") || t.includes("press")) return "shoulders";
  if (t.includes("arm") || t.includes("bicep") || t.includes("tricep") || t.includes("curl")) return "arms";
  if (t.includes("core") || t.includes("abs") || t.includes("plank")) return "core";
  if (t.includes("run") || t.includes("cardio") || t.includes("cycle") || t.includes("bike")) return "cardio";

  return "general";
}

function suggestNext(category) {
  const plan = {
    legs: "chest",
    chest: "back",
    back: "shoulders",
    shoulders: "arms",
    arms: "core",
    core: "legs",
    cardio: "legs",
    general: "full body",
  };
  return plan[category] || "full body";
}

router.get("/", (req, res) => {
  // If not logged in, just show normal home page
  if (!req.session.loggedIn) {
    return res.render("index", { lastWorkout: null, suggestion: null });
  }

  const sql =
    "SELECT workout_date, type, duration_mins, notes FROM workouts WHERE user_id = ? ORDER BY workout_date DESC, id DESC LIMIT 1";

  global.db.query(sql, [req.session.user_id], (err, results) => {
    if (err) {
      console.log(err);
      return res.render("index", { lastWorkout: null, suggestion: null });
    }

    if (results.length === 0) {
      // No workouts yet
      return res.render("index", {
        lastWorkout: null,
        suggestion: "Start with a full body workout or some light cardio.",
      });
    }

    const lastWorkout = results[0];
    const category = guessCategory(lastWorkout.type);
    const next = suggestNext(category);

    return res.render("index", {
      lastWorkout,
      suggestion: `Based on your last workout (${category}), your next workout could be: ${next}.`,
    });
  });
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
