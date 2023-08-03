'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users',
      [
        {
          username: 'John Doe',
          phonenumber: '086509309',
          password: "sangnguyen1",
          createdAt: "2023-07-24 09:53:17",
          updatedAt: "2023-07-24 09:53:17"
        },
        {
          username: 'Thanh Sen',
          phonenumber: '08650930999',
          password: "sangnguyen1",
          createdAt: "2023-07-24 09:53:17",
          updatedAt: "2023-07-24 09:53:17"
        }
      ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
