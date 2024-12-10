const Joi = require('joi');

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().min(1).required(),
    place: Joi.string().min(1).required(),
    Country: Joi.string().min(1).required(),
    price: Joi.number().required().min(0),
    image: Joi.string().uri().optional().allow(''),
    description: Joi.string().trim().min(1).required(),
  }).required()
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment : Joi.string().min(1).required(),
  }).required(),
});