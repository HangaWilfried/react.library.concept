import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type User = {
  id: number;
  privileges: string[];
};

type ContextProps = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

const AuthContext = createContext<ContextProps>({} as ContextProps);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ id: 0, privileges: [] });

  return (
    <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
  );
};