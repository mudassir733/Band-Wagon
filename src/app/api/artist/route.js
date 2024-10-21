
import ArtistsPage from "../../../models/artist.model.js";
import connect from "../../../utils/db/connect.js";


// POST: Create Artist
export async function POST(req) {


    await connect();

    try {
        const { artistName, location, bio, startDate, showsPerformed, genre, profileImage } = await req.json();


        if (!artistName || !location || !bio || !startDate || !genre || !profileImage) {
            return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
        }

        const artist = new ArtistsPage({
            profileImage,
            artistName,
            location,
            bio,
            startDate,
            showsPerformed,
            genre,
        });

        await artist.save();
        return new Response(JSON.stringify({ message: "Artist page created successfully", artist }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}




// GET: Fetch Artists
export async function GET(req, { params }) {


    await connect();
    try {
        const artists = await ArtistsPage.find();
        return new Response(JSON.stringify(artists), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to fetch artists" }), { status: 500 });
    }
}
