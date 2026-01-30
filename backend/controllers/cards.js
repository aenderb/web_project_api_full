const Card = require("../models/card");
const { HTTP_STATUS } = require("../utils/constants");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.json(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const card = await Card.create({ name, link, owner });
    res.status(HTTP_STATUS.CREATED).json(card);
  } catch (err) {
    if (err.name === "ValidationError") {
      next(new BadRequestError("Dados fornecidos inválidos."));
    } else {
      next(err);
    }
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail();

    // Verifica se o usuário é o dono do cartão
    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError(
        "Você não tem permissão para deletar este cartão.",
      );
    }

    await Card.findByIdAndDelete(req.params.cardId);
    res.json({ message: "Cartão deletado com sucesso." });
  } catch (err) {
    if (err.name === "DocumentNotFoundError") {
      next(new NotFoundError("Cartão não encontrado."));
    } else if (err.name === "CastError") {
      next(new BadRequestError("ID de cartão inválido."));
    } else {
      next(err);
    }
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail();
    res.json(card);
  } catch (err) {
    if (err.name === "DocumentNotFoundError") {
      next(new NotFoundError("Cartão não encontrado."));
    } else if (err.name === "CastError") {
      next(new BadRequestError("ID de cartão inválido."));
    } else {
      next(err);
    }
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail();
    res.json(card);
  } catch (err) {
    if (err.name === "DocumentNotFoundError") {
      next(new NotFoundError("Cartão não encontrado."));
    } else if (err.name === "CastError") {
      next(new BadRequestError("ID de cartão inválido."));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
