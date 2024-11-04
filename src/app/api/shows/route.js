import Show from "../../../models/shows.model.js";
import User from "../../../models/user.model.js"
import connect from "../../../utils/db/connect.js";

export const POST = async (req) => {
    try {
        await connect();

        const body = await req.json();
        const { userId, name, image, date, time, latitude, longitude, location, bio, genres } = body;


        if (!userId || !name || !date || !time || !location || !bio || !genres) {
            return new Response(
                JSON.stringify({ message: "Please provide all required fields, including user ID and genres." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }


        const genresArray = Array.isArray(genres) ? genres : [genres];

        const newShow = new Show({
            name,
            image,
            date: new Date(date),
            time,
            latitude,
            longitude,
            location,
            bio,
            genres: genresArray,
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
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error creating show:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error." }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};








export const GET = async (req) => {
    try {
        await connect();

        const genresParam = req.nextUrl.searchParams.get('genres');
        const time = req.nextUrl.searchParams.get('time');
        const filter = {};

        let genresArray = [];
        if (genresParam) {
            if (genresParam.includes(',')) {
                genresArray = genresParam.split(',').map(genre => genre.trim());
            } else {
                genresArray = [genresParam];
            }
            filter.genres = { $in: genresArray };
        }


        const validTimes = ['today', 'thisWeek', 'thisMonth', 'thisYear'];
        if (time && !validTimes.includes(time)) {
            return new Response(
                JSON.stringify({ message: 'Invalid time parameter.' }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }


        if (time) {
            const currentDate = new Date();
            let startDate, endDate;

            switch (time) {
                case 'today':
                    startDate = new Date(currentDate.setHours(0, 0, 0, 0));
                    endDate = new Date(currentDate.setHours(23, 59, 59, 999));
                    break;
                case 'thisWeek':
                    const dayOfWeek = currentDate.getDay(); // 0 (Sun) to 6 (Sat)
                    startDate = new Date(currentDate);
                    startDate.setDate(currentDate.getDate() - dayOfWeek);
                    startDate.setHours(0, 0, 0, 0);
                    endDate = new Date(startDate);
                    endDate.setDate(startDate.getDate() + 6);
                    endDate.setHours(23, 59, 59, 999);
                    break;
                case 'thisMonth':
                    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                    endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                    endDate.setHours(23, 59, 59, 999);
                    break;
                case 'thisYear':
                    startDate = new Date(currentDate.getFullYear(), 0, 1);
                    endDate = new Date(currentDate.getFullYear(), 11, 31);
                    endDate.setHours(23, 59, 59, 999);
                    break;
                default:
                    break;
            }

            filter.date = {
                $gte: startDate,
                $lt: endDate,
            };
        }

        console.log("Filter Applied:", filter);


        const shows = await Show.find(filter).lean().sort({ date: -1 });

        if (shows.length > 0) {

            return new Response(
                JSON.stringify({
                    message: 'Shows fetched successfully.',
                    shows
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }




        if (genresArray.length > 0) {
            const genresFilter = { genres: { $in: genresArray } };
            const genresMatchCount = await Show.countDocuments(genresFilter).lean();
            if (genresMatchCount === 0) {
                return new Response(
                    JSON.stringify({ message: 'No shows found for the specified genres.' }),
                    { status: 404, headers: { "Content-Type": "application/json" } }
                );
            }
        }

        if (time) {
            let timeFilter = {};
            const currentDate = new Date();
            switch (time) {
                case 'today':
                    timeFilter = {
                        date: {
                            $gte: new Date(currentDate.setHours(0, 0, 0, 0)),
                            $lt: new Date(currentDate.setHours(23, 59, 59, 999)),
                        }
                    };
                    break;
                case 'thisWeek':
                    const dayOfWeek = currentDate.getDay();
                    const weekStart = new Date(currentDate);
                    weekStart.setDate(currentDate.getDate() - dayOfWeek);
                    weekStart.setHours(0, 0, 0, 0);
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(startDate.getDate() + 6);
                    weekEnd.setHours(23, 59, 59, 999);
                    timeFilter = {
                        date: {
                            $gte: weekStart,
                            $lt: weekEnd,
                        }
                    };
                    break;
                case 'thisMonth':
                    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                    endOfMonth.setHours(23, 59, 59, 999);
                    timeFilter = {
                        date: {
                            $gte: startOfMonth,
                            $lt: endOfMonth,
                        }
                    };
                    break;
                case 'thisYear':
                    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
                    const endOfYear = new Date(currentDate.getFullYear(), 11, 31);
                    endOfYear.setHours(23, 59, 59, 999);
                    timeFilter = {
                        date: {
                            $gte: startOfYear,
                            $lt: endOfYear,
                        }
                    };
                    break;
                default:
                    timeFilter = {};
            }

            const timeMatchCount = await Show.countDocuments(timeFilter).lean();
            if (timeMatchCount === 0) {
                return new Response(
                    JSON.stringify({ message: 'No shows found for the specified time.' }),
                    { status: 404, headers: { "Content-Type": "application/json" } }
                );
            }
        }

        if (genresArray.length > 0 && time) {
            return new Response(
                JSON.stringify({ message: 'No shows found matching both genres and time.' }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }


        return new Response(
            JSON.stringify({ message: 'No shows found.' }),
            { status: 404, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error fetching shows:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch shows." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
