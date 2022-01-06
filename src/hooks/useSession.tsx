import React, { useCallback, useContext, useMemo } from 'react';
import { useAxios } from './useAxios';
import { useIsMounted } from './useIsMounted';
import useSWR from 'swr';

export type UserPayload = UserEmployeePayload | UserCompanyPayload;

export enum UserType {
  IS_COMPANY = 'is_company',
  IS_EMPLOYEE = 'is_employee',
}

export interface UserEmployeePayload {
  id: number;
  user: {
    id: number;
    username: string;
    email: string;
    user_type: UserType;
  };
}

export interface UserCompanyPayload {
  id: number;
  name: string;
  slug: string;
  owner: {
    id: number;
    username: string;
    email: string;
    user_type: UserType;
  };
}

export type LoginUser = (email: string, password: string) => Promise<UserPayload>;

// export type RegisterUser = (email: string, username: string, password: string) => Promise<UserPayload>;

export type LogoutUser = () => Promise<void>;

export interface Session {
  isLoading: boolean;
  // session?: UserPayload;
  login: LoginUser;
  logout: LogoutUser;
  // registerUser: RegisterUser;
  userType: UserType;
  userEmployee: UserEmployeePayload;
  userCompany: UserCompanyPayload;
  isAuth: boolean;
}

const SessionContext = React.createContext<Session>({
  isLoading: true,
  // session: null,
  login: () => null,
  logout: () => null,
  // registerUser: () => null,
  userType: null,
  userEmployee: null,
  userCompany: null,
  isAuth: false,
});

const userInfoUrl = 'auth/me/';

const isEmployeeUser = (userPayload: UserPayload) => {
  return 'user' in userPayload;
};

const useSessionState = (): Session => {
  const axios = useAxios();

  const isMounted = useIsMounted();
  const getUserInfo = useCallback((url) => axios.get(url).then((res) => res.data), [axios]);

  const {
    data: { data = {} } = {},
    error,
    mutate,
  } = useSWR(userInfoUrl, getUserInfo, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  const userType: UserType = isMounted && isEmployeeUser(data) ? UserType.IS_EMPLOYEE : UserType.IS_COMPANY;

  const session: UserPayload = isMounted ? data : undefined;
  const userEmployee: UserEmployeePayload = isMounted && userType === UserType.IS_EMPLOYEE ? data : undefined;
  const userCompany: UserCompanyPayload = isMounted && userType === UserType.IS_COMPANY ? data : undefined;

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
        mutate(userInfoUrl);
      } catch (e) {
        console.error(e);
      }

      return session;
    },
    [axios, mutate, session],
  );

  const resetPassword = useCallback(
    async (data: { username: string; password: string; email: string; user_type: UserType }) => {
      try {
        await axios.post('auth/register/', data);
      } catch (e) {
        console.error(e);
      }
    },
    [axios],
  );

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
  }, [mutate]);

  // We want to have a referential equality between returned objects
  return useMemo(
    () => ({ login, isLoading: !session, logout, isAuth: !!session?.id, userEmployee, userCompany, userType }),
    [login, session, logout, userEmployee, userCompany, userType],
  );
};

export const SessionProvider: React.FC = ({ children }) => {
  const state = useSessionState();

  return <SessionContext.Provider value={state}>{children}</SessionContext.Provider>;
};

export const useSession = (): Session => useContext(SessionContext);
