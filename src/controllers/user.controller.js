const knexQuery = require("../modelknex/knex");
const { userNew } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  try {
    const { nama_depan, nama_belakang, username, email, password } = req.body;

    if (!nama_depan || !email || !password || !username) {
      return res.status(400).send({
        message: "some field must be filled, cannot be empty",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const input = await userNew.create({
      firstname: nama_depan,
      lastname: nama_belakang,
      username: username,
      email: email,
      password: hashedPassword,
    });

    return res.status(201).send({
      message: "user created",
    });
  } catch (error) {
    return res.send({
      message: "error occured",
      data: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!password || !username) {
      return res.status(400).send({
        message: "some field must be filled, cannot be empty",
      });
    }

    const getUser = await userNew.findOne({
      where: { username: username },
    });

    if (!getUser) {
      return res.status(404).send({
        message: `Username ${username} not found`,
      });
    }

    const isValidPassword = bcrypt.compareSync(
      password,
      getUser.dataValues.password
    );

    console.log(isValidPassword);

    if (!isValidPassword) {
      return res.status(400).send({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: getUser.dataValues.id,
        username: getUser.dataValues.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: 3600 }
    );

    return res.status(200).send({
      message: "login success",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "error occured",
      data: error,
    });
  }
};

const update = async (req, res) => {
  try {
    const idUser = req.user.id;
    const { nama_depan, nama_belakang, username } = req.body;

    const updatedData = await userNew.update(
      {
        firstname: nama_depan,
        lastname: nama_belakang,
        username: username,
      },
      { where: { id: idUser } }
    );

    const data = await userNew.findOne({
      where: { id: idUser },
    });

    res.status(201).send({
      message: "user updated",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "error occured",
      data: error,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const idUser = req.user.id;
    const deletedUser = await userNew.destroy({
      where: { id: idUser },
    });

    res.status(200).send({
      message: "your account has been deleted",
      data: deleteUser,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "cannot delete user",
      data: error,
    });
  }
};

module.exports = { create, login, update, deleteUser };
