import Show from "../../../models/shows.model.js";
import User from "../../../models/user.model.js"
import connect from "../../../utils/db/connect.js";

export const POST = async (req) => {
    try {
        await connect();

        const body = await req.json();
        const { userId, name, image, date, time, latitude, longitude, location, bio, genres } = body;

        if (!userId || !name || !date || !time || !location || !bio || !genres) {
            return new Response(JSON.stringify({ message: "Please provide all required fields, including user ID" }), {
                status: 400,
            });
        }


        const newShow = new Show({
            name,
            image,
            date,
            time,
            latitude,
            longitude,
            location,
            bio,
            genres,
            verified: false,
        });

        await newShow.save();

        const user = await User.findById(userId);
        if (user && user.role === "artist") {
            user.shows.push(newShow._id);
            await user.save();
        }

        return new Response(
            JSON.stringify({
                message: "Show created successfully!",
                show: newShow,
            }),
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error("Error creating show:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error" }),
            {
                status: 500,
            }
        );
    }
};





export const GET = async (req) => {
    try {
        await connect();

        const shows = await Show.find().lean().sort({ date: -1 });

        if (!shows || shows.length === 0) {
            return new Response(
                JSON.stringify({ message: 'No shows found' }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify(shows), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching shows:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch shows" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};






