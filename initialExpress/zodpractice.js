const express = require("express");
const app = express();
const z = require("zod");

const schema = z.array(z.number());
app.use(express.json());
app.post("/health-checkup", (req, res) => {
  const kidneys = req.body.kidneys;
  const response = schema.safeParse(kidneys);
  if (!response.success) {
    res.status(411).json({ msg: "Invalid Input" });
  } else {
    res.send({ response });
  }
});

app.listen(5173, () => {
  console.log("running on host 5173");
});
