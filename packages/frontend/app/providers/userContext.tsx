import { createContext, useState, ReactNode } from "react";
import { UserType } from "~/lib/types";

export const UserContext = createContext<{
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
