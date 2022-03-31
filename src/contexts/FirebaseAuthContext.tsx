import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../services/firebase";

type FirebaseAuthProviderProps = {
  children: ReactNode;
};

type User = {
  name: string;
  email: string;
  avatar: string;
};

type FirebaseAuthContextProps = {
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
  user: User | null;
  isAuthLoading: boolean;
};

export const FirebaseAuthContext = createContext<FirebaseAuthContextProps>(
  {} as FirebaseAuthContextProps
);

export function FirebaseAuthProvider({ children }: FirebaseAuthProviderProps) {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const handleLogin = async () => {
    await setPersistence(auth, browserLocalPersistence);
    const { user } = await signInWithPopup(auth, provider);

    setUser({
      name: String(user.displayName),
      email: String(user.email),
      avatar: String(user.photoURL),
    });
  };

  const handleLogout = async () => await signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthLoading(true);
        setUser({
          name: String(user.displayName),
          email: String(user.email),
          avatar: String(user.photoURL),
        });
        setIsAuthLoading(false);
      } else {
        setUser(null);
        setIsAuthLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <FirebaseAuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        user,
        isAuthLoading,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
}

export const useFirebaseAuth = () => useContext(FirebaseAuthContext);
