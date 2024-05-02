// eslint-disable-next-line no-unused-vars
import React, {  useState } from "react";
import { createContext } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const usercontext = createContext({});

// eslint-disable-next-line react/prop-types
function UserContextProvider({children}) {
  const [userInfo, setuserInfo] = useState({});

  return (
    <div>
      <usercontext.Provider value={{ userInfo, setuserInfo }}>
        {children}
      </usercontext.Provider>
    </div>
  );
}

export default UserContextProvider;
