module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      "sales",
      [
        {
          id: 1,
          user_id: 3,
          seller_id: 2,
          total_price: 9.8,
          delivery_address: "rua do bobo, número 0",
          delivery_number: "number",
          sale_date: new Date(),
          status: "bob",
        },
      ],
      { timestamps: false }
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("sales", null, {});
  },
};
