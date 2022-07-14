import { useState } from "react";

export default function Login() {
  const [fields, setFields] = useState({ email: "", password: "" });

  function submitHandler(e) {
    e.preventDefault();

    console.log("login cuy");
  }

  async function fieldsHandler(e) {
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
