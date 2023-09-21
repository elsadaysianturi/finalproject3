'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductCategory.hasMany(models.Product, { foreignKey: 'categoryId' });
    }
  }
  ProductCategory.init({
    categoryName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductCategory',
  });
  return ProductCategory;
};