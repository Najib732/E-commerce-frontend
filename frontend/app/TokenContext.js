"use client"; 
import { createContext, useContext, useState } from "react";

const TokenContext = createContext();

export function TokenProvider({ children }) {
    
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  return useContext(TokenContext);
}
