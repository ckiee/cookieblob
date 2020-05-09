import { Router } from "express";
import passport from "passport";
import { requireAuth } from "../auth";
import { User } from "../models/user";
import { DocumentType } from "@typegoose/typegoose";
const app = Router();

app.get("/me", requireAuth, (req, res) => {
    const u = req.user as DocumentType<User>;
    res.json(u.safe);
});

export default app;
