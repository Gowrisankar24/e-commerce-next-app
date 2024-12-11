import { client } from '@/sanity/lib/client';
import { AUTHOR_FIND_PROVIDER_BY_ID } from '@/sanity/lib/queries';
import { write_token } from '@/sanity/lib/write-token';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

interface User {
    name: string;
    email: string;
    image: string;
}
interface Profile {
    sub: string;
    given_name: string;
    bio?: string;
    id: string;
}
interface Token {
    id: string;
    sub: string;
}

interface session {
    id: string;
    sub: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user: { name, email, image }, profile }: { user: User; profile: Profile }) {
            //find existing user
            try {
                const exisitingUser = await client
                    .withConfig({ useCdn: false })
                    .fetch(AUTHOR_FIND_PROVIDER_BY_ID, {
                        id: `${profile?.sub}`,
                    });
                // create author type for new user
                if (!exisitingUser) {
                    await write_token.create({
                        _type: 'author',
                        id: profile?.sub,
                        name: name,
                        username: profile?.given_name,
                        email: email,
                        image: image,
                        bio: profile?.bio,
                    });
                }
                return true;
            } catch (error) {
                console.log('error', error);
                return false;
            }
        },
        async jwt({
            token,
            account,
            profile,
        }: {
            token: Token;
            account?: string;
            profile?: Profile;
        }) {
            try {
                if (account && profile) {
                    const user = await client
                        .withConfig({ useCdn: false })
                        .fetch(AUTHOR_FIND_PROVIDER_BY_ID, {
                            id: `${profile?.id}`,
                        });
                    token.id = user?._id;
                }
                return token;
            } catch (error) {
                console.log('error', error);
            }
        },

        async session({ session, token }: { token: Token; session: session }) {
            try {
                Object.assign(session, { id: token?.id });
                return session;
            } catch (error) {
                console.log(error);
                return session;
            }
        },
    },
});
