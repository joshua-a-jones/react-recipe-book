import React, { createContext, useReducer, useEffect } from "react";
import firebase from "firebase";
import { projectAuth } from "../firebase/config";

export interface IAuthContext {
  authState: AuthState;
  setUser: (user: firebase.User) => void;
}

export interface AuthState {
  user: firebase.User | null;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export type AuthAction = {
  type: AuthActions;
  payload: firebase.User;
};

enum AuthActions {
  SET_USER,
  LOG_OUT,
}

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActions.SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, dispatch] = useReducer(authReducer, {
    user: null,
  });

  const setUser = (user: firebase.User) => {
    dispatch({
      type: AuthActions.SET_USER,
      payload: user,
    });
  };

  useEffect(() => {
    projectAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: AuthActions.SET_USER,
          payload: user,
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
