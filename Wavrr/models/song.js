import Sequelize from 'sequelize'
import db from '../config/db.js'

const Song = db.define('song', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    album: Sequelize.INTEGER,
    releaseDate: Sequelize.DATE,
    audioURL: Sequelize.STRING,
    coverURL: Sequelize.STRING,
    genre: Sequelize.STRING,
    duration: Sequelize.INTEGER,
    artistId: Sequelize.INTEGER
}, {
    timestamps: true,
    tableName: 'songs',
    freezeTableName: true,
})

export default Song
