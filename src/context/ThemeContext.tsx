import React, { createContext } from "react";

const light = {
    color: 'blue'
}

export const ThemeContext = createContext(light);

export function ThemeProvider({ children }: { children: React.ReactNode }) {

    return (
        <ThemeContext.Provider value={{color: 'blue'}}>
            {children}
        </ThemeContext.Provider>
    )
}