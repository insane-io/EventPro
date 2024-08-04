import { createContext, useEffect, useState } from 'react';

export const MyContext = createContext("");

const UserProvider = ({ children }) => {
  const [login, setLogin] = useState(!!localStorage.getItem("access_token"));
  const [user, setUser] = useState(`${localStorage.getItem("role")}`);

  useEffect(()=>{
    setUser(`${localStorage.getItem("role")}`)
  },[login])
  
  return (
    <MyContext.Provider value={{login, setLogin, user, setUser}}>
      {children}
    </MyContext.Provider>
  );
};

const withUser = (Child) => (props) => (
  <MyContext.Consumer>
    {(context) => <Child {...props} {...context} />}
  </MyContext.Consumer>
);

export { UserProvider, withUser };