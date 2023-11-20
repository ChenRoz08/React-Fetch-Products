import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../models/users";
import { getUser } from "../services/users";

type UserContextType = {
  user: User | null;
  updateToken: (newToken: string) => void;
  logout: () => void;
};

const UserContext = createContext({} as UserContextType);

export function useUser() {
  return useContext(UserContext);
}

export function UserContextprovider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(() => {
    const storageToken = localStorage.getItem("chen-token");
    if (storageToken === null) return "";
    return storageToken;
  });

  useEffect(() => {
    if (token === "") return;
    getUser(token).then((res) => {
      if (res !== null) setUser(res);
    });
  }, [token]);

  function updateToken(newToken: string) {
    setToken(newToken);
    localStorage.setItem("chen-token", newToken);
    getUser(token).then((res) => {
      if (res !== null) setUser(res);
    });
  }

  function logout() {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, updateToken, logout }}>
      {children}
    </UserContext.Provider>
  );
}
