import { userRepository } from "../../(infrastructure)/repositories/userRepository";
import bcrypt from "bcrypt"

export const createUser = async (userData) => {
    try {
        // destructure userData
        const { email, password } = userData;
        // if user already exsist in the database
        const existingUser = await userRepository.findUserByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserData = { ...userData, password: hashedPassword }
        // create new user
        const user = await userRepository.createUser(newUserData)
        console.log("User:", user);
        return {
            success: true,
            user
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

// get user
export const getUser = async (userId) => {
    try {
        const user = await userRepository.getUserById(userId);
        console.log("User Data:", user._id);

        if (!user) {
            throw new Error("User not found");
        }
        return {
            success: true,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                location: user.location,
                role: user.role,
                profileImage: user.profileImage,
            }
        }


    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}