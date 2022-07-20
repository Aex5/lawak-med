import { useState } from "react";
import Router from "next/router";
import Layout from "../../components/Layout";
import { RiSendPlane2Fill } from "react-icons/ri";

export default function CreatePost() {
  const [fields, setFields] = useState({ title: "", content: "" });

  async function handlerCreate(e) {
    e.preventDefault();

    const createReq = await fetch("/api/posts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });

    const createRes = await createReq.json();

    Router.push("/posts");
  }

  function fieldsHandler(e) {
    const value = e.target.value;
    const name = e.target.name;

    setFields({
      ...fields,
      [name]: value,
    });
  }

  return (
    <Layout>
      <div className="w-full h-screen flex flex-col items-center mt-20 gap-3">
        <h1 className="text-xl font-semibold text-gray-600">Post a note</h1>
        <form
          onSubmit={handlerCreate}
          className="flex flex-col justify-start items-center w-[250px] h-[500px] "
        >
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={fieldsHandler}
            className="w-full p-2 border-[1px] shadow-md rounded-lg"
          />
          <br />
          <textarea
            name="content"
            placeholder="isi sesuatu"
            onChange={fieldsHandler}
            className="p-2 w-full h-[100px] border-[1px] shadow-md rounded-lg"
          ></textarea>
          <br />
          <button type="submit" className="w-full py-2 bg-green-500 rounded-lg">
            <RiSendPlane2Fill className="w-full flex items-center justify-center text-gray-100" />
          </button>
        </form>
      </div>
    </Layout>
  );
}
