import Cookieblob from "./Cookieblob";
import { User, GuildMember } from "discord.js"; 
enum Permission {
    botOwner,
    botDeveloper
}

function checkGlobal(cookieblob: Cookieblob, user: User, permission: Permission): Boolean {
    if (permission == Permission.botDeveloper && cookieblob.config.developerIDs.includes(user.id)) return true;
    if (permission == Permission.botOwner && user.id == cookieblob.config.ownerID) return true;
    return false;
};
function checkGuild(cookieblob: Cookieblob, member: GuildMember) {
    
}

export { Permission, checkGuild, checkGlobal };