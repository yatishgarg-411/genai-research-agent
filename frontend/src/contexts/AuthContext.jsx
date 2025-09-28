import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(undefined);

export  function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Signup request
  const signUp = async (email, password, name) => {
    const form = {
      "useremail": email,
      "userpassword": password,
      "username": name,
    };
    const newUser = {
      id: Date.now().toString(),
      email,
      name
    };
    
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/signup", form);
      alert(res.data.msg);
      setUser(newUser);

      return { error: null };
    } catch (error) {
      if (error.response) {
        return { error: error.response.data.detail };
      }
      return { error: "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  // Signin request (currently mocked)
  const signIn = async (email, password) => {
    setLoading(true);
    const form = {
      useremail:email,
      userpassword:password
    }
    const loggedInUser = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0] // Use email prefix as name
    };
    
    try{
      const res= await axios.post("http://localhost:8000/login",form);
      alert(res.data.msg);
      setUser(loggedInUser);

      return{error:null};
    }catch(error){
      if(error.response){
        return{error:error.response.data.detail};
      }
      return { error: "Something went wrong" };
    }finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export  function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
