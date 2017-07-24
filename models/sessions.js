module.exports = function(sequelize, DataTypes) {
  var SessionStore = sequelize.define("SessionStore", { //This is where I get lost
    sid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    votes_cast: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '[]'
    },
    user_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    },
    expires: {
      type: Sequelize.DATE
    },
    data: {
      type: Sequelize.STRING(50000)
    }
  });

//These lines below I'm not entirely sure are correctly placed?

  function extendDefaultFields(defaults, session) {
    return {
      data: defaults.data,
      expires: defaults.expires,
      userId: session.userId
    };
  }
 
  var store = new SessionStore({
    db: sequelize,
    table: 'SessionStore',
    extendDefaultFields: extendDefaultFields
  });


  return User;
};