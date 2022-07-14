export async function getServerSideProps(ctx) {
  const postReq = await fetch("http://localhost:3000/api/posts", {
    headers: {},
  });

  const posts = await postReq.json();
  console.log(posts);

  return { props: { posts: posts.data } };
}

export default function Posts(props) {
  return (
    <>
      <div>
        <h1>Posts</h1>
        {props.posts.map((post) => {
          return (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
