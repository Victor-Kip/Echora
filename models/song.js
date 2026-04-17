import Sequelize from 'sequelize'
import db from '../config/db.js'
import Artist from './artist.js'




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
})
Artist.hasMany(Song)
Song.belongsTo(Artist)

export default Song