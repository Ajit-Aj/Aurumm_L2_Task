// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { toast } from 'react-hot-toast';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) setUser({ token });
//     setIsLoading(false);
//   }, []);

//   const login = (token, role) => {
//     localStorage.setItem('token', token);
//     setUser({ token, role });
//     window.location.reload();
//   };


//   const logout = () => {
//     localStorage.removeItem('token');
//     toast.success('SuccessFully Logged Out.');
//     setTimeout(() => {
//       window.location.reload();
//       setUser(null);
//     }, 500);
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };








import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      setUser({ token, role: decoded.role });
    }
    setIsLoading(false);
  }, []);

  const login = (token, role) => {
    localStorage.setItem('token', token);
    setUser({ token, role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out Successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
