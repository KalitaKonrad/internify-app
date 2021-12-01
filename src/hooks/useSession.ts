import React from 'react';

// const SessionContext = React.createContext<Session>({
//   login: throwOnMisuse,
//   logout: throwOnMisuse,
//   updateUser: throwOnMisuse,
//   registerUser: throwOnMisuse,
//   updateConsent: throwOnMisuse,
//   confirmReferralInvite: throwOnMisuse,
//   isLoading: true,
//   userType: 'business',
// });
//
// export const SessionProvider: React.FC = ({ children }) => {
//   const state = useSessionState();
//
//   return (
//     <SessionContext.Provider value={state}>
//       <ErrorModal error={state.error} />
//       {children}
//     </SessionContext.Provider>
//   );
// };
//
// export const useSession = (): Session => useContext(SessionContext);
