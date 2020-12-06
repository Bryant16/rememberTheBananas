'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    userId: DataTypes.INTEGER
  }, {});
  List.associate = function(models) {
    const columnMapping = {
      through: 'ListandTasks',
      otherKey: 'taskId',
      foreignKey: 'listId'
    }
    List.belongsToMany(models.Task, columnMapping);
  };
  return List;
};
