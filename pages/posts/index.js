import { useState } from "react";
import Router from "next/router";

export async function getServerSideProps(ctx) {
  const postReq = await fetch("http://localhost:3000/api/posts", {
    headers: {},
  });

  const posts = await postReq.json();
  console.log(posts);

  return { props: { posts: posts.data } };
}

export default function Posts(props) {
  const [postState, setPostState] = useState(props.posts);

  async function handlerDelete(id, e) {
    e.preventDefault();

    const ask = confirm("are you sure?");
    if (ask === true) {
      const deletePost = await fetch("/api/posts/delete/" + id, {
        method: "DELETE",
      });

      const deletePostRes = await deletePost.json();

      const postFiltered = postState.filter((post) => {
        return post.id !== id && post;
      });

      setPostState(postFiltered);
    }
  }

  function handlerEdit(id) {
    Router.push("/posts/edit/" + id);
  }

  return (
    <>
      <div className="">
        <h1>Posts</h1>
        {postState.map((post) => {
          return (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <button onClick={handlerEdit.bind(this, post.id)}>edit</button>
              <button onClick={handlerDelete.bind(this, post.id)}>hapus</button>
            </div>
          );
        })}
      </div>
    </>
  );
}
