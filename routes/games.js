const gamesRouter = require('express').Router()
const { checkAuth } = require('../middlewares/auth.js')
const {
  findAllGames,
  createGame,
  findGameById,
  findByIdAndUpdate,
  deleteGame,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkIsGameExists,
  checkIsVoteRequest
} = require('../middlewares/games')
const {
  sendAllGames,
  sendGameCreated,
  sendGameById,
  sendGameUpdated,
  sendGameDeleted
} = require('../controllers/games')

gamesRouter.post(
  '/games',
  findAllGames,
  checkEmptyFields,
  createGame,
  sendGameCreated,
  checkIsGameExists,
  checkAuth
)
gamesRouter.get('/games', findAllGames, sendAllGames, checkAuth)
gamesRouter.get('/games/:id', findGameById, sendGameById, checkAuth)
gamesRouter.put(
  '/games/:id',
  findGameById,
  checkIsVoteRequest,
  sendGameUpdated,
  findByIdAndUpdate,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth
)
gamesRouter.delete('/games/:id', deleteGame, sendGameDeleted, checkAuth)

module.exports = gamesRouter
