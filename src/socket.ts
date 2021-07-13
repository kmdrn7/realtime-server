import {Server, Socket} from "socket.io";
import {default as Redis} from "ioredis";
import {redisOptions} from "@/common/redis";
import {default as http} from "http";
import {createAdapter} from "socket.io-redis";
import {instrument} from "@socket.io/admin-ui";
import {SensorType, getSensorModel} from "./mongo/models/Sensor";
import {now} from "moment";

const ioEvents = (io: Server) => {

  io.of("/sensor").on("connection", (socket: Socket) => {

    const sensor_serial = socket.handshake.query["sensor_serial"]

    if (sensor_serial){
      console.log(`Client ${sensor_serial} connected...`);
      socket.join(sensor_serial);
    }

    socket.on("disconnect", async () => {
      console.log(`Client ${sensor_serial} disconnected...`);
    });

    socket.on("sink", async (data) => {
      socket.to(data["sensor_serial"]).broadcast.emit("data", data)
    })

  });
};

export const init = (app: http.Server) => {
  const pubClient = new Redis({...redisOptions});
  const subClient = pubClient.duplicate();
  const io = new Server(app, {
    cors: {
      origin: "*",
    },
    transports: ["websocket", "polling"],
  });

  instrument(io, {
    auth: false
  });

  io.adapter(createAdapter({pubClient, subClient}));
  ioEvents(io);
};