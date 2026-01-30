const router = require("express").Router();
const { celebrate } = require("celebrate");
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const {
  validateCreateCard,
  validateCardId,
} = require("../middlewares/validation");

router.get("/", getCards);
router.post("/", celebrate(validateCreateCard), createCard);
router.delete("/:id", celebrate(validateCardId), deleteCard);
router.put("/:cardId/likes", celebrate(validateCardId), likeCard);
router.delete("/:cardId/likes", celebrate(validateCardId), dislikeCard);

module.exports = router;
