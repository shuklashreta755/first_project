const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/auth.middleware.js");
const verifyRole = require("../middlewares/role.middleware.js");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  deleteUser,
  searchUser,
} = require("../controllers/user.controller.js");

router.post("/register", registerUser);
router.post("/login", loginUser);


router.route("/logout").post(verifyJWT, logoutUser);


  //router.get("/all", verifyJWT, verifyRole("role"), getUsers);

  router.get("/all", verifyJWT, getUsers);

  router.delete("/:id", verifyJWT, verifyRole("Admin"), deleteUser);
  
  router.get("/search" ,verifyJWT, searchUser);

//router.route()

module.exports = router;
