module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define('Session', {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    userId: DataTypes.STRING,
    expires: DataTypes.DATE,
    data: DataTypes.STRING(50000)
  });

//These lines below I'm not entirely sure are correctly placed?

  function extendDefaultFields(defaults, session) {
    return {
      data: defaults.data,
      expires: defaults.expires,
      userId: session.userId
    };
  }
 
  var store = new Session({
    db: sequelize,
    table: 'Session',
    extendDefaultFields: extendDefaultFields
  });


  return User;
};