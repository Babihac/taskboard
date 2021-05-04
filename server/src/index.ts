import express from "express";
import { createConnection } from "typeorm";
import authRoter from "./routes/authRoutes";
import taskRouter from "./routes/taskRoute";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
require("dotenv").config();

declare module "express-session" {
  export interface SessionData {
    userid: any;
    username: any;
    loadedCount: any;
  }
}

const main = async () => {
  const app = express();

  app.use(bodyParser.json());

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );

  app.use(
    session({
      name: process.env.COOKIE_NAME,
      secret: process.env.SESSION_SECRET || "this cannot happen",
      saveUninitialized: true,
      resave: false,
      cookie: {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );

  app.use((req, res, next) => {
    console.log(req.session);
    next();
  });

  app.get("/", (req, res, next) => {
    if (!req.session!.userid) {
      req.session!.userid = req.query.userid;
      console.log("Userid is set haha");
      req.session!.loadedCount = 0;
    } else {
      req.session!.loadedCount = Number(req.session!.loadedCount) + 1;
    }

    res.send(
      `userid: ${req.session!.userid}, loadedCount: ${req.session!.loadedCount}`
    );
  });
  await createConnection();

  app.use(authRoter);
  app.use(taskRouter);

  app.listen(4001, () => {
    console.log("listening on port: 4001");
  });
};

main();
