import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import apiRouter from "./routes/api";
import { resolve } from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv-safe";
import passport from "passport";
import mongoose from "mongoose";
import setupAuth from "./auth";
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

// Conect to mongo
mongoose
    .connect(process.env.MONGO_URL || "mongodb://localhost:27017/cookieblob", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("connected to mongo"))
    .catch((e) => {
        throw e;
    });

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

setupAuth(); // discord oauth

// Routes
app.use("/api", apiRouter);

// Static serve
app.use(express.static(resolve("../frontend/public")));

// Nowhere else to go so 404
app.use((_req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => console.log(`listening on port ${port}`));
