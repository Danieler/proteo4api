import express, { Express, Application, Request, Response, NextFunction } from "express";
import * as http from "http";
import cors from "cors";
import debug, { IDebugger } from "debug";
import { RouteConfig } from "./Common/common.route.config";
import { UserRoutes } from "./User/user.route.config";
import { AuthRoutes } from "./Auth/auth.route.config";
import { EventRoutes } from "./Event/event.route.config";
import { EventCronjob } from "./Event/event.cronjob";
import jwt from "jsonwebtoken";
import * as socketio from "socket.io";
import EventService from "./Event/event.service";


const app: Express = express();
const routes: Array<RouteConfig> = [];

import { IUser } from "./User/user.interface";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

app.use(express.json());
app.use(cors());
app.use(async (req: any, res: Response, next: NextFunction) => {
  const idToken = req.headers.authorization || null;
  const user = await jwt.decode(idToken);
  req.currentUser = user;
  next();
});

const PORT = process.env.PORT || 8001;
const debugLog: IDebugger = debug("app");

if (process.env.DEBUG) {
  process.on("unhandledRejection", function (reason) {
    debugLog("Unhandled Rejection:", reason);
    process.exit(1);
  });
} else {
}
routes.push(new UserRoutes(app));
routes.push(new AuthRoutes(app));
routes.push(new EventRoutes(app));

const server: http.Server = http.createServer(app);
server.listen(PORT, () => {
  debugLog(`Server is running on ${PORT}`);

  routes.forEach((route: RouteConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });


});

const io = new socketio.Server(server, {  cors: {    origin: "http://localhost:4200",    methods: ["GET", "POST"]  }});

io.listen(8003);

//start cronjob  for send notification to events soon to start.
new EventCronjob(io);

console.log('socketio server listening on port ', 8003)
