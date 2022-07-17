import db from "../../../../libs/db";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { id } = req.query;
  const detailPost = await db("posts").where({ id: id }).first();

  if (!detailPost) return res.status(404).end();

  res.status(200);
  res.json({ message: "halaman detail", data: detailPost });
}
