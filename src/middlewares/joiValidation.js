const Joi = require("joi");
exports.validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const errorsDetail = details.map((i) => i.message);
      res.status(422).json({
        status: false,
        error: errorsDetail,
      });
    }
  };
};
exports.deleteSchema = Joi.object({
  multiple: Joi.boolean().required(),
  _ids: Joi.when("multiple", {
    is: true,
    then: Joi.array().items(Joi.objectId()).required(),
  }),
  _id: Joi.when("multiple", {
    is: false,
    then: Joi.objectId().required(),
  }),
});
