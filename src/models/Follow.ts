import { Sequelize, Model, DataTypes } from 'sequelize'
import { sequelize } from '@src/database'
import { Status } from '@src/common/constants';

const Follow = sequelize.define('follows', {
    fid: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    followed: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    following: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    isRemoved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

export default Follow