import { useState } from "react";
import Router from "next/router";

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

    const editReq = await fetch("/api/posts/edit/" + props.post.id, {
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
    <>
      <div>
        <h1>edit post</h1>
        <form onSubmit={editHandler}>
          <input
            type="text"
            name="title"
            placeholder="title"
            onChange={fieldsHandler}
            defaultValue={props.post.title}
          />
          <br />
          <textarea
            name="content"
            placeholder="content"
            onChange={fieldsHandler}
            defaultValue={props.post.content}
          ></textarea>
          <br />
          <button type="submit">update</button>
        </form>
      </div>
    </>
  );
}
