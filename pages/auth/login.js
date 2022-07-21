import { useState } from "react";
import cookie from "js-cookie";
import Router from "next/router";
import Link from "next/link";

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
      <div className="w-full h-screen mt-20">
        <div className=" flex items-center flex-col gap-10">
          <h1 className="text-2xl font-semibold text-gray-600">Login</h1>
          <form
            onSubmit={submitHandler}
            className="w-[300px] flex flex-col justify-center items-center gap-3"
          >
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={fieldsHandler}
              className="w-[250px] h-10 p-2 border-b-[1px] border-gray-400"
            />

            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={fieldsHandler}
              className="w-[250px] h-10 p-2 border-b-[1px] border-gray-400"
            />
            <div>
              <p>
                Not
                <Link href="/auth/register">
                  <a className="text-blue-600 "> Sign Up </a>
                </Link>
                yet ?
              </p>
            </div>
            <button
              type="submit"
              className="w-[250px] py-2 rounded-xl bg-red-400 text-gray-50"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
