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
        },{
            classMethods: {
                associate: function(models) {
                  Blog.belongsTo(models.User);
                }
         }
        
    });

    return Post;
}