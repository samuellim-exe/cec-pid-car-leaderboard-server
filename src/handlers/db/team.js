//CRUD teams
const prisma = require("../../lib/prisma").prisma;

async function createTeam(name) {
  const team = await prisma.team.create({
    data: {
      name: name,
    },
  });
  return team;
}

async function getAllTeams() {
  const teams = await prisma.team.findMany({});
  return teams;
}

async function getTeamById(id) {
    const team = await prisma.team.findUnique({
        where: {
        id: id,
        },
    });
    return team;
}

async function updateTeam(id, name) {
    const team = await prisma.team.update({
        where: {
        id: id,
        },
        data: {
        name: name,
        },
    });
    return team;
}

async function deleteTeam(id) {
    const team = await prisma.team.delete({
        where: {
        id: id,
        },
    });
    return team;
}

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};