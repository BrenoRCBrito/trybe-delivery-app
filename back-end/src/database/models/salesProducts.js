const { DataTypes } = require("sequelize");

const saleProduct = {
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
};

module.exports = (sequelize) => {
  const defineSalesProducts = sequelize.define(
    "SaleProduct",
    saleProduct,
    {
      timestamps: false,
      tableName: "sales_products",
      underscored: true,
    }
  );

  defineSalesProducts.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: "sales",
      through: defineSalesProducts,
      foreignKey: "saleId",
      otherKey: "productId",
    });
    models.Sale.belongsToMany(models.Product, {
      as: "products",
      through: defineSalesProducts,
      foreignKey: "productId",
      otherKey: "saleId",
    });
  };

  return defineSalesProducts;
};
