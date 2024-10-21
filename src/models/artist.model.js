const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    profileImage: {
        type: String,
        required: true,
    },
    artistName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    showsPerformed: {
        type: Number,
        required: true,
        default: 0,
    },
    genre: {
        type: [String],
        required: true,
        enum: ['Blues', 'Classical', 'Country', 'EDM', 'Folk', 'Funk', 'Hip-Hop', 'Jazz', 'Latin', 'Metal', 'Pop', 'Punk', 'Reggae', 'R&B', 'Rock', 'Soul']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ArtistsPage = mongoose.model('Artist-Page', artistSchema);

export default ArtistsPage