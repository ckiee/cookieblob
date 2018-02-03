import { Permission } from "./Permissions";
interface Command {
    name: string;
    description: string;
    usage: string[];
    permissionLevel: Permission;
    guildOnly: boolean;
    run: Function;
}
export default Command;