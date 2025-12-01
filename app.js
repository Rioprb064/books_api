const express = require('express')
const app = express()
const cors = require("cosr")
const pool = require("./db")

// ? middleware
app.use(espress.json())
app.use(cors)

// ? Pencarian buku
app.get("/books", async(req,res) => {
    const { title, author, publisher } = req.query;
  // ? www.lab1.com/books?title=Kenangan&publisher=astonishing

  let query = "SELECT * FROM books ";
  // ? potongan kondisi SQL yang nantinya digabungkan menjadi bagian WHERE
  let conditions = [];

  // ? nilai yang akan dimasukkan ke query placeholder $1, $2, dst.
  // ! Misalnya "SELECT * FROM books WHERE title = 'kenangan' AND publisher = 'astonishing'"
  // ! Misalnya "SELECT * FROM books WHERE title = $1 AND publisher = $2"
  // ! Lebih aman, /books?title=a'; DROP TABLE books; --
  let values = [];


  if (title) {
    conditions.push(`title ILIKE $${values.length + 1}`);
    values.push(`%${title}%`);
    // ? % = wildcard, teks yang mengandung value tsb
    // ? condition = [title ILIKE $1]
    // ? values = ['%kenangan%']
  }
  if (author) {
    conditions.push(`author ILIKE $${values.length + 1}`);
    values.push(`%${author}%`);
  }
  if (publisher) {
    conditions.push(`publisher ILIKE $${values.length + 1}`);
    values.push(`%${publisher}%`);
    // ? condition = [title ILIKE $1, publisher ILIKE $2]
    // ? values = ['%kenangan%', '%astonishing%']
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }
  // ? query = SELECT * FROM books WHERE title ILIKE $1 AND publisher ILIKE $2

  // ! try-catch = Error handling untuk mencegah program berhenti ketika terjadi error.
  try {
    // ? berisi kode yang mungkin menimbulkan error ketika dijalankan.
    // ? menjalankan query ke database
    const result = await pool.query(query, values);
    // ! await = Menunggu hasil dari Postgre
    
    if (result.rows.length === 0) {
      return res.status(200).json({
        error: false,
        message: "Tidak ada hasil yang ditemukan",
        data: [],
      });
    }

    res.status(200).json({
      error: false,
      message: "Data berhasil ditemukan",
      data: result.rows,
    });
  } catch (err) {
    // ? berisi kode yang akan dijalankan jika terjadi error di dalam blok try
    // ! Internal Server Error
    console.error(err.message);
    res.status(500).json({ error: true, message: "Server Error" });
  }
})

// ? Menampilkan buku berdasarkan ID
app.get("/books/:id", async(req,res) => {})

// ? Tambah buku
app.post("/books", async(req,res) => {})

// ? Edit buku
app.put("/books/:id", async(req,res) => {})

// ? Hapus buku
app.delete("/books/:id", async(req,res) => {})