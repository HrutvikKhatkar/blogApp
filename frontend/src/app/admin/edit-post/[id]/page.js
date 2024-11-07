"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const EditPost = ({ params }) => {
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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const id = params.id;
        const response = await axios.get(`https://blogapp-5kma.onrender.com/posts/${id}`);
        const post = response.data;

        if (String(post.creator_id) !== String(userId)) {
          alert("You do not have permission to edit this post");
          router.push("/admin/dashboard");
        } else {
          setFormData(post); // Populate form if user is authorized
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("Failed to fetch post");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) fetchPost();
  }, [params.id, userId, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { ...formData, creator_id: userId }; // Ensure creator_id is set in postData

    try {
      const id = params.id;
      await axios.put(`https://blogapp-5kma.onrender.com/posts/${id}`, postData);
      alert("Post updated successfully");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Failed to update post:", error);
      alert("Failed to update post");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Edit Post</h1>
      </header>
      <div className="bg-white shadow rounded p-6">
        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              className="w-full border rounded px-3 py-2"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Content Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Content</label>
            <textarea
              name="content"
              className="w-full border rounded px-3 py-2"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image URL Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Image URL</label>
            <input
              type="text"
              name="image_url"
              className="w-full border rounded px-3 py-2"
              value={formData.image_url}
              onChange={handleChange}
            />
          </div>

          {/* Video URL Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Video URL</label>
            <input
              type="text"
              name="video_url"
              className="w-full border rounded px-3 py-2"
              value={formData.video_url}
              onChange={handleChange}
            />
          </div>

          {/* Meta Title Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Meta Title</label>
            <input
              type="text"
              name="meta_title"
              className="w-full border rounded px-3 py-2"
              value={formData.meta_title}
              onChange={handleChange}
            />
          </div>

          {/* Meta Description Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Meta Description</label>
            <textarea
              name="meta_description"
              className="w-full border rounded px-3 py-2"
              value={formData.meta_description}
              onChange={handleChange}
            />
          </div>

          {/* Tags Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Tags</label>
            <input
              type="text"
              name="tags"
              className="w-full border rounded px-3 py-2"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          {/* Status Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              name="status"
              className="w-full border rounded px-3 py-2"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
