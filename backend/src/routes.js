const express = require("express");
const router = express.Router();

// Home page route.
router.get("/", function (req, res) {
  res.send("Wiki home page");
});

// About page route.
router.get("/about/:info", function (req, res) {
  res.send(req.params);
});

// Grab latest currency data from database

module.exports = router;
