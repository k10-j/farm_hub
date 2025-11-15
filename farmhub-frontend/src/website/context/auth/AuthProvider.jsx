import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext(null);

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);    // user object or null
  const [loading, setLoading] = useState(true);

  // On mount, try to restore from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");

    if (token) {
      // Optionally validate token or fetch profile here
      setUser(userJson ? JSON.parse(userJson) : { token });
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const signIn = ({ token, user: userObj }) => {
    localStorage.setItem("token", token);
    if (userObj) localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj ?? { token });
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// small helper hook
export function useAuthContext() {
  return useContext(AuthContext);
}
