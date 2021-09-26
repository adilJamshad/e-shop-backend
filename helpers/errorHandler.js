function errorHandler(err, req, res, next) {
  if (err?.name === "unauthorizedError")
    return res.status(500).json({ message: "The user is not logged in!!" });

  if (err?.name === "validationError")
    return res.status(500).json({ message: "validation Error" });

  return res.status(500).json(err);
}

module.exports = errorHandler;
