import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { listenToAuthChanges } from '../lib/firebaseAuth';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToAuthChanges(async (currentUser) => {
      if (currentUser) {
        // Sync user to Firestore
        const path = `users/${currentUser.uid}`;
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            const isDefaultAdmin = currentUser.email === "pradexbisla1994@gmail.com" && currentUser.emailVerified;
            await setDoc(userRef, {
              email: currentUser.email,
              uid: currentUser.uid,
              role: isDefaultAdmin ? 'admin' : 'user',
              createdAt: serverTimestamp(),
            });
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, path);
        }
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
