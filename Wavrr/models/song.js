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
    name: { type: Sequelize.STRING, allowNull: false },
    album_id: { type: Sequelize.INTEGER, allowNull: true },
    release_date: Sequelize.DATEONLY,
    audio_url: Sequelize.STRING,
    cover_url: Sequelize.STRING,
    genre: Sequelize.STRING,
    duration: Sequelize.INTEGER,
    artist_id: { type: Sequelize.INTEGER, allowNull: false },
    play_count: { type: Sequelize.INTEGER, defaultValue: 0 },
  },
  {
    timestamps: true,
    tableName: "songs",
    freezeTableName: true,
  },
);

export default Song;
