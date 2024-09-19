import express from "express";
import { createServer } from "http";
import { Server as IoServer } from "socket.io";

const app = express();
const server = createServer(app);
const port = 3000;
const io = new IoServer(server);

app.use(express.static("public"));

app.get("/", (_, res) => {
  res.sendFile(process.cwd() + "/main.html");
});

app.get("/command", (req, res) => {
  if (
    req.query["key"] &&
    ["up", "down", "left", "right"].includes(req.query["key"])
  ) {
    io.emit("maze-command", { key: req.query["key"] });
  }

  res.send();
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
