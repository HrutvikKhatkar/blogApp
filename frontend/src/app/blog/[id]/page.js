"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PostDetail = ({ params }) => {
  const { id } = params;
  const [post, setPost] = useState(null);
  const router = useRouter();

  // Use useEffect to fetch data only when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        setPost(response.data); // This should be inside useEffect to avoid state updates during render
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };

    fetchPost();
  }, [id]); // Only re-fetch when the id changes

  if (!post)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    );

  // Helper function to extract YouTube video ID
  function getYouTubeVideoId(url) {
    const urlObj = new URL(url);
    // Handle standard YouTube URLs
    if (urlObj.hostname.includes("youtube.com")) {
      return urlObj.searchParams.get("v");
    }
    // Handle shortened YouTube URLs (e.g., youtu.be/VIDEO_ID)
    if (urlObj.hostname.includes("youtu.be")) {
      return urlObj.pathname.slice(1);
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          <Link
            href="/admin/dashboard"
            className="bg-blue-600 text-white py-2 px-2 rounded hover:bg-blue-700"
          >
            Back
          </Link>
        </div>

        <div className="text-gray-600 mb-4">
          <p>
            Status: <strong>{post.status}</strong>
          </p>
          <p>
            Tags: <strong>{post.tags}</strong>
          </p>
          <p>
            Meta Title: <strong>{post.meta_title}</strong>
          </p>
          <p>
            Meta Description: <strong>{post.meta_description}</strong>
          </p>
        </div>

        <div className="text-gray-700 mb-4">
          <h2 className="text-2xl font-semibold mb-2">Content</h2>
          <p>{post.content}</p>
        </div>

        {post.image_url && (
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Image</h2>
            <img
              src={post.image_url}
              alt="Post Image"
              className="w-full h-auto rounded"
            />
          </div>
        )}

        {/* {post.video_url && (
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Video</h2>
            <div className="relative w-full pt-[56.25%]">
              <iframe
                src="https://www.youtube.com/embed/wB6IFCeTssk?si=0n88VZDw_Lm78uIV"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        )} */}
        {post.video_url && (
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Video</h2>
            <div className="relative w-full pt-[56.25%]">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                  post.video_url
                )}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
