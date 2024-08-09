import { createContext, useEffect, useState } from 'react';
export const MyContext = createContext("");

const UserProvider = ({ children }) => {
  const [login, setLogin] = useState(!!localStorage.getItem("access_token"));
  const [user, setUser] = useState(`${localStorage.getItem("role")}`);
  const [uid, setUid] = useState()
  
  return (
    <MyContext.Provider value={{login, setLogin, user, setUser, uid, setUid}}>
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