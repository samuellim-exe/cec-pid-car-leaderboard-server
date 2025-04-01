//CRUD Routes for results
// api/results/
const express = require("express");
const router = express.Router();
const resultHandler = require("../handlers/db/result");
const sessionHandler = require("../handlers/db/session");
const teamHandler = require("../handlers/db/team");

// Create a new result
router.post("/", async (req, res) => {
  try {
    const { sessionId, teamId, score, espId } = req.body;
    const session = await sessionHandler.getSessionById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    const team = await teamHandler.getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    if(!espId){
      return res.status(400).json({ error: "ESP ID is required" });
    }
    if(session.isEnded) {
      return res.status(400).json({ error: "Session has ended" });
    }
    const result = await resultHandler.createResult(sessionId, teamId, score, espId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get all results
router.get("/", async (req, res) => {
  try {
    const results = await resultHandler.getAllResults();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
});
// Get a result by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await resultHandler.getResultById(id);
    if (!result) {
      return res.status(404).json({ error: "Result not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Update a result
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { sessionId, teamId, score } = req.body;
    const session = await sessionHandler.getSessionById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    const team = await teamHandler.getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const result = await resultHandler.updateResult(
      id,
      sessionId,
      teamId,
      score
    );
    if (!result) {
      return res.status(404).json({ error: "Result not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Delete a result
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await resultHandler.deleteResult(id);
    if (!result) {
      return res.status(404).json({ error: "Result not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get results by ESP ID
router.get("/esp/:espId", async (req, res) => {
  try {
    const { espId } = req.params;
    const results = await resultHandler.getResultByEspId(espId);
    if (!results) {
      return res.status(404).json({ error: "Results not found" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
