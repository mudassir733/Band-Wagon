import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: false,
        default: "Andy user"
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        },
    },
    confirmPassword: {
        type: String,
        required: false,
    },
    googleId: {
        type: String,
        required: false,
    },
    profileImage: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png",
    },
    role: {
        type: String,
        enum: ["user", "artist"],
        default: "user",
    },
    shows: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Show',
        },
    ],
    location: {
        type: String,
        required: false,
        default: null,
    },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
