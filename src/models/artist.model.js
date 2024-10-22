const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    profileImage: {
        type: String,
        required: false,
    },
    artistName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
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
    genres: {
        type: [String],
        enum: ['Blues', 'Classical', 'Country', 'EDM', 'Folk', 'Funk', 'Hip-Hop', 'Jazz', 'Latin', 'Metal', 'Pop', 'Punk', 'Reggae', 'R&B', 'Rock', 'Soul'],
        validate: {
            validator: function (array) {
                return array.length >= 1;
            },
            message: 'At least one genre must be selected',
        },
        required: true,
    }
}, { timestamps: true });

const ArtistsPage =
    mongoose.models.ArtistsPage || mongoose.model('ArtistsPage', artistSchema);

export default ArtistsPage;