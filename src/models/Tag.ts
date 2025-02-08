import { Sequelize, Model, DataTypes } from 'sequelize'
import { sequelize } from '@src/database'

const Tag = sequelize.define('tags', {
    tid: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    tagName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    associatedNote: {
        type: DataTypes.BIGINT.UNSIGNED
    }
});

export default Tag;