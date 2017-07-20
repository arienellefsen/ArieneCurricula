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
            allowNull: true,
            defaultValue: 'title'
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
        link0: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'None.'
        },

        link1: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'None.'
        },
        link2: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'None.'
        },
        link3: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'None.'
        },
        link4: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'None.'
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'progress'
        },
    });
    return Curricula;
};