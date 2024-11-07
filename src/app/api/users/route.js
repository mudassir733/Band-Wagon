import User from "../../(domain)/entities/user.model";
import Show from "../../(domain)/entities/show.model.js";
import connect from "../../../utils/db/connect.js";
import mongoose from "mongoose";

export const GET = async (req) => {
    try {
        await connect();


        if (!mongoose.modelNames().includes('Show')) {
            mongoose.model('Show', Show.schema);
        }

        const users = await User.find({ role: "artist" }).populate("shows").lean();
        console.log(users);

        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Server error", error: error.message }),
            { status: 500 }
        );
    }
};