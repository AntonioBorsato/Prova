const express = require("express");
const { router: userRouter } = require("./routes/user");
const { router: gameRouter } = require("./routes/games");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Ola mundo");
});

server.use(userRouter);
server.use(gameRouter);

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor rodando no http://localhost:${port}`);
});
