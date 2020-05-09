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
import MongoStore from "connect-mongodb-session";
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

// Conect to mongo
const mongoUrl =
    process.env.MONGO_URL || "mongodb://localhost:27017/cookieblob";
mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("connected to mongo"))
    .catch((e) => {
        throw e;
    });
// Mongo session store
const store = new (MongoStore(session))({
    uri: mongoUrl,
    collection: "session"
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
        cookie: {},
        store
    })
);

setupAuth(); // discord oauth

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", apiRouter);

// Static serve
app.use(express.static(resolve("../frontend/public")));

// Nowhere else to go so we serve index.html because SPA
app.use((_req, res) => {
    res.sendFile(resolve("../frontend/public/index.html"));
});

app.listen(port, () => console.log(`listening on port ${port}`));
