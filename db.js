const { Pool } = require("pg")
// ? .env = menyimpan data konfigurasi agar tidak langsung di tuliskan dalam kode
// ? Dapat disebut juga variabel "global"
const dotenv = require("dotenv")
// ? Altiflan dotenv
dotenv.config()

// ? Koneksi ke PostgreSQL
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,

    ssl: {
        rejectUnauthorized: false
    }
})

module.export = pool