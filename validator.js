const Joi = require("joi");

const movieSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  director: Joi.string().min(3).max(255).required(),
  year: Joi.number().required(),
  color: Joi.boolean().required(),
  duration: Joi.number().max(400).required(),
});

const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;

  const { error } = movieSchema.validate(
    { title, director, year, color, duration },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else next();
};

const userSchema = Joi.object({
  firstname: Joi.string().min(2).max(155).required(),
  lastname: Joi.string().min(2).max(155).required(),
  email: Joi.string().email().required(),
  city: Joi.string().min(3).max(55).required(),
  language: Joi.string().alphanum().min(3).max(25).required(),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email, city, language },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else next();
};

module.exports = {
  validateMovie,
  validateUser,
};
