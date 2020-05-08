import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps, Base } from "@typegoose/typegoose/lib/defaultClasses";
interface User extends Base<string> {}
class User extends TimeStamps {
    @prop()
    public _id!: string; // discord snowflake instead of ObjectId
}

const UserModel = getModelForClass(User);
export { User, UserModel };
