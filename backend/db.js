// db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the SQLite database
const dbPath = path.resolve(__dirname, 'blog.db'); // Path to your database file
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create the blogs table if it doesn't exist
db.serialize(() => {
  // db.run('DROP TABLE IF EXISTS blogs', (err) => {
  //   if (err) {
  //     console.error('Error dropping table:', err.message);
  //   } else {
  //     console.log('Table dropped successfully.');
  //   }
  // });
  db.run(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      image_url TEXT,
      video_url TEXT,
      meta_title TEXT,
      meta_description TEXT,
      tags TEXT,
      status TEXT DEFAULT 'draft',
      creator_id TEXT NOT NULL, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
