import Sequelize from 'sequelize';
import db from '../config/db.js';

const PlaylistSong = db.define('playlist_song', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    playlist_id: { type: Sequelize.INTEGER, allowNull: false },
    song_id: { type: Sequelize.INTEGER, allowNull: false }
}, {
    timestamps: true,
    tableName: 'playlist_songs',
    freezeTableName: true
});

export default PlaylistSong;
