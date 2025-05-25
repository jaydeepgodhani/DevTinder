const socket = require("socket.io");
const { Chat } = require("../models/chat");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    // handle events
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const room = [userId, targetUserId].sort().join("_");
      console.log(firstName + " joining room : ", room);
      socket.join(room);
    });

    socket.on("sendMessage", async({ firstName, lastName, userId, targetUserId, text }) => {
      const roomId = [userId, targetUserId].sort().join("_");
      console.log(`message received from ${firstName} : ${text}`);

      // save msg to database
      try {
        let chat = await Chat.findOne({
          participants: { $all: [userId, targetUserId] }
        });

        if(!chat) {
          chat = new Chat({
            participants: [userId, targetUserId],
            messages: [],
          })
        }
        chat.messages.push({
          senderId: userId,
          text
        });

        await chat.save();
        io.to(roomId).emit("messageReceived", { firstName, lastName, text });
      } catch (err) {
        console.log(err);
      }

    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
