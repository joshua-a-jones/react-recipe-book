import React, { createContext, useReducer } from "react";


export interface IThemeContext {
    state: ThemeState;
    changeColor: (x: string) => void
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

enum ThemeActions {
    CHANGE_COLOR = 'CHANGE_COLOR'
}

export type ThemeState = {
    color: string
}

export type ThemeAction = {
    type: ThemeActions;
    payload: string;
}

const themeReducer = (state: ThemeState, action: ThemeAction) => {
    switch (action.type) {
        case ThemeActions.CHANGE_COLOR:
            return {...state, color: action.payload}
        default:
            return state
    }
}


export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(themeReducer, {color: 'teal'});

    const changeColor = (color: string) => {
        dispatch({type: ThemeActions.CHANGE_COLOR, payload: color});
    }

    return (
        <ThemeContext.Provider value={{state, changeColor}}>
            {children}
        </ThemeContext.Provider>
    )
}