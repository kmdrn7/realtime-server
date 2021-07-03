import {Server, Socket} from "socket.io";
import {default as Redis} from "ioredis";
import {redisOptions} from "@/common/redis";
import {default as http} from "http";
import {createAdapter} from "socket.io-redis";
import {SensorType, getSensorModel} from "./mongo/models/Sensor";

const ioEvents = (io: Server) => {
  io.of("/sensor").on("connection", (socket: Socket) => {
    socket.on("join", async (orderSerial: string) => {
      console.log("JOINED");
    });

    socket.on("leave", (orderSerial: string) => {
      socket.leave(orderSerial);
    });

    socket.on("sendMessage", async (data: SensorType) => {
      socket.emit("asdasasd")
    });
  });
};

export const init = (app: http.Server) => {
  const pubClient = new Redis({...redisOptions});
  const subClient = pubClient.duplicate();
  const io = new Server(app, {
    cors: {
      origin: "*",
    },
  });
  io.adapter(createAdapter({pubClient, subClient}));
  ioEvents(io);
};