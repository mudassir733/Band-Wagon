import mongoose from "mongoose"


const connect = async () => {

    if (mongoose.connections[0].readyState) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MongoDB successfully!")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}

export default connect;