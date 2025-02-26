import { Sequelize, Model, DataTypes } from 'sequelize'
import { sequelize } from '@src/database'
import { Publicness, Status } from '@src/common/constants';

const Comment = sequelize.define('comments', {
    cid: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    creator: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    content: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    note: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    upperComment: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true
    },
    commentStatus: {
        type: DataTypes.SMALLINT,
        defaultValue: Status.Normal
    }
})

export default Comment;