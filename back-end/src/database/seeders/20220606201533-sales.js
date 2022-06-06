"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("sales", [
      {
        id: 1,
        total_price: 15,
        delivery_address: "fenda do biquini",
        delivery_number: 77,
        sale_date: new Date(),
        status: "pending",
        user_id: 3,
        seller_id: 2,
      },
      {
        id: 2,
        total_price: 15,
        delivery_address: "fenda do biquini",
        delivery_number: 77,
        sale_date: new Date(),
        status: "sent",
        user_id: 3,
        seller_id: 2,
      },
      {
        id: 3,
        total_price: 3.49,
        delivery_address: "fenda do biquini",
        delivery_number: 77,
        sale_date: new Date(),
        status: "preparing",
        user_id: 3,
        seller_id: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sales", null, {});
  },
};
