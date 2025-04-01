//CRUD Sessions
const prisma = require("../../lib/prisma").prisma;

async function createSession(title) {
    const session = await prisma.session.create({
        data: {
        title: title,
        },
    });
    return session;
}

async function getAllSessions() {
    const sessions = await prisma.session.findMany({});
    return sessions;
}

async function getSessionById(id) {
    const session = await prisma.session.findUnique({
        where: {
        id: id,
        },
    });
    return session;
}

//get current session
// This function assumes that the latest session is the current one
async function getCurrentSession() {
    const currentSession = await prisma.session.findFirst({
        orderBy: {
        createdAt: "desc",
        },
    });
    console.log(currentSession || "no current session found");
    return currentSession;
}

async function updateSession(id, title) {
    const session = await prisma.session.update({
        where: {
        id: id,
        },
        data: {
        title: title,
        },
    });
    return session;
}

async function deleteSession(id) {
    const session = await prisma.session.delete({
        where: {
        id: id,
        },
    });
    return session;
}

async function endSession(id) {
    const session = await prisma.session.update({
        where: {
        id: id,
        },
        data: {
            isEnded: true,
            endedAt: new Date(),
        }
    })
    return session;
}

module.exports = {
    createSession,
    getAllSessions,
    getSessionById,
    getCurrentSession,
    updateSession,
    deleteSession,
    endSession
};
