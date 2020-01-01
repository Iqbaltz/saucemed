module.exports = function(sequelize, DataTypes) {
    var Post   = sequelize.define('Post', {
        images:{
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: 'users', // 'user' refers to table name
               key: 'id', // 'id' refers to column name in user table
            }
         }
        });

        Post.associate = (db) => {
            Post.belongsTo(db.User, {foreignKey: 'user_id'})
            Post.hasMany(db.Comment, {foreignKey: 'post_id'})
            Post.hasMany(db.Like, {foreignKey: 'post_id'})
        }

    return Post;
}