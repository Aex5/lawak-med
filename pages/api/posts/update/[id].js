import db from "../../../../libs/db";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end();

  const { id } = req.query;

  const { title, content } = req.body;

  const update = await db("posts")
    .where({ id: id })
    .update({ title: title, content: content });

  const updatedData = await db("posts").where({ id: id }).first();

  res.status(200);
  res.json({ message: "update succsesfully", data: updatedData });
}
