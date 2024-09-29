const { error } = require("console");
const express = require("express");
const app = express();
let users = [
  {
    name: "Johnny",
    kidneys: [{ healthy: true }, { healthy: false }, { healthy: true }],
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  const kidneys = users[0].kidneys;
  const healthyKidneys = kidneys.filter((kidney) => kidney.healthy);
  const unhealthyKidneys = kidneys.filter((kidney) => !kidney.healthy);
  res.json({
    numberOfKidneys: kidneys.length,
    healthyKidneys: healthyKidneys.length,
    unhealthyKidneys: unhealthyKidneys.length,
  });
});

//send post,put,delete req using postman or axios or curl or any tech of your choice
app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  if (typeof isHealthy !== "boolean") {
    return res.status(400).json({ error: "isHealthy must be a boolean value" });
  }
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "Kideny Added!",
  });
});

app.put("/", (req, res) => {
  const kidneys = users[0].kidneys;
  if (kidneys.length === 0) {
    return res.status(400).json({ error: "No kidneys to update." });
  }
  const allHealthy = kidneys.every((kidney) => kidney.healthy);
  if (allHealthy) {
    return res.status(400).json({ error: "All kidneys are already healthy." });
  }
  for (const element of kidneys) {
    element.healthy = true;
  }
  res.json({ msg: "All kidneys updated to healthy" });
});

app.delete("/", (req, res) => {
  const kidneys = users[0].kidneys;
  if (kidneys.length === 0) {
    return res.status(400).json({ error: "No kidneys to delete." });
  }
  const anyUnhealthy = kidneys.some((kidney) => !kidney.healthy);

  if (!anyUnhealthy) {
    return res.status(400).json({ error: "No unhealthy kidneys to delete." });
  }
  users[0].kidneys = kidneys.filter((kidney) => kidney.healthy);

  res.json({ msg: "Unhealthy kidneys removed." });
});

app.listen(5173, () => {
  console.log(`Server is running on port 5173`);
});
