const express = require("express");
const app = express();
let users = [
  {
    name: "Johnny",
    kidneys: [{ healthy: true }, { healthy: false }, { healthy: true }],
  },
];

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

app.post("/", (req, res) => {});

app.put("/", (req, res) => {});

app.delete("/", (req, res) => {});

app.listen(5173);
