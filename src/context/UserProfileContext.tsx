import React, { createContext, useEffect, useState } from "react";
import { useAuth } from "../api/hooks/useAuth";
import { projectFirestore } from "../firebase/config";

export interface IUserProfileContext {
  userProfile: IUserProfile | undefined;
}

export interface IUserProfile {
  name: string;
  email: string;
}

export const UserProfileContext = createContext<
  IUserProfileContext | undefined
>(undefined);

export function UserProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userProfile, setUserProfile] = useState<IUserProfile | undefined>();
  const { authState } = useAuth();

  useEffect(() => {
    if (authState.user) {
      return projectFirestore
        .collection(`users`)
        .doc(`${authState.user?.uid}`)
        .onSnapshot(
          (doc) => {
            if (!doc.exists) {
              console.log("no user found");
            } else {
              setUserProfile(doc.data() as IUserProfile);
            }
          },
          (error) => {
            console.log(error.message);
          }
        );
    } else {
      setUserProfile(undefined);
    }
  }, [authState]);

  return (
    <UserProfileContext.Provider value={{ userProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}
