//CRUD Routes for teams
// api/teams/
const express = require("express");
const router = express.Router();
const teamHandler = require("../handlers/db/team");
const sessionHandler = require("../handlers/db/session");
const resultHandler = require("../handlers/db/result");

// Create a new team
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const team = await teamHandler.createTeam(name);
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get all teams
router.get("/", async (req, res) => {
  try {
    const teams = await teamHandler.getAllTeams();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get a team by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const team = await teamHandler.getTeamById(id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Update a team
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const team = await teamHandler.updateTeam(id, name);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Delete a team
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const team = await teamHandler.deleteTeam(id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get all sessions for a team
router.get("/:id/sessions", async (req, res) => {
  try {
    const { id } = req.params;
    const sessions = await sessionHandler.getAllSessions();
    const teamSessions = sessions.filter((session) => session.teamId === id);
    res.status(200).json(teamSessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get all results for a team
router.get("/:id/results", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await resultHandler.getAllResults();
    const teamResults = results.filter((result) => result.teamId === id);
    res.status(200).json(teamResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;