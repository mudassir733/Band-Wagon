import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { findUserByEmail, verifyPassword, createUser, updateUserProfileImage, mapUserToToken } from '../../../(application)/services/auth.service';

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
                const user = await findUserByEmail(credentials.email);

                if (!user) {
                    throw new Error('No user found with this email');
                }

                const isValidPassword = await verifyPassword(credentials.password, user.password);
                if (!isValidPassword) {
                    throw new Error('Invalid email or password');
                }

                return mapUserToToken(user);
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 3 * 24 * 60 * 60, // 3 days
    },
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                token = { ...token, ...mapUserToToken(user, profile?.picture) };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
        async signIn({ user, account, profile }) {
            try {
                const existingUser = await findUserByEmail(user.email);
                const profileImage = account.provider === 'google' ? profile.picture : "";

                if (!existingUser) {
                    const newUser = await createUser({
                        email: user.email,
                        name: profile?.name || "Default Name",
                        location: profile?.locale || "Unknown",
                        profileImage,
                        googleId: account.provider === 'google' ? account.providerAccountId : "",
                    });
                    return !!newUser;
                } else if (account.provider === 'google') {
                    await updateUserProfileImage(existingUser, profile.picture);
                }

                return true;
            } catch (error) {
                console.error('Error during sign-in:', error);
                return false;
            }
        }
    },
});

export { handler as GET, handler as POST };
