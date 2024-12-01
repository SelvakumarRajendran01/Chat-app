import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import dotEnv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRoute.js";
import { Server as openSocket } from "socket.io";
import http from "http";
import userRouter from "./routes/userRoute.js";
import {
  createRoomAndJoin,
  sendMessage,
  justJoinRoom,
  setSocketId,
} from "./controller/eventHandler.js";
import { fileURLToPath } from "url";

// Get the current directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV !== "production") {
  dotEnv.config();
}

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3001; // Change port to 3001

export const io = new openSocket(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000" || path.join(__dirname, "client/build"),
    credentials: true,
  })
);

/*EXPRESS ROUTES */
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

/**Static files*/

if (process.env.NODE_ENV === "production") {
  // Serve static files
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

//Error Handling
app.use(function (req, res) {
  res.type("json");
  res.status(400).send({ errors: res.errors });
});

const userSendingMsg = {};
/**Socket */

io.on("connect", (socket) => {
  console.log("socket connected");
  socket.on("join", (data) => {
    socket.join(data.roomName);
  });

  socket.on("chat", (data) => {
    console.log(data);
    io.in(data.room).emit("chat", data.message);
  });
  socket.on("set-socket-id", (data) => {
    setSocketId(data, socket.id);
  });
  socket.on("join-room", (data) => {
    const { userId, user2Id } = data;
    createRoomAndJoin(socket, data, userSendingMsg);
  });

  socket.on("req-join-room", (data) => {
    console.log("JOIN ROOM REQUESTED", data);
  });

  socket.on("send-msg", (data) => {
    sendMessage(data, socket);
  });

  socket.on("just-join-room", (data) => {
    justJoinRoom(socket, data);
  });
});

/*STARTING APP*/
server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log("server running on port ", +port);
});

/*MONGOOSE CONFIG*/
(async () => {
  try {
    const dbUrl =
      process.env.MONGODB_URL ||
      "mongodb+srv://admin-sk:M0h@n$3!v@@massanger.q2rtj.mongodb.net/?retryWrites=true&w=majority&appName=Massanger"; // Ensure URL is set properly
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "massenger-db",
    });

    const db = mongoose.connection;
    db.on("error", (err) => {
      console.error("Connection error:", err);
      throw err; // You can either throw or just log depending on your need
    });

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log("MONGODB ERROR: ", error);
  }
})();
