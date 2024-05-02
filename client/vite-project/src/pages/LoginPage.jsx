// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";

import { Navigate } from "react-router-dom";
import { usercontext } from "../userContextProvider";

function LoginPage() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setredirect] = useState(false);
  const { setuserInfo } = useContext(usercontext);

  async function login(ev) {
    ev.preventDefault();

    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      origin: "*",
    });

    if (res.status !== 200) {
      alert(" Log In  Failed ");
    } else {
      res.json().then(userInfo => {
        setuserInfo(userInfo)
        setredirect(true);
      });
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={login} className="login ">
      <h1> Log In </h1>
      <input
        type="text"
        placeholder=" User Name : "
        className="form-control mb-3"
        value={username}
        onChange={ev => setusername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Password :"
        value={password}
        className="form-control mb-3"
        onChange={ev => setpassword(ev.target.value)}
      />
      <button className="btn btn-danger  "> Click To Log In </button>
    </form>
  );
}

export default LoginPage;
