const { validationResult } = require('express-validator')

module.exports.validate = (validationRules) => {
    return async (req, res, next) => {
      await Promise.all(validationRules.map(validationRule => validationRule.run(req)));
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      res.status(400).json({ errors: errors.array() });
    };
  };
