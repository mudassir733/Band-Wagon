import Shows from "../../../models/shows.model.js";
import connect from "../../../utils/db/connect.js";

export const POST = async (req) => {
    try {

        await connect();


        const body = await req.json();
        const { name, image, date, time, latitude, longitude, location, bio, genres } = body;

        if (!name || !date || !time || !location || !bio || !genres) {
            return new Response(JSON.stringify({ message: "Please provide all required fields" }), {
                status: 400,
            });
        }

        const newShow = new Shows({
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


        return new Response(JSON.stringify({
            message: "Show created successfully!",
            show: newShow,
        }), {
            status: 201,
        });

    } catch (error) {
        console.error("Error creating show:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500,
        });
    }
};
