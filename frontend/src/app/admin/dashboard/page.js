"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts");
      const sortedPosts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setPosts(sortedPosts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      alert("Post deleted successfully");
      setPosts(posts.filter((post) => post.id !== id)); // Remove deleted post from state
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Failed to delete post");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">Admin Dashboard</h1>
          <Link
            href="/admin/create-post"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Create New Post
          </Link>
        </header>

        <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Blog Posts</h2>
          <table className="w-full table-auto border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-3 px-4 border-b">Title</th>
                <th className="py-3 px-4 border-b">Status</th>
                <th className="py-3 px-4 border-b">Creation Date</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-all">
                  <td className="py-3 px-4 border-b">
                    <Link href={`/blog/${post.id}`} className="text-blue-600 hover:underline">
                      {post.title}
                    </Link>
                  </td>
                  <td className="py-3 px-4 border-b">{post.status}</td>
                  <td className="py-3 px-4 border-b">
                    {new Date(post.created_at).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Kolkata" 
                    })}
                  </td>
                  <td className="py-3 px-4 border-b space-x-6">
                    <Link
                      className="text-blue-500 hover:underline"
                      href={`/admin/edit-post/${post.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
