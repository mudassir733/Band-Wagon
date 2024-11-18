import connect from '../../../(infrastructure)/db/connect.js';
import User from '../../../(domain)/entities/user.model.js';
import bcrypt from "bcrypt"
import { ObjectId } from 'mongodb';
import { getUser, updateUser } from "../../../(application)/use-case/createUser.js"




export async function GET(req, { params }) {
    const { id } = params;

    if (!id || !ObjectId.isValid(id)) {
        return new Response(JSON.stringify({ message: "Invalid user ID" }), { status: 400 });
    }
    try {
        const { user, success, message } = await getUser(id)

        if (!success) {
            return new Response(JSON.stringify({ message }), { status: 404 });

        }

        return new Response(JSON.stringify({ user }), { status: 200 })
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
        console.log("user data from request json", name, username, location, profileImage, role, confirmPassword)

        if (!id || !ObjectId.isValid(id)) {
            return new Response(JSON.stringify({ message: 'Invalid user ID' }), {
                status: 400,
            });
        }

        const updatedUserData = {
            ...(name && { name }),
            ...(username && { username }),
            ...(location && { location }),
            ...(profileImage && { profileImage }),
            ...(role && { role }),
            ...(email && { email }),
        }



        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                return new Response(JSON.stringify({ message: 'Passwords do not match' }), {
                    status: 400,
                });
            }
            updatedUserData.password = password;
        }

        const { success, user, message } = await updateUser(id, updatedUserData)

        if (!success) {
            return new Response(JSON.stringify({ message }), { status: 404 });

        }


        return new Response(
            JSON.stringify({
                message: 'User updated successfully',
                user
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