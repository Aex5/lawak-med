export async function getServerSideProps(ctx) {
  const { id } = ctx.query;

  return { props: {} };
}

export default function editPost() {
  return (
    <>
      <div>
        <h1>edit post</h1>
      </div>
    </>
  );
}
