import { useState } from "react";
import Link from "next/link";

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
      <div className="w-full h-screen mt-20">
        <div className=" flex items-center flex-col gap-10">
          <h1 className="text-2xl font-semibold text-gray-600">Register</h1>
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
                Already
                <Link href="/auth/login">
                  <a className="text-blue-600 font-semibold"> Sign In </a>
                </Link>
                ?
              </p>
            </div>
            <button
              type="submit"
              className="w-[250px] py-2 rounded-xl bg-red-400 text-gray-50"
            >
              Sign Up
            </button>
            <p>{loading}</p>
          </form>
        </div>
      </div>
    </>
  );
}
