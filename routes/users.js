// routes/users.js
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.render("login", { error: "Please enter username and password." });
  }

  const sql = "SELECT * FROM users WHERE username = ?";
  global.db.query(sql, [username], async (err, results) => {
    if (err) {
      console.log(err);
      return res.render("login", { error: "Database error." });
    }

    if (results.length === 0) {
      return res.render("login", { error: "Incorrect login details." });
    }

    const user = results[0];

    try {
      const ok = await bcrypt.compare(password, user.password_hash);
      if (!ok) {
        return res.render("login", { error: "Incorrect login details." });
      }

      req.session.loggedIn = true;
      req.session.username = user.username;
      req.session.user_id = user.id;

      return res.redirect("/");
    } catch (e) {
      console.log(e);
      return res.render("login", { error: "Login failed." });
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect("/");
    res.send("you are now logged out. <a href='/'>Home</a>");
  });
});

module.exports = router;
