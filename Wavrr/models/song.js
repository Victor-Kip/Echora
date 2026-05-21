import Sequelize from "sequelize";
import db from "../config/db.js";

const Song = db.define(
  "song",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    album: Sequelize.INTEGER,
    releaseDate: Sequelize.DATE,
    audioURL: Sequelize.STRING,
    coverURL: Sequelize.STRING,
    genre: Sequelize.STRING,
    duration: Sequelize.INTEGER,
    artistId: Sequelize.INTEGER,
  },
  {
    timestamps: true,
    tableName: "songs",
    freezeTableName: true,
  },
);

import Artist from "./artist.js";

Song.belongsTo(Artist, { foreignKey: "artistId", as: "artist" });
Artist.hasMany(Song, { foreignKey: "artistId" });

export default Song;
