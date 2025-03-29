const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT || 3001;
require("./lib/prisma.js");

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));

app.use("/api/teams", require("./routes/team"));
app.use("/api/sessions", require("./routes/session"));
app.use("/api/results", require("./routes/result"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let latestScore = null; // Store the latest score
let clients = []; // Store connected SSE clients

// Route for ESP to upload score
app.post("/esp", (req, res) => {
  const { score } = req.body;
  if (score === undefined) {
    return res.status(400).send("Score is required");
  }

  console.log(`Score received: ${score}`);
  latestScore = score;

  // Send the score to all connected clients
  clients.forEach((client) => client.res.write(`data: ${score}\n\n`));

  res.status(200).send("Score received");
});

// SSE endpoint to send score updates to the frontend
app.get("/api/score-updates", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Store the client connection
  const client = { res };
  clients.push(client);

  // Send the latest score if available
  //   if (latestScore !== null) {
  // res.write(`data: ${latestScore}\n\n`);
  //   }

  // Send a message to the client when the connection is established
  client.res.write(`message: Connection established\n\n`);

  // Keep the connection alive by sending a comment every 20 seconds
  const keepAlive = setInterval(() => {
    // send amount of time client has been connected
    const currentTime = new Date().toLocaleTimeString();
    client.res.write(`ping: ${currentTime}\n\n`);
  }, 20000);

  // Remove client when disconnected
  req.on("close", () => {
    clients = clients.filter((c) => c !== client);
    clearInterval(keepAlive); // Clear the interval when client disconnects
  });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
