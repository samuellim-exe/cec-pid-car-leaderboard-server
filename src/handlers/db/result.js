// CRUD Results
const prisma = require("../../lib/prisma").prisma;

async function createResult(sessionId, teamId, score, espId) {
    const result = await prisma.result.create({
        data: {
            sessionId: sessionId,
            teamId: teamId,
            score: score,
            espId: espId,
        },
    });
    return result;
}

async function getAllResults() {
    const results = await prisma.result.findMany({});
    return results;
}

async function getResultById(id) {
    const result = await prisma.result.findUnique({
        where: {
            id: id,
        },
    });
    return result;
}

async function updateResult(id, sessionId, teamId, score, espId) {
    const result = await prisma.result.update({
        where: {
            id: id,
        },
        data: {
            sessionId: sessionId,
            teamId: teamId,
            score: score,
            espId: espId,
        },
    });
    return result;
}

async function deleteResult(id) {
    const result = await prisma.result.delete({
        where: {
            id: id,
        },
    });
    return result;
}

async function getResultByEspId(espId) {
    const result = await prisma.result.findMany({
        where: {
            espId: espId,
        },
    });
    return result;
}

module.exports = {
    createResult,
    getAllResults,
    getResultById,
    updateResult,
    deleteResult,
    getResultByEspId,
};