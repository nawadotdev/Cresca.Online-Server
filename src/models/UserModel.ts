import { Schema, Document, Query, UpdateQuery, Model, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types";

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength : 3,
        maxLength : 12,
        trim : true
    },
    password: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default : 0
    },
    userRole: {
        type: Number,
        default : 0
    },
    passwordChangedAt: {
        type: Number,
        default : null
    },
    name : {
        type: String,
        required : true
    },
    surname : {
        type: String,
        required : true
    },
    phone : {
        type: Number,
        required : true,
        min: 1000,
        max: 99999999
    }
}, { timestamps: true })


userSchema.pre("save", function(next){
    if(this.isModified("password")){
        this.password = bcrypt.hashSync(this.password, 10)
    }
    next()
})

userSchema.pre("updateOne", async function (next) {
    const update = this.getUpdate() as { password?: string };

    if (update.password) {
        update.password = await bcrypt.hash(update.password, 10);
        this.setUpdate(update);
    }
    next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate() as { password?: string };

    if (update.password) {
        update.password = await bcrypt.hash(update.password, 10);
        this.setUpdate(update);
    }
    next();
});

userSchema.methods.confirmPassword = function(password: string): boolean {
    return bcrypt.compareSync(password, this.password)
}

export const UserModel: Model<IUser> = model<IUser>("User", userSchema);
