import { Sequelize, Model, DataTypes } from 'sequelize'
import { sequelize } from '@src/database'
import { Status } from '@src/common/constants';

const Note = sequelize.define('notes', {
    nid: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creator: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    language: {
        type: DataTypes.CHAR,
        allowNull: false,
        defaultValue: 'zh-cn'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isShare: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },
    allowPublicEdit: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },
    createDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    lastEditDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    noteStatus: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: Status.Normal
    }
}, {
    indexes: [
        {
            type: 'FULLTEXT',
            fields: ['title', 'content']
        }
    ]
})

export default Note;