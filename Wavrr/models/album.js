import Sequelize from 'sequelize';
import db from '../config/db.js';

const Album = db.define('album', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: { type: Sequelize.STRING, allowNull: false },
    cover_url: Sequelize.STRING,
    release_date: Sequelize.DATEONLY,
    artist_id: { type: Sequelize.INTEGER, allowNull: false }
}, {
    timestamps: true,
    tableName: 'albums',
    freezeTableName: true
});

export default Album;
