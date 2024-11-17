import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  try {
    //fetch token from cookie or beareer token
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    //decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

export const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "User is not authorized to access this route",
      });
    }
    next();
  };
};
