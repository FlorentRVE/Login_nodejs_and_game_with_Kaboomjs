const Character = require('../model/character');

exports.displayCharacter = (req, res, next) => {
    Character.find()
    .then((characters) => res.status(200).json(characters))
    .catch((error) => res.status(400).json({error: error}));
};