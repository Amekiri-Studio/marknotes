import { Sequelize, Model, DataTypes } from 'sequelize'
import { sequelize } from '@src/database'
import { Publicness, Status } from '@src/common/constants';

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
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    isShare: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    allowPublicEdit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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