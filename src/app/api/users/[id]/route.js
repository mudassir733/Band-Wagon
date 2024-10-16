import connect from '../../../../utils/db/connect.js';
import User from '../../../../models/user.model.js';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
    const { id } = params;

    try {
        await connect();

        let user;
        if (ObjectId.isValid(id)) {
            user = await User.findById(id);
        }


        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), {
                status: 404,
            });
        }

        return new Response(
            JSON.stringify({
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                location: user.location,
                role: user.role,
                profileImage: user.profileImage,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching user:', error.message);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
        });
    }
}






export async function PUT(req, { params }) {
    const { id } = params;

    try {
        const { name, username, location, profileImage, role } = await req.json();
        console.log(name, username, location, profileImage, role)

        await connect();

        let user;
        if (ObjectId.isValid(id)) {
            user = await User.findById(id);
        }

        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), {
                status: 404,
            });
        }

        user.name = name || user.name;
        user.username = username || user.username;
        user.location = location || user.location;
        user.profileImage = profileImage || user.profileImage;
        user.role = role || user.role;

        await user.save();


        return new Response(
            JSON.stringify({
                message: 'User updated successfully',
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                location: user.location,
                role: user.role,
                profileImage: user.profileImage,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating user:', error.message);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
        });
    }
}