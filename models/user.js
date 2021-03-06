module.exports = function(sequelize, DataTypes) {
  var bcrypt = require('bcryptjs');
  var User = sequelize.define('User', {
  
  profile_pict:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'images/pp2.png'
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username :{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
  validate: {
  isEmail: true
  }
  },
  password: {
  type: DataTypes.STRING,
  allowNull: false
  }
  }, {
  hooks: {
  beforeCreate: function(user) {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  }
  }
  });

  User.associate = (db) => {
    // associations can be defined here
    User.hasMany(db.Post, { foreignKey: 'user_id' });
    User.hasMany(db.Like, { foreignKey: 'user_id' });
    User.hasMany(db.Comment, { foreignKey: 'user_id' });
    };
  
  
  // Creating a custom method for our User model.
  //This will check if an unhashed password entered by the
  //user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  /*
  User.hook("beforeCreate", function(user) {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  */
  return User;
  };