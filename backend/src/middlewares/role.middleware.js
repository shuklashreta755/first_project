// const ApiError = require("../utils/ApiError.js");

// const verifyRole = () => {
//   return (req, res, next) => {
//     // req.user comes from verifyJWT middleware
//     console.log(req.user)
//     if (req.user.role!=="Admin") {
//       throw new ApiError(403, "You are not allowed to access this resource");
//     }

//     next();
//   };
// };
// module.exports=verifyRole;





const ApiError = require("../utils/ApiError.js");

const verifyRole = (role) => {
  return (req, res, next) => {
    //console.log(req.user);
    //console.log(role);

    if (req.user.role !== "Admin") {
      return next(
        new ApiError(403, "You are not allowed to access this resource")
      );
    }

    next();
  };
};

module.exports = verifyRole;