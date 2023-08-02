const knexQuery = require("../modelknex/knex");

const create = async (req, res) => {
  const body = req.body;

  const insertData = await knexQuery("users").insert({
    firstName: body.nama_depan,
    lastName: body.nama_belakang,
    email: body.email,
    password: body.password,
  });

  return res.status(201).send({
    message: "user created",
  });
};

module.exports = { create };
