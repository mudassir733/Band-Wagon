import { NextResponse } from 'next/server';
import { authenticateUser, signInUser } from '../../../(application)/services/auth.service';

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        console.log(email, password);


        const user = await authenticateUser(email, password);
        console.log(user);

        const signInResponse = await signInUser(email, password);


        if (signInResponse.error) {
            return NextResponse.json({ message: 'Login failed', error: signInResponse.error }, { status: 401 });
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
        return NextResponse.json({ message: error.message || 'Internal server error' }, { status: 500 });
    }
}
