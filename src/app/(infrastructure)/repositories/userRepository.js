import connect from "../db/connect.js"
import User from "../../(domain)/entities/user.model.js"


export const userRepository = {
    // find user by email
    async findUserByEmail(email) {
        try {
            await connect()
            return await User.findOne({ email })
        } catch (error) {
            throw new Error(`Error finding user by email: ${error.message}`)
        }
    },
    // create user
    async createUser(userData) {
        try {
            await connect()
            const user = new User(userData)
            console.log("user created:", user);

            await user.save()
            return user
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`)
        }
    },
    // get user
    async getUserById(userId) {
        try {
            await connect()
            const user = await User.findById(userId)
            return user
        } catch (error) {
            throw new Error(`Error getting user by id: ${error.message}`)
        }
    },

    // update user
    async updateUserById(userId, updatedUserData) {
        try {
            await connect()
            const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true })
            return user
        } catch (error) {
            throw new Error(`Error updating user by id: ${error.message}`)
        }
    },


} 