import React, { createContext, useReducer } from "react";


export interface IThemeContext {
    themeStyle: ThemeStyleState;
    changeColor: (x: string) => void
    changeMode: (mode: 'light' | 'dark') => void
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export type ThemeStyleState = {
    background: string
    mode: string
}

export type ThemeAction = {
    type: ThemeActions;
    payload: string;
}

enum ThemeActions {
    CHANGE_COLOR = 'CHANGE_COLOR',
    CHANGE_MODE = 'CHANGE_MODE'
}

const themeReducer = (state: ThemeStyleState, action: ThemeAction) => {
    switch (action.type) {
        case ThemeActions.CHANGE_COLOR:
            return {...state, background: action.payload}
        case ThemeActions.CHANGE_MODE:
            return {...state, mode: action.payload}
        default:
            return state
    }
}


export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [themeStyle, dispatch] = useReducer(themeReducer, {
        background: 'teal',
        mode: 'light'
    });

    const changeColor = (color: string) => {
        dispatch({
            type: ThemeActions.CHANGE_COLOR,
            payload: color
        });
    }

    const changeMode = (mode: 'light' | 'dark') => {
        dispatch({
            type: ThemeActions.CHANGE_MODE,
            payload: mode
        });
    }

    return (
        <ThemeContext.Provider value={{themeStyle, changeColor, changeMode}}>
            {children}
        </ThemeContext.Provider>
    )
}