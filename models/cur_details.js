var models = require('./');

module.exports = function(sequelize, DataTypes) {
  var CurriculaDetails = sequelize.define("CurriculaDetails", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    step_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    step_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'text'
    },
    step_content: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'None.'
    },
    step_url: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  },
  {
    classMethods: {
      associate: function(models) {
        CurriculaDetails.belongsTo(models.Curricula);
        CurriculaDetails.belongsTo(models.User, {
          as: 'author'
        })
      }
    }
  });
  return CurriculaDetails;
};