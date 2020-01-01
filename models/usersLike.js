module.exports = function(sequelize, DataTypes) {
    var Like   = sequelize.define('Like', {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                model: 'users', // 'user' refers to table name
                key: 'id', // 'id' refers to column name in user table
                }
            },
            blog_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                model: 'posts', // 'user' refers to table name
                key: 'id', // 'id' refers to column name in blog table
                }
            }
        });
    
        Like.associate = (db) => {
            Like.belongsTo(db.User, {foreignKey: 'user_id'});
            Like.belongsTo(db.Post, {foreignKey: 'post_id'});
        }

    return Like;
}