import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const objectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    // _id: objectId,
    name: String,
    email: String,
    password: String,
    role: String,
    created_at: Date,
    updated_at: Date,
    photo: String,
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;