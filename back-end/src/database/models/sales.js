const { DataTypes } = require("sequelize");

const sale = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  totalPrice: {
    allowNull: false,
    type: DataTypes.DECIMAL(9, 2),
  },
  deliveryAddress: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  deliveryNumber: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  sellerId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    foreignKey: true,
    references: {
      model: "users",
      key: "id",
    },
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    foreignKey: true,
    references: {
      model: "users",
      key: "id",
    },
  },
};

module.exports = (sequelize) => {
  const defineSale = sequelize.define("Sale", sale, {
    tableName: "sales",
    createdAt: "saleDate",
    updatedAt: false,
    underscored: true,
  });

  defineSale.associate = (models) => {
    defineSale.hasOne(models.User, { sourceKey: "userId", foreignKey: "id", as: "user" });
    defineSale.hasOne(models.User, { sourceKey: "sellerId", foreignKey: "id", as: "seller" });
  };

  return defineSale;
};
