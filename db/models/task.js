'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    dueDate: {
      type: DataTypes.DATE,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    completed: {
      type: DataTypes.BOOLEAN
    },
    duration: {
      type: DataTypes.INTEGER
    },
    reoccuring: {
      type: DataTypes.BOOLEAN
    },
    interval: {
      type: DataTypes.ENUM(['Daily', 'Weekly', 'Monthly'])
    },
    softDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {});
  Task.associate = function(models) {
    const columnMapping = {
      through: 'ListandTasks',
      otherKey: 'listId',
      foreignkey: 'taskId'
    }
    Task.belongsToMany(models.List, columnMapping);
  };
  return Task;
};
