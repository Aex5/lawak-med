import { useState } from "react";
import cookie from "js-cookie";
import Router from "next/router";

export default function Login() {
  const [fields, setFields] = useState({ email: "", password: "" });

  async function submitHandler(e) {
    e.preventDefault();

    const loginReq = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });

    const loginRes = await loginReq.json();

    console.log(`jwt: ${loginRes.token}`);

    cookie.set("token", loginRes.token);

    Router.push("/posts");
  }

  function fieldsHandler(e) {
    const value = e.target.value;
    const name = e.target.name;

    setFields({ ...fields, [name]: value });
  }

  return (
    <>
      <div>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={fieldsHandler}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={fieldsHandler}
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
