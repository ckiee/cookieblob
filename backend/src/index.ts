import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import apiRouter from "./api";
import { resolve } from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv-safe";
import passport from "passport";
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

// Middleware
app.use(morgan("tiny"));
app.use(helmet());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        secret: process.env.SESSION_SECRET || "",
        resave: false,
        saveUninitialized: false,
        cookie: {}
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", apiRouter);

// Static serve
app.use(express.static(resolve("../frontend/public")));

// Nowhere else to go so 404
app.use((_req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => console.log(`listening on port ${port}`));
