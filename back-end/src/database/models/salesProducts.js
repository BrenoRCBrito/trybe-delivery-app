const { DataTypes } = require("sequelize");

const saleProduct = {
  saleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    foreignKey: true,   
  },
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    foreignKey: true,   
  },
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
      through: defineSalesProducts,
      as: "sales",
      foreignKey: "productId",
      otherKey: "saleId",
    });
    models.Sale.belongsToMany(models.Product, {
      through: defineSalesProducts,
      as: "products",
      foreignKey: "saleId",
      otherKey: "productId",
    });
  };

  return defineSalesProducts;
};
