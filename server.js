// 'export PORT=5000'
// nodemon index2.js
const express = require("express");
const morgan = require("morgan");
const { clog } = require("./middleware/clog");
const path = require("path");
const api = require("./routes/index.js");
const app = express();
const { exec } = require("child_process");
const os = require("os");

// Import custom middleware, "clog"
app.use(clog);

//load all middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
app.use(express.static("public"));

// ON WINDOWS COMMAND LINE: set NODE_ENV=development
// echo %NODE_ENV% to see current setting
//in developer environment then we will log every request
// console.log(`Node_ENV: ${process.env.NODE_ENV}`);
if (app.get("env") == "development") {
  app.use(morgan("tiny"));
}

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for homepage
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//listening on port ______
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port} 🚀`);
});
