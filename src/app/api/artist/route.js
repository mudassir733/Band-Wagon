import ArtistsPage from "../../(domain)/entities/artist.model";
import connect from "../../(infrastructure)/db/connect";


// POST: Create Artist
export async function POST(req) {


    await connect();

    try {
        const { artistName, location, bio, startDate, showsPerformed, genres, profileImage } = await req.json();


        if (!artistName || !location || !bio || !startDate || !genres || !profileImage || !showsPerformed) {
            return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
        }

        const artist = new ArtistsPage({
            profileImage,
            artistName,
            location,
            bio,
            startDate,
            showsPerformed,
            genres
        });

        await artist.save();
        return new Response(JSON.stringify({ message: "Artist page created successfully", artist }), { status: 201 });
    } catch (error) {
        console.error(error.message);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}




export async function GET() {
    try {
        await connect();

        const artists = await ArtistsPage.find().lean().sort({ createdAt: -1 });

        if (!artists || artists.length === 0) {
            return new Response(
                JSON.stringify({ message: 'No artists found' }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify(artists), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching artists:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch artists" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}