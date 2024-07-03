const { prisma } = require("./prisma");

const findGames = async (userId) => {
  return await prisma.games.findMany({
    where: {
      userId,
    },
  });
};

const saveGame = async (name, description, platform, userId) => {
  return await prisma.games.create({
    data: {
      name,
      description,
      platform,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

module.exports = {
  findGames,
  saveGame,
};
