// server.js
const express = require("express");
const db = require("../db");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key"; 

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log("token", token)
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = { id: decoded.id }; // assuming the token contains user id
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
// app.use(cors());
app.use(cors({ origin: ['https://blog-app-uy22.vercel.app', 'https://accounts.google.com'],   methods: ['GET', 'POST', 'OPTIONS'], // Add other methods if needed
 }));

app.use(express.json());

// Create a new blog post
app.post("/posts", (req, res) => {
  const {
    title,
    content,
    image_url,
    video_url,
    meta_title,
    meta_description,
    tags,
    status,
    creator_id,
  } = req.body;
  // console.log(req)
  const sql = `INSERT INTO blogs (title, content, image_url, video_url, meta_title, meta_description, tags, status, creator_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    title,
    content,
    image_url,
    video_url,
    meta_title,
    meta_description,
    tags,
    status,
    creator_id,
  ];
  // console.log( params)
  // console.log(typeof params.creator_id)

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Error running SQL query:', err.message); // Log the full error
      return res.status(500).json({ error: err.message });
    }
    // console.log('Inserted post with ID:', this.lastID); // Log the last inserted ID
    res.json({ id: this.lastID });


  });
});

// Get all blog posts
app.get("/posts", (req, res) => {
  const sql = `SELECT * FROM blogs`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get a single blog post by ID
app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM blogs WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// Update a blog post by ID
// server.js - Update /posts/:id PUT route for authorization
app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  // console.log(id)
  const {
    title,
    content,
    image_url,
    video_url,
    meta_title,
    meta_description,
    tags,
    status,
  } = req.body;
  // const userId = req.user.id; // Assuming authenticateUser middleware provides req.user
  // console.log(req.body)
// console.log(req.user)
  // Fetch the original post to verify creator ID
  const selectSql = `SELECT creator_id FROM blogs WHERE id = ?`;
  db.get(selectSql, [id], (err, post) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is the original creator of the post
    // if (post.creator_id !== userId) {
    //   return res
    //     .status(403)
    //     .json({ message: "You are not authorized to edit this post" });
    // }

    // Update the post if authorization passes
    const updateSql = `UPDATE blogs SET title = ?, content = ?, image_url = ?, video_url = ?, meta_title = ?, meta_description = ?, tags = ?, status = ? WHERE id = ?`;
    const params = [
      title,
      content,
      image_url,
      video_url,
      meta_title,
      meta_description,
      tags,
      status,
      id,
    ];

    db.run(updateSql, params, function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Post updated successfully", changes: this.changes });
    });
  });
});


// Delete a blog post by ID
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM blogs WHERE id = ?`;

  db.run(sql, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
