import React, { useCallback, useContext, useMemo } from 'react';
import { useAxios } from './useAxios';
import { useIsMounted } from './useIsMounted';
import useSWR from 'swr';

export type UserPayload = {
  email: string;
  username: string;
};

export type LoginUser = (email: string, password: string) => Promise<UserPayload>;

export type RegisterUser = (email: string, username: string, password: string) => Promise<UserPayload>;

export type LogoutUser = () => Promise<void>;

export interface Session {
  isLoading: boolean;
  session?: UserPayload;
  login: LoginUser;
  logout: LogoutUser;
  registerUser: RegisterUser;
  userType: string;
}

const SessionContext = React.createContext<Session>({
  isLoading: true,
  session: null,
  login: () => null,
  logout: () => null,
  registerUser: () => null,
  userType: null,
});

const userInfoUrl = 'auth/me/';

const useSessionState = (): Session => {
  const axios = useAxios();

  const isMounted = useIsMounted();
  const getUserInfo = useCallback((url) => axios.get(url).then((res) => res.data), []);

  const {
    data: { data = {} } = {},
    error,
    mutate,
  } = useSWR(userInfoUrl, getUserInfo, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  const session = isMounted ? data : undefined;

  const login: LoginUser = useCallback(
    async (email, password) => {
      try {
        const {
          data: {
            data: { tokens },
          },
        } = await axios.post('auth/login/', { email, password });

        const prepareTokens = tokens.replaceAll('"', '').replaceAll("'", '"');

        const { access, refresh }: { access: string; refresh: string } = JSON.parse(prepareTokens);
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
      } catch (e) {
        console.error(e);
      }

      return session;
    },
    [axios, session],
  );
  //
  // const resetPassword = useCallback(
  //   async (email) => {
  //     try {
  //       const {
  //         data: {
  //           data: { tokens },
  //         },
  //       } = await axios.post('auth/request-reset-email/', { email, password });
  //
  //       const prepareTokens = tokens.replaceAll('"', '').replaceAll("'", '"');
  //
  //       const { access, refresh }: { access: string; refresh: string } = JSON.parse(prepareTokens);
  //       localStorage.setItem('access', access);
  //       localStorage.setItem('refresh', refresh);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //
  //     return session;
  //   },
  //   [axios, session],
  // );

  const logout: LogoutUser = useCallback(async () => {
    try {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      // revalidate user -> should not be authenticated after token removal from localStorage
      mutate(userInfoUrl);
      window.location.href = '/';
    } catch (e) {
      console.error(e);
    }

    return session;
  }, [mutate]);

  console.log({ session });
  // We want to have a referential equality between returned objects
  return useMemo(() => ({ login, isLoading: !session, session, logout }), [login, session, logout]);
};

export const SessionProvider: React.FC = ({ children }) => {
  const state = useSessionState();

  return <SessionContext.Provider value={state}>{children}</SessionContext.Provider>;
};

export const useSession = (): Session => useContext(SessionContext);
