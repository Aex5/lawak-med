import { useState } from "react";
import Router from "next/router";
import Layout from "../../../components/layout";

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;

  const detailReq = await fetch("http://localhost:3000/api/posts/detail/" + id);

  const detailRes = await detailReq.json();

  return { props: { post: detailRes.data } };
}

export default function editPost(props) {
  const [fields, setFields] = useState({ title: "", content: "" });

  async function editHandler(e) {
    e.preventDefault();

    const editReq = await fetch("/api/posts/update/" + props.post.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });

    const editRes = await editReq.json();

    Router.push("/posts");
  }

  function fieldsHandler(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFields({
      ...fields,
      [name]: value,
    });
  }

  return (
    <Layout>
      <div className="w-full h-screen flex flex-col items-center mt-20 gap-3">
        <h1 className="text-xl font-semibold text-gray-600">Edit</h1>
        <form
          onSubmit={editHandler}
          className="flex flex-col justify-start items-center w-[250px] h-[500px]"
        >
          <input
            type="text"
            name="title"
            placeholder="title"
            onChange={fieldsHandler}
            defaultValue={props.post.title}
            className="w-full p-2 border-[1px] shadow-md rounded-lg"
          />
          <br />
          <textarea
            name="content"
            placeholder="content"
            onChange={fieldsHandler}
            defaultValue={props.post.content}
            className="p-2 w-full h-[100px] border-[1px] shadow-md rounded-lg"
          ></textarea>
          <br />
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-lg"
          >
            update
          </button>
        </form>
      </div>
    </Layout>
  );
}
