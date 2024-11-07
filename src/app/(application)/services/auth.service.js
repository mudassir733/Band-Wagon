
import connect from '../../../utils/db/connect.js';
import User from '../../(domain)/entities/user.model';
import bcrypt from 'bcrypt';


export const findUserByEmail = async (email) => {
    await connect();
    return await User.findOne({ email });
};


export const verifyPassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};


export const createUser = async ({ email, name, location, profileImage, googleId }) => {
    await connect();
    const newUser = new User({
        email,
        username: name || `user_${googleId || "unknown"}`,
        name,
        location: location || "Unknown",
        googleId,
        profileImage,
    });
    await newUser.save();
    return newUser;
};


export const updateUserProfileImage = async (user, profileImage) => {
    if (!user.profileImage) {
        user.profileImage = profileImage;
        await user.save();
    }
};


export const mapUserToToken = (user, profileImage) => {
    return {
        id: user._id,
        email: user.email,
        name: user.username,
        role: user.role,
        profileImage: profileImage || user.profileImage || null,
        location: user.location || "Unknown",
    };
};



export const authenticateUser = async (email, password) => {
    await connect();
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid email or password');
    }

    return user;
};