export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      if (error.name === "ValidationError") {
        const message = error.errors[0];
        return next(new AppError(message, 400));
      }
      return next(new AppError("Validation error", 500));
    }
  };
};
