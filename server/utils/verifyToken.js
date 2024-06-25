const jwt = require("jsonwebtoken");
exports.verifyToken = async (req, res, next) => {
  try {
    const auth = req.headers.Authorization || req.headers.authorization;
    if (!auth) {
      return res
        .status(401)
        .json({ message: "Non Authorisé aucun token n'est trouvé" });
    }
    const token = auth.split(" ")[1];

    // Vérify if  token exist
    if (!token) {
      return res
        .status(401)
        .json({ message: "Accès non autorisé, le token est manquant." });
    }
    jwt.verify(token, process.env.JWT, (err, decode) => {
      if (err)
        return res
          .status(401)
          .json({ message: "Non Authorisé le token est faux" });
      req.user = decode;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};
