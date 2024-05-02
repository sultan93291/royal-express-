/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

function Registerpage() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [number, setnumber] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  async function register(ev) {
    ev.preventDefault();

    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify({ username, password ,number,name,email }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status !== 200) {
      alert("Registration Failed ");
    } else {
      alert("Registration Success");
    }
  }
  return (
    <form onSubmit={register} className="register g-3 ">
      <h1> Register </h1>
      <input
        type="name"
        placeholder="Name :"
        value={name}
        className="form-control mb-3 "
        onChange={ev => setname(ev.target.value)}
      />
      <input
        type="tel"
        placeholder=" number : +880**********"
        value={number}
        className="form-control mb-3 "
        onChange={ev => setnumber(ev.target.value)}
      />
      <input
        type="email"
        placeholder="Email :"
        value={email}
        className="form-control mb-3 "
        onChange={ev => setemail(ev.target.value)}
      />
      <input
        type="text"
        placeholder="User Name : "
        value={username}
        className="form-control mb-3 "
        onChange={ev => setusername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Password :"
        value={password}
        className="form-control mb-3 "
        onChange={ev => setpassword(ev.target.value)}
      />

      <button className="btn btn-success "> Click To  Register </button>
    </form>
  );
}

export default Registerpage;
