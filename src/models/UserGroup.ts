import { Sequelize, Model, DataTypes } from 'sequelize'
import { sequelize } from '@src/database'
import { Permission } from '@src/common/constants';

const UserGroup = sequelize.define('user_groups', {
    gid: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permission: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: Permission.Basic
    }
})

export default UserGroup;