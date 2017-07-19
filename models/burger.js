module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        burger_name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 50],
                    msg: 'Burger name must be between 1 and 50 letter'
                }
            }
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    });
    return Burger;
};