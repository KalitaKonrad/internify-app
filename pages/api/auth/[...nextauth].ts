import NextAuth, { Session, User } from 'next-auth';
import Providers from 'next-auth/providers';
import { useAxios } from '../../../src/hooks/useAxios';
import { JWT } from 'next-auth/jwt';
import { Awaitable } from 'next-auth/internals/utils';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User> {
        const axios = useAxios();
        try {
          const res = await axios.post(
            'token/',
            {
              email: credentials.username,
              password: credentials.password,
            },
            {
              headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
              },
            },
          );

          if (res.status === 200) {
            return res.data;
          }
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  // A database is optional, but required to persist accounts in a database
  // database: {
  //   type: 'sqlite',
  //   database: ':memory:',
  //   synchronize: process.env.NODE_ENV !== 'production',
  // },

  // jwt: {
  //   verificationOptions: {
  //     algorithms: ['HS256'],
  //   },
  //   secret: process.env.JSON_SIGNING_KEY_SECRET,
  // },

  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        token.accessToken = user.access;
        token.refreshToken = user.refresh;
      }

      return token;
    },
    session: async (session, token) => {
      console.log({ session });
      console.log({ token });

      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    error: '/', // Changing the error redirect page to our custom login page
  },
});
