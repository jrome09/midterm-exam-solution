
const express = require("express");
const app = express();
const port = 3000;
const bodyParse = require("body-parser");

app.use(bodyParse.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello, Philippines!");
});

app.get("/about", (req, res) => {
  res.send("about us!");
});
//Add middleware to log incoming requests:

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

//Add middleware to handle errors:
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something Broke!");
});

//list of items
const items = ["apple", "Banana", "Orange"];

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const newItem = req.body.item;
  items.push(newItem);
  res.json(items);
});

app.use(express.json());

app.post("/submit", (req, res) => {
  const data = req.body;

  res.send(`Received: ${JSON.stringify(data)}`);
});

app.listen(port, () => {
  console.log(`Express is working! Balongkit Jerome E. Server running at http://localhost:${port}`);
});
