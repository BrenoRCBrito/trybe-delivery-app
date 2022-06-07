const { DataTypes } = require("sequelize");

const product = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(4, 2),
  },
  urlImage: {
    allowNull: false,
    type: DataTypes.STRING(200),
  },
};

module.exports = (sequelize) => {
  const defineProducts = sequelize.define("Product", product, {
    underscored: true,
    timestamps: false,
    tableName: "products",
  });

  defineProducts.associate = (models) => {
    defineProducts.hasMany(models.Sale,
      { as: "sale", foreignKey: "id" });
  };

  return defineProducts;
};
