# Blog Admin Dashboard

A responsive blog management system where an admin can create, edit, and publish blog posts. Each post can include images, videos, meta tags, and SEO fields. The system is built with **Next.js**, **Tailwind CSS**, **Node.js**, and **SQLite3**.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Setup](#project-setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Optional Enhancements](#optional-enhancements)
- [License](#license)

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: SQLite3

## Features

### Admin Dashboard:
- **Create New Blog Post**: Add a title, content, images, video links, and SEO fields (meta title, meta description, and tags).
- **Edit Blog Post**: Edit all fields in existing posts, update images, video links, and SEO fields.
- **Delete Blog Post**: Remove posts from the dashboard.
- **Post List**: Display a list of all posts with titles, publish status, and creation date. Filter posts by status (published/draft).

### Blog Display Page:
- Fetch and display blog posts on the frontend with images, videos, and SEO meta tags for search engine optimization.

### Responsiveness:
- The blog dashboard and blog page are fully responsive, optimized for mobile, tablet, and desktop screens.

## Project Setup

### Frontend Setup

Navigate to the `frontend` directory:
   ```bash
   cd frontend
   npm install
   npm run dev
Install the dependencies:
    ```bash
    Copy code
    npm install
Run the development server:
    ```bash
    Copy code
    npm run dev
The frontend will be running on http://localhost:3000.


### Backend Setup

Navigate to the backend directory:
  bash
  Copy code
  cd backend
  Install the dependencies:
  
  bash
  Copy code
  npm install
  Create the SQLite3 database by running the init.sql script:
  
  bash
  Copy code
  node db.js
  Start the backend server:
  
  bash
  Copy code
  npm start
  The backend will be running on http://localhost:5000.
