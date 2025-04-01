const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const authMiddleware = require("./middleware/auth.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const port = process.env.PORT || 3001;
require("./lib/prisma.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));
// Authenticate all requests with x-auth-token header
// app.use(authMiddleware);

app.use("/api/teams", authMiddleware, require("./routes/team"));
app.use("/api/sessions", authMiddleware, require("./routes/session"));
app.use("/api/results", authMiddleware, require("./routes/result"));

// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.get("/", (req, res) => {
  res.sendStatus(200)
})

app.use(
  "/swagger-ui",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);


// let latestScore = null; // Store the latest score
let clients = []; // Store connected SSE clients

// Route for ESP to upload score
app.post("/esp/:id/:score", authMiddleware, (req, res) => {
  const { score } = req.params;
  const {id} = req.params;
  if (score === undefined) {
    return res.status(400).send("Score is required");
  }
  if (isNaN(score)) {
    return res.status(400).send("Score must be Int");
  }
  if(isNaN(id) || id > 15 || id < 1) {
    return res.status(400).send("Invalid ID provided")
  }

  console.log(`Score received from ESP with ID ${id}: ${score}`);
  // latestScore = score;

  // Send the score to all connected clients
  clients.forEach((client) => client.res.write(`data: ${id}:${score}\n\n`));

  // res.status(200).send("Score received");
  res.status(200).json({ message: "Score received", score: score });
});

// SSE endpoint to send score updates to the frontend
app.get("/api/esp-live-score", (req, res) => {
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
