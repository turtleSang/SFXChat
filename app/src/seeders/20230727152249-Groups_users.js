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
    await queryInterface.bulkInsert('Groups_users',
      [
        {
          user_id: '1',
          group_id: '1',
          createdAt: "2023-07-24 09:53:17",
          updatedAt: "2023-07-24 09:53:17"
        },
        {
          user_id: '1',
          group_id: '2',
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
    await queryInterface.bulkDelete('Groups_users', null, {});
  }
};
