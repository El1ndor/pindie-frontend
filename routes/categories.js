const categoriesRouter = require('express').Router()


const {findCategoryById , findAllCategories ,createCategory, findByIdAndUpdate, findByIdAndDelete, checkIsCategoryExists,   } = require('../middlewares/categories')
const {sendCategoriesById, sendAllCategories ,  sendCategoryCreated, sendCategoryUpdated,  deleteCategory } = require('../controllers/categories')
const {checkAuth} = require("../middlewares/auth")
categoriesRouter.post(
  '/categories',
  createCategory,
  sendCategoryCreated,
  findAllCategories,
  checkIsCategoryExists,
  checkAuth,
)
categoriesRouter.get('/categories', findAllCategories, sendAllCategories, checkAuth)
categoriesRouter.get('/categories/:id', findCategoryById, sendCategoriesById, checkAuth)
categoriesRouter.put(
  "/categories/:id",
  findByIdAndUpdate,
  sendCategoryUpdated,
  checkAuth 
);
categoriesRouter.delete(
  "/categories/:id",
  findByIdAndDelete,
  deleteCategory, 
  checkAuth,
);
module.exports = categoriesRouter;
