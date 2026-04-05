import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { listenToAuthChanges } from '../lib/firebaseAuth';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isPaid: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isPaid: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const unsubscribe = listenToAuthChanges(async (currentUser) => {
      if (currentUser) {
        // Check if user is always paid
        const isAlwaysPaid = currentUser.email === "pradexbisla1994@gmail.com";
        const localPaidStatus = localStorage.getItem('isPaid') === 'true';
        setIsPaid(isAlwaysPaid || localPaidStatus);

        // Sync user to Firestore
        const path = `users/${currentUser.uid}`;
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            const isDefaultAdmin = currentUser.email === "pradexbisla1994@gmail.com" && currentUser.emailVerified;
            const isAlwaysPaid = currentUser.email === "pradexbisla1994@gmail.com";
            await setDoc(userRef, {
              email: currentUser.email,
              uid: currentUser.uid,
              role: isDefaultAdmin ? 'admin' : 'user',
              isPaid: isAlwaysPaid,
              createdAt: serverTimestamp(),
            });
          } else {
            // Ensure isPaid is true for the special email even if document exists
            const isAlwaysPaid = currentUser.email === "pradexbisla1994@gmail.com";
            if (isAlwaysPaid && !userSnap.data()?.isPaid) {
              await setDoc(userRef, { isPaid: true }, { merge: true });
            }
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
    <AuthContext.Provider value={{ user, loading, isPaid }}>
      {children}
    </AuthContext.Provider>
  );
};
