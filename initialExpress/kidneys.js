const express = require("express");

const app = express();
app.use(express.json()); //middleware to ensure body passed by someone hitting this endpoint is parsed.

const authenticateUser = (req, res, next) => {
  const username = req.headers.username;
  const password = req.headers.password;
  if (username !== "aditya" || password !== "pass") {
    return res.status(403).json({ msg: "User does not exist" });
  }
  next();
};

const validateKidneyId = (req, res, next) => {
  const kidneyId = parseInt(req.query.kidneyId);
  if (kidneyId !== 1 && kidneyId !== 2) {
    return res.status(411).json({ msg: "Wrong input" });
  }
  next();
};

app.get("/health-checkup", authenticateUser, validateKidneyId, (req, res) => {
  // Task to do something with the kidneys
  res.send("Your heart is healthy");
});

app.post("/replace-kidney", authenticateUser, validateKidneyId, (req, res) => {
  // Task to do something with the kidneys
  res.send("Your heart is healthy");
});

app.post("/replace-kidney", authenticateUser, (req, res) => {
  const { kidneyId } = req.body; // Assuming we're sending kidneyId in the body
  // Perform some action with kidneyId here
  res.send(`Kidney information received for kidney ID: ${kidneyId}`);
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Internal Server Error", error: err.message });
});

app.listen(5173, () => {
  console.log("Server is running on port 5173");
});
