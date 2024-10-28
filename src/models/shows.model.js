import mongoose from "mongoose"

const ShowSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: false,
    },
    longitude: {
        type: Number,
        required: false,
    },
    location: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    genres: {
        type: [String],
        enum: ['Blues', 'Classical', 'Country', 'EDM', 'Folk', 'Funk', 'Hip-Hop', 'Jazz', 'Latin', 'Metal', 'Pop', 'Punk', 'Reggae', 'R&B', 'Rock', 'Soul'],
        required: false,
    },
    verified: {
        type: Boolean,
        default: false,
        required: false,
    }
}, { timestamps: true });

const Show = mongoose.models.Show || mongoose.model('Show', ShowSchema);

export default Show;
