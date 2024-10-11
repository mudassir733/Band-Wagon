import connect from '../../../utils/db/connect.js';
import User from '../../../models/user.model.js';
import { ObjectId } from 'mongodb';

export async function PUT(req) {
    try {
        const { id, name, username, location } = await req.json();
        console.log("Received data:", { id, name, username, location });

        await connect();

        if (!id) {
            return new Response(JSON.stringify({ message: 'User ID not provided' }), {
                status: 400,
            });
        }

        let user;

        if (ObjectId.isValid(id) && String(new ObjectId(id)) === id) {
            try {
                user = await User.findById(new ObjectId(id));
            } catch (error) {
                console.error('Error finding user by MongoDB ID:', error.message);
            }
        }

        if (!user) {
            try {
                user = await User.findOne({ googleId: id });
            } catch (error) {
                console.error('Error finding user by googleId:', error.message);
            }
        }

        if (user) {
            user.name = name;
            user.username = username;
            user.location = location;
            await user.save();

            return new Response(JSON.stringify({ message: 'Profile updated successfully' }), {
                status: 200,
            });
        } else {
            return new Response(JSON.stringify({ message: 'User not found' }), {
                status: 404,
            });
        }
    } catch (error) {
        console.error('Error updating profile:', error.message);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
        });
    }
}

