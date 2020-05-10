import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps, Base } from "@typegoose/typegoose/lib/defaultClasses";
interface User extends Base<string> {}
class User extends TimeStamps {
    @prop()
    public _id!: string; // discord snowflake instead of ObjectId
    @prop({ required: true })
    public username!: string;
    @prop({ required: true })
    public discrim!: string;

    @prop({ required: true, default: "en-US" })
    public locale!: string;
    @prop({ required: true })
    public avatar!: string;
    @prop({ required: true })
    public accessToken!: string;
    @prop({ required: true })
    public refreshToken!: string;

    get tag() {
        return `${this.username}#${this.discrim}`;
    }
    get safe() {
        return {
            _id: this._id,
            username: this.username,
            discrim: this.discrim,
            locale: this.locale,
            avatar: this.avatar
        };
    }
}

const UserModel = getModelForClass(User);
export { User, UserModel };
