const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "sosmed",
    password: "202051056",
    database: "sosmedlawak",
  },
});

export default knex;
