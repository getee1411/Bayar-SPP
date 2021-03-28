const express = require("express")
const app = express()

const kelas = require("./router/endpoint-kelas")
const petugas = require("./router/endpoint-petugas")
const spp = require("./router/endpoint-spp")
const siswa = require("./router/endpoint-siswa")
const pembayaran = require("./router/endpoint-pembayaran")

app.use("/pembayaran/spp/data/kelas", kelas)
app.use("/pembayaran/spp/data/petugas", petugas)
app.use("/pembayaran/spp/data/spp", spp)
app.use("/pembayaran/spp/data/siswa", siswa)
app.use("/pembayaran/spp/data/transaksi", pembayaran)

app.use(express.static(__dirname))

app.listen(8000, ()=> {
    console.log("success")
})