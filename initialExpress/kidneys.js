const express = require("express");
const { z } = require("zod");
const app = express();
app.use(express.json()); //middleware to ensure body passed by someone hitting this endpoint is parsed.

//zod schemas for validation
const authSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});
const kidneyIdSchema = z.object({
  kidneyId: z.number().int().min(1).max(2),
});

const authenticateUser = (req, res, next) => {
  const { username, password } = req.headers;
  try {
    authSchema.parse({ username, password });
  } catch (error) {
    return res.status(400).json({ msg: "Invalid authentication details" });
  }

  if (username !== "aditya" || password !== "pass") {
    return res.status(403).json({ msg: "User does not exist" });
  }
  next();
};

const validateKidneyId = (req, res, next) => {
  const kidneyId = parseInt(req.query.kidneyId);
  try {
    kidneyIdSchema.parse({ kidneyId });
  } catch (error) {
    return res.status(411).json({ msg: "Wrong input" });
  }
  next();
};

app.get("/health-checkup", authenticateUser, validateKidneyId, (req, res) => {
  // Task to do something with the kidneys
  res.send("Your heart is healthy");
});

app.post("/replace-kidney", authenticateUser, (req, res) => {
  try {
    const { kidneyId } = req.body;
    kidneyIdSchema.parse({ kidneyId });

    // Perform some action with kidneyId here
    res.send(`Kidney information received for kidney ID: ${kidneyId}`);
  } catch (error) {
    return res.status(400).json({ msg: "Invalid input", error: error.errors });
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Internal Server Error", error: err.message });
});

app.listen(5173, () => {
  console.log("Server is running on port 5173");
});
