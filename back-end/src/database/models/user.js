const { DataTypes } = require("sequelize");

const user = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

module.exports = (sequelize) => {
  const defineUser = sequelize.define("User", user, {
    underscored: true,
    timestamps: false,
    tableName: "users",
  });

  defineUser.associate = (models) => {
    defineUser.hasMany(models.Sale, { foreignKey: "userId", as: "userId" });
    defineUser.hasMany(models.Sale, { foreignKey: "sellerId", as: "sellerId" });
  };

  return defineUser;
};
