const express = require("express");

const app = express();
app.get("/health-checkup", (req, res) => {
  const kidenyId = req.query.kidenyId;
  const username = req.headers.username;
  const password = req.headers.password;
  if (username != "aditya" && password != "pass") {
    res.status(403).json({ msg: "User does not exist" });
    return;
  }
  if (kidenyId !== 1 && kidenyId !== 2) {
    res.status(411).json({ msg: "Wrong input" });
    return;
  }
  //task to do sth with the kidneys
  res.send("Your heart is healthy");
});

app.put("/replace-kidney", (req, res) => {
  const kidenyId = req.query.kidenyId;
  const username = req.headers.username;
  const password = req.headers.password;
  if (username != "aditya" && password != "pass") {
    res.status(403).json({ msg: "User does not exist" });
    return;
  }
  if (kidenyId !== 1 && kidenyId !== 2) {
    res.status(411).json({ msg: "Wrong input" });
    return;
  }
  //task to do sth with the kidneys
  res.send("Your heart is healthy");
});

app.listen(5173);
