const usersRouter = require('express').Router()
const checkAuth = require("../middlewares/auth")
const {
  findAllUsers,
  createUser,
  findUserById,
  findByIdAndUpdate,
  findByIdAndDelete,
  checkEmptyName,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  filterPassword,
  hashPassword,
} = require('../middlewares/users')
const {
  sendAllUsers,
  sendUserCreated,
  sendUserById,
  sendUserUpdated,
  deleteUser,
  sendMe,
} = require('../controllers/users')

usersRouter.get('/users', findAllUsers, sendAllUsers, filterPassword, checkAuth)

usersRouter.post(
  '/users',
  createUser,
  sendUserCreated,
  checkEmptyName,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword
)
usersRouter.get(
  '/user/:id',
  findUserById,
  sendUserById,
  filterPassword,
  checkAuth
)
usersRouter.put('/users/:id', findByIdAndUpdate, sendUserUpdated, checkAuth)
usersRouter.delete('/users/:id', deleteUser, findByIdAndDelete, checkAuth)
usersRouter.get('/me', checkAuth, sendMe)
module.exports = usersRouter;
