const express = require("express");
const jwt = require("jsonwebtoken");

const jwtPassword = "123456";
const app = express();
const PORT = 5173;

const ALL_USERS = [
  {
    username: "cheems@gmail.com",
    password: "789",
    name: "Cheems Bhaiya",
  },
  {
    username: "doge@gmail.com",
    password: "78987",
    name: "Doge Singh",
  },
  {
    username: "Dlow@gmail.com",
    password: "78900987",
    name: "Love Di",
  },
];

// Middleware to parse JSON
app.use(express.json());

// Function to check if user exists
const userExists = (username, password) => {
  return ALL_USERS.find(
    (user) => user.username === username && user.password === password
  );
};

// Sign in endpoint
app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const user = userExists(username, password);

  if (!user) {
    return res.status(403).json({
      msg: "User does not exist in the in-memory list",
    });
  }

  const token = jwt.sign({ username }, jwtPassword);
  return res.json({ token });
});

// Get users endpoint
app.get("/users", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;

    // Respond with the list of users
    res.json(
      ALL_USERS.map((user) => ({ username: user.username, name: user.name }))
    );
  } catch (error) {
    return res.status(403).json({ msg: "Invalid token" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
