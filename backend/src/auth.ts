import passport from "passport";
import { User, UserModel } from "./models/user";
import { DocumentType } from "@typegoose/typegoose";
import {
    Strategy,
    Profile,
    VerifyCallback,
    Scope
} from "@oauth-everything/passport-discord";
import { Request, Response } from "express";
interface RawProfile {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    locale: string;
    mfa_enabled: boolean;
}
export default function setupAuth() {
    passport.serializeUser((user: DocumentType<User>, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id: string, done) => {
        const res = await UserModel.findById(id).exec();
        done(null, res);
    });
    passport.use(
        new Strategy(
            {
                clientID: process.env.CLIENT_ID || "",
                clientSecret: process.env.CLIENT_SECRET || "",
                callbackURL: `${process.env.BASE_URL || ""}/api/auth/callback`,
                scope: [Scope.IDENTIFY]
            },
            async (
                accessToken: string,
                refreshToken: string,
                usersMe: Profile,
                done: VerifyCallback<User>
            ) => {
                const profile = usersMe._json as RawProfile;
                const existing = await UserModel.findById(profile.id).exec();
                if (!existing) {
                    const newUser = await UserModel.create({
                        _id: profile.id,
                        username: profile.username,
                        discrim: profile.discriminator,
                        locale: profile.locale,
                        accessToken,
                        refreshToken
                    });
                    done(null, newUser);
                } else {
                    done(null, existing);
                }
            }
        )
    );
}
export function requireAuth(req: Request, res: Response, next: Function) {
    if (req.user) next();
    else res.status(401).json({ message: "Unauthorized" });
}
