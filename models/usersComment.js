module.exports = function(sequelize, DataTypes) {
    var Comment   = sequelize.define('Comment', {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                model: 'users', // 'user' refers to table name
                key: 'id', // 'id' refers to column name in user table
                }
            },
            post_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                model: 'posts', // 'user' refers to table name
                key: 'id', // 'id' refers to column name in blog table
                }
            },
            comment:{
                type: DataTypes.TEXT,
                allowNull: false
            }
        });

    Comment.associate = (db) => {
        // associations can be defined here
        Comment.belongsTo(db.User, {foreignKey: 'user_id'});
        Comment.belongsTo(db.Post, {foreignKey: 'post_id'});
    };

    return Comment;
}