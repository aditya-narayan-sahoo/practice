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

//send post req using postman or similar software
app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "Done!",
  });
});

app.put("/", (req, res) => {
  for (let i = 0; i < users.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({});
});

app.delete("/", (req, res) => {
  const newKidneys = [];
  for (let i = 0; i < users.length; i++) {
    if (users[0].kidneys[i].healthy) {
      newKidneys.push({ healthy: true });
    }
  }
  users[0].kidneys = newKidneys;
  res.json({ msg: "Done" });
});

app.listen(5173);
