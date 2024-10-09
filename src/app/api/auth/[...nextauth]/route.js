import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import connect from '../../../../utils/db/connect.js';
import User from '../../../../models/user.model';
import bcrypt from 'bcrypt';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connect();

                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error('No user found with this email');
                }

                const isValidPassword = await bcrypt.compare(credentials.password, user.password);

                if (!isValidPassword) {
                    throw new Error('Invalid email or password');
                }

                return {
                    id: user._id,
                    name: user.username,
                    email: user.email,
                    profileImage: user.profileImage || null,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 3 * 24 * 60 * 60,
    },
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name || user.username;


                if (account?.provider === 'google') {
                    token.profileImage = profile.picture;
                } else {
                    token.profileImage = user.profileImage;
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.profileImage = token.profileImage;
            return session;
        },
        async signIn({ user, account, profile }) {
            try {
                await connect();

                const existingUser = await User.findOne({ email: user.email });

                // If signing in with Google, store Google profile picture
                const profileImage = account.provider === 'google' ? profile.picture : "";

                if (!existingUser) {
                    const newUser = new User({
                        username: user.name || `user_${account.providerAccountId}`,
                        name: profile?.name || null,
                        email: user.email,
                        googleId: account.provider === 'google' ? account.providerAccountId : "",
                        profileImage: profileImage || undefined,
                    });

                    await newUser.save();
                } else if (account.provider === 'google' && !existingUser.profileImage) {
                    existingUser.profileImage = profile.picture;
                    await existingUser.save();
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
