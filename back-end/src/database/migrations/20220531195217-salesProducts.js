module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable("sales_products", {
      sale_id: {
        allowNull: false,
        primaryKey: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "sales",
          key: "id",
        },
      },
      product_id: {
        allowNull: false,
        primaryKey: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "products",
          key: "id",
        },
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    }),

  down: async (queryInterface) => queryInterface.dropTable("sales_products"),
};
