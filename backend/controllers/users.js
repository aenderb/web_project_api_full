const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { HTTP_STATUS } = require("../utils/constants");
const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    res.json(user);
  } catch (err) {
    if (err.name === "DocumentNotFoundError") {
      next(new NotFoundError("ID de usuário não encontrado."));
    } else if (err.name === "CastError") {
      next(new BadRequestError("ID de usuário inválido."));
    } else {
      next(err);
    }
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    res.json(user);
  } catch (err) {
    if (err.name === "DocumentNotFoundError") {
      next(new NotFoundError("Usuário não encontrado."));
    } else {
      next(err);
    }
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });
    res.status(HTTP_STATUS.CREATED).json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      next(new BadRequestError("Dados fornecidos inválidos."));
    } else if (err.code === 11000) {
      next(new ConflictError("Este email já está em uso."));
    } else {
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Busca o usuário pelo email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new UnauthorizedError("Email ou senha incorretos.");
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Email ou senha incorretos.");
    }

    // Cria o token JWT com expiração de 7 dias
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Envia o token no corpo da resposta
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    ).orFail();
    res.json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      next(new BadRequestError("Dados fornecidos inválidos."));
    } else if (err.name === "DocumentNotFoundError") {
      next(new NotFoundError("Usuário não encontrado."));
    } else {
      next(err);
    }
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    ).orFail();
    res.json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      next(new BadRequestError("Dados fornecidos inválidos."));
    } else if (err.name === "DocumentNotFoundError") {
      next(new NotFoundError("Usuário não encontrado."));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  login,
  updateProfile,
  updateAvatar,
};
