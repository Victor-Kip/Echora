import Sequelize from 'sequelize';
import db from '../config/db.js';

const Playlist = db.define('playlist', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    description: Sequelize.TEXT,
    cover_url: Sequelize.STRING,
    user_id: { type: Sequelize.INTEGER, allowNull: true },
    is_public: { type: Sequelize.BOOLEAN, defaultValue: false }
}, {
    timestamps: true,
    tableName: 'playlists',
    freezeTableName: true
});

export default Playlist;
