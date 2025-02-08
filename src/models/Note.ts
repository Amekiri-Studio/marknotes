import { Sequelize, Model, DataTypes } from 'sequelize'
import { sequelize } from '@src/database'

const Note = sequelize.define('notes', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    language: {
        type: DataTypes.CHAR,
        allowNull: false
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
    }
})

export default Note;