'user strict';
var crypto = require('crypto');
var Sequelize = require('sequelize');
db = require('../db');

module.exports = function(sequelize, DataTypes){
    var users = sequelize.define('users',{
        user_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.BIGINT
          },
        email: {
			allowNull: false,
            type: Sequelize.STRING,
            validate: {
                isEmail: {
                    msg:"string is not a valid email"
                },
                notEmpty: {
                    msg: "email cannot be empty"
                },
            }
        },
        password:{
			allowNull: false,
            type: Sequelize.STRING,
            validate:{
                notEmpty: {
                    msg: "password cannot be empty"
                }
                
            }
        } ,
        user_type_id: DataTypes.INTEGER,
        phone_number: Sequelize.INTEGER,
        created_by: Sequelize.INTEGER,
        created_date: Sequelize.DATE,
        full_name: {
			allowNull: false,
            type:Sequelize.STRING,
            validate:{
                notEmpty: {
                    msg: "full name cannot be empty"
                }
            }
		},
		avatar: {
			type:Sequelize.STRING
		},
        active: Sequelize.INTEGER,
		last_login_date: DataTypes.DATE,
		is_deleted: {type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false}
    
    },
    {
		timestamps: false,
		underscored: true
      }
    );
      return users;
}
