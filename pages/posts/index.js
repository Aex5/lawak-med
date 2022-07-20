import { useState } from "react";
import Router from "next/router";
import Layout from "../../components/layout";
import { AiOutlinePlus, AiTwotoneEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

export async function getServerSideProps(ctx) {
  const postReq = await fetch("http://localhost:3000/api/posts", {
    headers: {},
  });

  const posts = await postReq.json();
  console.log();

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

  function handlerClick() {
    Router.push("/posts/create");
  }

  return (
    <Layout>
      <button
        onClick={handlerClick}
        className="absolute  top-5 right-16 text-xl border-2 h-8 w-8 rounded-lg flex items-center justify-center bg-lime-500 text-white"
      >
        <AiOutlinePlus />
      </button>
      <div className="">
        {postState.map((post) => {
          return (
            <div
              key={post.id}
              className="border-[1px] rounded-lg p-6 shadow-md mb-3"
            >
              <h2 className="text-xl mb-2 font-semibold">{post.title}</h2>
              <p className="mb-2">{post.content}</p>
              <button
                onClick={handlerEdit.bind(this, post.id)}
                className="mr-1 px-4 py-1 rounded-md text-white bg-gray-400"
              >
                <AiTwotoneEdit />
              </button>
              <button
                onClick={handlerDelete.bind(this, post.id)}
                className="px-4 py-1 rounded-md text-white bg-red-400"
              >
                <FaTrashAlt />
              </button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
