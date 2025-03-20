import { IUser, userType } from '@todo-turbo/schema';
import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IUser &
      DefaultSession['user'] & {
        token: string;
      };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        let user = null;
        let data = null;
        try {
          data = await (
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/sign-in`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(credentials),
            })
          ).json();
        } catch (err) {
          console.log(err);
          throw new Error('User not found.');
        }
        try {
          user = userType.parse(data.user);
        } catch (err) {
          console.log(err);
          throw new Error('User not found.');
        }
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error('User not found.');
        }

        // return user object with their profile data
        return {
          ...user,
          token: data.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      return {
        ...token,
        ...user,
      };
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...token,
        },
      };
    },
  },
});
