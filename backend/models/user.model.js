import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
username: { type: String, required: true },
password : String,
likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
}, {collection: 'users'});

const User = new mongoose.model('User' , userSchema);
export default User ;