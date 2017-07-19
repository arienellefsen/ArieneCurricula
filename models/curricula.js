module.exports = function(sequelize, DataTypes) {
    var Curricula = sequelize.define("Curricula", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        curricula_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'General'
        },
        sub_category: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'General'
        },
        search_tags: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        votes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'None.'
        },

    });


    return Curricula;
};