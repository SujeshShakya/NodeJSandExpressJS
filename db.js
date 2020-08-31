
var crypto = require('crypto');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(
	'test_app',
	'root',
	'root',
	{
    dialect: 'mysql',
    logging: console.log,
		define: {
			timestamps: false
		}
	}
);

const db= {};

db.Sequelize = Sequelize;
db.Sequelize = Sequelize;

// db.users = require('./models/users')(sequelize, Sequelize);

// db.users.belongsTo(db.user_types,{
// foreignKey: 'user_type_id'
// });





module.exports = db;
