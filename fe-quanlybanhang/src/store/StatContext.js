import { useState, createContext } from "react";

const StatContext = createContext();

function StatProvider({ children }) {


    return (
        <StatContext.Provider>
            {children}
        </StatContext.Provider>
    )
}

export { StatContext, StatProvider }