'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.hasMany(models.pembayaran, {
        foreignKey: "nisn",
        as: "siswa"
      })

      //relasi pembayaran
      this.hasMany(models.pembayaran, {
        foreignKey: "id_spp",
        as: "spp_pembayaran"
      })

      //relasi spp
      this.hasOne(models.spp, {
        foreignKey: "id_spp",
        as: "spp"
      })

      //relasi kelas
      this.hasOne(models.kelas, {
        foreignKey: "id_kelas",
        as: "kelas"
      })

    }
  };
  siswa.init({
    nisn: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nis: DataTypes.STRING,
    nama: DataTypes.STRING,
    id_kelas: DataTypes.INTEGER,
    alamat: DataTypes.TEXT,
    no_telp: DataTypes.STRING,
    id_spp: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'siswa',
    tableName: "siswa"
  });
  return siswa;
};