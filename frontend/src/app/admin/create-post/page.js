"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const CreatePost = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
    video_url: "",
    meta_title: "",
    meta_description: "",
    tags: "",
    status: "draft",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const postData = { ...formData, creator_id: userId };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://blogapp-5kma.onrender.com/posts", postData);
      alert("Post created successfully");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to create post");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Create New Post</h1>
      </header>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Content</label>
            <textarea
              name="content"
              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Image URL</label>
            <input
              type="text"
              name="image_url"
              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Video URL</label>
            <input
              type="text"
              name="video_url"
              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Meta Title</label>
            <input
              type="text"
              name="meta_title"
              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Meta Description</label>
            <textarea
              name="meta_description"
              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Tags</label>
            <input
              type="text"
              name="tags"
              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              name="status"
              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={handleChange}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Save Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
