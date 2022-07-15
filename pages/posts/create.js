import { useState } from "react";
import Router from "next/router";

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
    <>
      <div>
        <h1>create</h1>
        <form onSubmit={handlerCreate}>
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={fieldsHandler}
          />
          <br />
          <textarea
            name="content"
            placeholder="isi sesuatu"
            onChange={fieldsHandler}
          ></textarea>
          <br />
          <button type="submit">post</button>
        </form>
      </div>
    </>
  );
}
