'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //relasi petugas
      this.hasOne(models.petugas, {
        foreignKey: "id_petugas",
        as: "petugas"
      })

      //relasi siswa
      this.hasOne(models.siswa, {
        foreignKey: "nisn",
        as: "siswa"
      })

      //relasi siswa
      this.hasOne(models.siswa, {
        foreignKey: "id_spp",
        as: "spp"
      })

    }
  };
  pembayaran.init({
    id_pembayaran: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_petugas: DataTypes.INTEGER,
    nisn: DataTypes.STRING,
    tgl_bayar: DataTypes.DATE,
    bulan_dibayar: DataTypes.STRING,
    tahun_dibayar: DataTypes.STRING,
    id_spp: DataTypes.INTEGER,
    jumlah_bayar: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pembayaran',
    tableName: "pembayaran"
  });
  return pembayaran;
};