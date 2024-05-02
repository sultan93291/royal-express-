// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usercontext } from "./UserContextProvider";

function Header() {
  // eslint-disable-next-line no-unused-vars
  const { setuserInfo, userInfo } = useContext(usercontext);

  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    }).then(response => {
      response.json().then(userInfo => {
        setuserInfo(userInfo);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function logout(ev) {
    ev.preventDefault();
    fetch("http://localhost:3000/logout", {
      credentials: "include",
      method: "POST",
    });
    setuserInfo(null);
  }
  const userid = userInfo?.id;

  return (
    <header>
      <Link to="/" className="logo">
        {" "}
        My Blog
      </Link>

      <nav>
        {userid && (
          <>
            <Link to={"/create"} className="btn btn-primary">
              {" "}
              Create New Post{" "}
            </Link>

            <a onClick={logout} className="btn btn-danger text-white">
              {" "}
              Log Out{" "}
            </a>
          </>
        )}

        {!userid && (
          <>
            <Link className="btn btn-primary" to="/login">
              {" "}
              Log In{" "}
            </Link>

            <Link className="btn btn-primary" to="/register">
              {" "}
              Register{" "}
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
