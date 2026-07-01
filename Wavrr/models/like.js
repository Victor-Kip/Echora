import Sequelize from 'sequelize';
import db from '../config/db.js';

const Like = db.define('like', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: { type: Sequelize.INTEGER, allowNull: false },
    target_id: { type: Sequelize.INTEGER, allowNull: false },
    target_type: { 
        type: Sequelize.ENUM('POST', 'SONG'), 
        allowNull: false 
    }
}, {
    timestamps: true,
    tableName: 'likes',
    freezeTableName: true
});

export default Like;
