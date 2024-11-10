import connect from '../../../(infrastructure)/db/connect.js';
import User from '../../../(domain)/entities/user.model.js';
import bcrypt from "bcrypt"
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
        const { name, username, location, profileImage, role, confirmPassword, password, email } = await req.json();
        console.log(name, username, location, profileImage, role, confirmPassword)

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
        user.email = email || user.email;
        user.profileImage = profileImage || user.profileImage;
        user.role = role || user.role;

        if (email) {
            user.email = email
        }


        if (password && confirmPassword) {
            if (password === confirmPassword) {
                user.password = password
            } else {
                return new Response(JSON.stringify({ message: 'Passwords do not match' }), {
                    status: 400,
                });
            }
        }

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




export async function DELETE(req, { params }) {
    const { id } = params;

    try {

        await connect();


        const { password } = await req.json();


        if (!ObjectId.isValid(id)) {
            return new Response(JSON.stringify({ message: 'Invalid user ID' }), {
                status: 400,
            });
        }


        const user = await User.findById(id);
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), {
                status: 404,
            });
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ message: 'Invalid password' }), {
                status: 400,
            });
        }


        await User.findByIdAndDelete(id);

        return new Response(
            JSON.stringify({ message: 'User deleted successfully', id }),
            { status: 200 }
        );

    } catch (error) {
        console.error('Error deleting user:', error.message);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
        });
    }
}