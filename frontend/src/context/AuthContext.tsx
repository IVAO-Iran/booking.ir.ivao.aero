import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/User";
import { IocContext } from "./IocContext";

interface IAuthContext {
  signed: boolean;
  user: User | null;
  token: string;
  signIn: (ivaoToken: string) => Promise<void>;
  signOut: () => void;
  loading: Boolean;
}

export const AuthContext = createContext<IAuthContext>({
  signIn: (ivaoToken: string) => Promise.reject(),
  signOut: () => {},
  signed: false,
  token: "",
  user: null,
  loading: true,
});

export const AuthProvider: FunctionComponent = ({ children }) => {
  const { authClient } = useContext(IocContext);
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setLoading(true);
      authClient
        .getAuth()
        .then(setUser)
        .catch(() => {
          setToken("");
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [authClient, token]);

  const signIn = async (ivaoToken: string) => {
    const { jwt } = await authClient.auth(ivaoToken);
    setToken(jwt);
    localStorage.setItem("token", jwt);
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signed: user ? user.isAdmin && !user.suspended : false,
        token,
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
