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
};

module.exports = (sequelize) => {
  const defineSale = sequelize.define("Sale", sale, {
    tableName: "sales",
    createdAt: "saleDate",
    updatedAt: false,
    underscored: true,
  });

  defineSale.associate = (models) => {
    defineSale.belongsTo(models.User, { foreignKey: "id", as: "userId" });
    defineSale.belongsTo(models.User, { foreignKey: "id", as: "sellerId" });
  };

  return defineSale;
};
