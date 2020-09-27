module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('moves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usertoken: {
        type: Sequelize.STRING
      },
      column: {
        type: Sequelize.INTEGER
      },
      row: {
        type: Sequelize.INTEGER
      },
      turn: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('moves');
  }
};
