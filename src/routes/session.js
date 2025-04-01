//CRUD Routes for sessions
// api/sessions/
const express = require("express");
const router = express.Router();
const sessionHandler = require("../handlers/db/session");
const resultHandler = require("../handlers/db/result");
const teamHandler = require("../handlers/db/team");

// Create a new session
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const session = await sessionHandler.createSession(title);
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//get latest session
router.get("/latest", async (req, res) => {
  try {
    const currentSession = await sessionHandler.getCurrentSession();
    console.log(currentSession || "no current session found");
    if (!currentSession) {
      return res.status(404).json({ error: "No current session found!" });
    }
    res.status(200).json(currentSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
// Get all sessions
router.get("/", async (req, res) => {
  try {
    const sessions = await sessionHandler.getAllSessions();
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get a session by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const session = await sessionHandler.getSessionById(id);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Get current session
// router.get("/current", async (req, res) => {
//   try {
//     const currentSession = await sessionHandler.getCurrentSession();
//     console.log(currentSession || "no current session found");
//     if (!currentSession) {
//       return res.status(404).json({ error: "No current session found" });
//     }
//     res.status(200).json(currentSession);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Update a session
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const session = await sessionHandler.updateSession(id, title);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Delete a session
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const session = await sessionHandler.deleteSession(id);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get all results for a session
router.get("/:id/results", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await resultHandler.getAllResults();
    const sessionResults = results.filter((result) => result.sessionId === id);
    res.status(200).json(sessionResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get all teams for a session
router.get("/:id/teams", async (req, res) => {
  try {
    const { id } = req.params;
    const teams = await teamHandler.getAllTeams();
    const sessionTeams = teams.filter((team) => team.sessionId === id);
    res.status(200).json(sessionTeams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// End a session
router.post("/:id/end", async (req, res) => {
  const { id } = req.params;
  try {
    const session = await sessionHandler.endSession(id);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
});

module.exports = router;
