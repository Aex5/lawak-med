import { useState } from "react";

export default function Register() {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    setLoading("loading...");

    const registerReq = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: { "Content-Type": "application/json" },
    });

    if (!registerReq.ok)
      return setLoading(`failed to register ${registerReq.status}`);

    const registerRes = await registerReq.json();

    setLoading(`register succsessfully`);
  }

  function fieldsHandler(e) {
    const value = e.target.value;
    const name = e.target.name;

    setFields({ ...fields, [name]: value });
  }

  return (
    <>
      <div>
        <h1>register</h1>
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
          <button type="submit">register</button>
          <p>{loading}</p>
        </form>
      </div>
    </>
  );
}
