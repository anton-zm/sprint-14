const card = require('../models/card');

module.exports.getCards = (req, res) => {
  card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  card
    .create({ name, link, owner: req.user._id })
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

module.exports.deleteCard = async (req, res) => {
  const cardObj = await card.findByIdAndDelete(req.params.cardId);
  if (cardObj == null || !cardObj.owner.toString() === req.user._id) {
    res.status(404).send({ message: 'У Вас нет такой карточки' });
  } else {
    res.send({ data: cardObj, message: 'Карточка удалена' });
  }
};
