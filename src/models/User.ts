import { Sequelize, Model, DataTypes } from 'sequelize'
import { sequelize } from '@src/database'
import { Status } from '@src/common/constants';
import UserRole from '@src/common/UserRole';

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
	role: {
		type: DataTypes.TINYINT,
		allowNull: false,
		defaultValue: UserRole.Ordinary
	},
	userStatus: {
		type: DataTypes.SMALLINT,
		allowNull: false,
		defaultValue: Status.Normal
	}
});

export default User;