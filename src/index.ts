import express from "express";
import {env} from "@/common/env";
import {default as http} from "http";
import {mongodbConnect} from "./mongo";
import {init as SocketIO} from "./socket";
import {log} from "@/common/log";
import cors from "cors";

mongodbConnect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: "*"
}))

const httpServer = http.createServer(app);

SocketIO(httpServer);

httpServer.listen(env.PORT, () => {
  log.info(
    `🚀 GraphQL service ready at http://localhost:${env.PORT}`,
  );
  log.info(
    `🚀 Subscriptions ready at ws://localhost:${env.PORT}`,
  );
});