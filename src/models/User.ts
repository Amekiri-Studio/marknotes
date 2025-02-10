import { Sequelize, Model, DataTypes } from 'sequelize'
import { sequelize } from '@src/database'
import { Status } from '@src/common/constants';

const User = sequelize.define('users', {
	uid: {
		type: DataTypes.BIGINT.UNSIGNED,
		primaryKey: true,
		autoIncrement: true
	},
	username: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false
	},
	nickname: {
		type: DataTypes.STRING,
		allowNull: false
	},
	avatar: {
		type: DataTypes.STRING,
		allowNull: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	passwordSalt: {
		type: DataTypes.STRING,
		allowNull: false
	},
	userStatus: {
		type: DataTypes.SMALLINT,
		allowNull: false,
		defaultValue: Status.Normal
	}
});

export default User;