// CRUD Results
const prisma = require("../../lib/prisma").prisma;

async function createResult(sessionId, teamId, score) {
    const result = await prisma.result.create({
        data: {
            sessionId: sessionId,
            teamId: teamId,
            score: score,
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

async function updateResult(id, sessionId, teamId, score) {
    const result = await prisma.result.update({
        where: {
            id: id,
        },
        data: {
            sessionId: sessionId,
            teamId: teamId,
            score: score,
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

module.exports = {
    createResult,
    getAllResults,
    getResultById,
    updateResult,
    deleteResult,
};