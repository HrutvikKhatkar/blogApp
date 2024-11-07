"use client";

import Link from 'next/link';
import { useSession, signIn } from "next-auth/react";

const AdminIndex = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085")' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 opacity-80"></div>
        <div className="relative text-center p-10 bg-white bg-opacity-90 rounded-xl shadow-lg border border-gray-200 items-center backdrop-filter backdrop-blur-md">
          <p className="text-2xl font-bold mb-4 text-gray-800">
            Welcome to Blog App
          </p>
          <button 
            onClick={() => signIn("google")} 
            className="flex items-center justify-center bg-white border border-gray-300 shadow-md rounded-lg py-3 px-6 hover:bg-gray-100 transition-all"
          >
            <img
              src="https://image.similarpng.com/very-thumbnail/2020/06/Logo-google-icon-PNG.png"
              alt="Google logo"
              className="h-6 w-6 mr-3"
            />
            <span className="text-gray-700 font-medium">Sign in with Google</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1533750349088-cd871a92f312")' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-blue-500 opacity-70"></div>
      <div className="relative text-center p-10 bg-white bg-opacity-90 rounded-xl shadow-2xl backdrop-filter backdrop-blur-md">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Admin Panel</h1>
        <p className="mb-6 text-gray-600">
          Welcome, <span className="font-semibold">{session.user.email}</span>
        </p>
        <Link 
          href="/admin/dashboard" 
          className="bg-blue-600 text-white py-2 px-8 rounded-full hover:bg-blue-700 transition-colors font-medium text-lg shadow-lg"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AdminIndex;




