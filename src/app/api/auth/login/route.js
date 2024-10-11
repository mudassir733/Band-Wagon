import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connect from '../../../../utils/db/connect.js';
import User from '../../../../models/user.model.js';

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        console.log(email, password);


        await connect();


        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

        console.log(user);



        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }


        return NextResponse.json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.username,
                email: user.email,
                profileImage: user.profileImage || null,
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Error logging in user:', error.message);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
