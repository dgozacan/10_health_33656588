// index.js
var express = require("express");
const path = require("path");
var mysql = require("mysql2");
const session = require("express-session");

const app = express();
const port = 8000;

// MySQL pool 
const db = mysql.createPool({
  host: "localhost",
  user: "health_app",
  password: "qwertyuiop",
  database: "health",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
global.db = db;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "health_secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Make session info available in EJS
app.use((req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn || false;
  res.locals.username = req.session.username || null;
  next();
});

// Routes
app.use("/", require("./routes/main"));
app.use("/users", require("./routes/users"));
app.use("/workouts", require("./routes/workouts"));

app.listen(port, () => console.log(`App listening on port ${port}`));
