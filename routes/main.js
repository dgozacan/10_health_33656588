
// Handle the main routes
// Create a new router
const express = require("express");
const router = express.Router();
// Define our data
var shopData = {
    shopName: "Pirate Bay Alcohol", 
    productCategories: ["Beer", "Wine", "Rum", "Whiskey", "Soft Drinks", "Hot Drinks"],
    shops: [
        { location: "London Bridge", manager: "Captain Jack Sparrow", address: "123 Thames St, London SE1 9RT" },
        { location: "Camden Town", manager: "Blackbeard Jones", address: "456 Camden High St, London NW1 7JR" },
        { location: "Shoreditch", manager: "Anne Bonny", address: "789 Brick Lane, London E1 6QL" }
    ]
}
// Handle the main routes
router.get("/", (req, res) => {
    res.render("index.ejs", shopData)
});

router.get("/about", (req, res) => {
    res.render("about.ejs", shopData)
});

router.get("/search", (req, res) => {
    res.render("search.ejs", shopData)
});

router.get('/search_result', function (req, res) {
    // TODO: search in the database
    res.send("You searched for " + req.query.search_text + " in " + req.query.category);
});

router.get("/register", (req, res) => {
    res.render("register.ejs", shopData);
});

router.post("/registered", (req, res) => {
    res.send('Hello ' + req.body.first + ' ' + req.body.last + 
             ' you are now registered! We will send an email to ' + req.body.email);
});



// Export the router object so index.js can access it
module.exports = router;
