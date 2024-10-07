import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import connect from '../../../../utils/db/connect.js';
import User from '../../../../models/user.model';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async signIn({ user, account }) {
            try {
                await connect();

                const existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    const newUser = new User({
                        username: user.name || `user_${account.providerAccountId}`,
                        email: user.email,
                        googleId: account.providerAccountId,
                    });

                    await newUser.save();
                }

                return true;
            } catch (error) {
                console.error('Error saving user:', error);
                return false;
            }
        },
    },
});

export { handler as GET, handler as POST };
