const mongoose = require('mongoose');
// Не забываем импортировать модель, на которую ссылаемся
const userModel = require('./user');
const categoryModel = require('./category');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  // Добавляем поле для списка пользователей
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
  }],
  // Добавляем поле для списка категорий
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: categoryModel,
  }],
});

// models/game.js

gameSchema.statics.findGameByCategory = function(category) {
  return this.find({}) // Выполним поиск всех игр
    .populate({
      path: "categories",
      match: { name: category } 
    })
    .populate({
      path: "users",
      select: "-password"
    })
    .then(games => {
        // Отфильтруем по наличию искомой категории 
      return games.filter(game => game.categories.length > 0);
    });
};


module.exports = mongoose.model('game', gameSchema);