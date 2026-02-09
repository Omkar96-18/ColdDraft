<<<<<<< HEAD:frontend/src/Pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// API Configuration
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
=======

import { Link } from "react-router-dom";
>>>>>>> origin/main:frontend/src/pages/registration/Register.jsx

const Register = () => {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    full_name: "",
    company: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  // State for UI feedback
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1. Password Match Check
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending data...", formData);

      const payload = {
        name: formData.full_name, // Map UI 'full_name' to Backend 'name'
        company: formData.company,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      // 2. Send Request
      await api.post("/api/users", payload);

      console.log("Registration success! Redirecting to login...");

      // 3. Redirect to Login
      navigate("/login");

    } catch (err) {
      console.error(err);
      if (err.response) {
        // Display backend error message
        setError(err.response.data.detail || "Error occurred during registration");
      } else {
        setError("Network Error. Is the backend running?");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex overflow-hidden font-sans selection:bg-purple-500/30">
      {/* INJECTED STYLES TO HIDE SCROLLBAR */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      {/* GLOBAL AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Main Purple Haze (Left) */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[120%] opacity-40 blur-[120px]"
          style={{
            background: 'radial-gradient(circle at center, #5b21b6 0%, #2e1065 40%, transparent 70%)'
          }}
        />

        {/* Electric Blue Spot (Top Right) */}
        <div 
          className="absolute top-[5%] right-[10%] w-[30%] h-[40%] opacity-20 blur-[90px]"
          style={{
            background: 'radial-gradient(circle at center, #0ea5e9 0%, transparent 60%)'
          }}
        />

        {/* Subtle Crimson Edge (Middle Left) */}
        <div 
          className="absolute top-[40%] left-[-5%] w-[20%] h-[30%] opacity-15 blur-[80px]"
          style={{
            background: 'radial-gradient(circle at center, #ef4444 0%, transparent 70%)'
          }}
        />

        {/* Deep Royal Blue (Bottom Center) */}
        <div 
          className="absolute bottom-[-10%] left-[30%] w-[40%] h-[40%] opacity-20 blur-[100px]"
          style={{
            background: 'radial-gradient(circle at center, #2563eb 0%, transparent 70%)'
          }}
        />

        {/* Subtle Warm Pink/Red Glow (Bottom Right) */}
        <div 
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[80%] opacity-20 blur-[100px]"
          style={{
            background: 'radial-gradient(circle at center, #be185d 0%, transparent 70%)'
          }}
        />
      </div>

      <div className="flex w-full min-h-screen relative z-10">
        {/* =======================
            LEFT PANEL: Scrollable Form
            ======================= */}
        <div className="w-full lg:w-[45%] h-screen overflow-y-auto no-scrollbar border-r border-white/5 bg-black/20 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center min-h-full px-6 py-12 sm:px-12 lg:px-20">
            <div className="w-full max-w-md">
              {/* Branding */}
              <div className="mb-8">
                <h1 className="text-white text-xl font-bold tracking-tight opacity-80 flex items-center gap-2">
                  ColdDraft
                </h1>
              </div>

              {/* Header */}
              <div className="mb-8">
                <h2 className="text-4xl text-white font-serif mb-2 tracking-tight">
                  Create account
                </h2>
                <p className="text-gray-400 text-sm">
                  Join the network for personalized AI outreach.
                </p>
              </div>

              {/* ERROR ALERT BOX */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* REMOVED PROFILE PICTURE UPLOAD (As per previous request) */}

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full rounded-xl px-4 py-3 bg-white/[0.03] text-white border border-white/10 placeholder:text-gray-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      className="w-full rounded-xl px-4 py-3 bg-white/[0.03] text-white border border-white/10 placeholder:text-gray-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="Enter username"
                    className="w-full rounded-xl px-4 py-3 bg-white/[0.03] text-white border border-white/10 placeholder:text-gray-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="email@example.com"
                    className="w-full rounded-xl px-4 py-3 bg-white/[0.03] text-white border border-white/10 placeholder:text-gray-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="w-full rounded-xl px-4 py-3 bg-white/[0.03] text-white border border-white/10 placeholder:text-gray-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Confirm
                    </label>
                    <input
                      type="password"
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="w-full rounded-xl px-4 py-3 bg-white/[0.03] text-white border border-white/10 placeholder:text-gray-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                </div>

                {/* GLASS SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full mt-6 py-3.5 rounded-xl
                    bg-white/10 backdrop-blur-md
                    border border-white/20
                    text-white font-bold tracking-wide
                    hover:bg-white/20 hover:border-white/30
                    active:scale-[0.98]
                    transition-all duration-200
                    shadow-[0_0_30px_rgba(255,255,255,0.05)]
                  "
                >
                  {loading ? "Processing..." : "Create Account"}
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  Already registered?{" "}
                  <Link
                    to="/login"
                    className="text-white hover:text-purple-300 transition-colors font-medium border-b border-white/20 hover:border-purple-300"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =======================
            RIGHT PANEL: "Neural Network" Visual
            ======================= */}
        {/* Added p-12 to ensure content never touches the edges */}
        <div className="hidden lg:flex lg:w-[55%] h-screen flex-col items-center justify-center relative bg-black p-12">
          {/* Constellation Container - SCALED DOWN slightly to fix bottom collision */}
          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
            {/* CONNECTION LINES (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#a855f7" /> {/* Purple-500 */}
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <line
                x1="50%"
                y1="50%"
                x2="20%"
                y2="30%"
                stroke="url(#lineGradient)"
                strokeWidth="1"
              />
              <line
                x1="50%"
                y1="50%"
                x2="80%"
                y2="25%"
                stroke="url(#lineGradient)"
                strokeWidth="1"
              />
              <line
                x1="50%"
                y1="50%"
                x2="75%"
                y2="75%"
                stroke="url(#lineGradient)"
                strokeWidth="1"
              />
              <line
                x1="50%"
                y1="50%"
                x2="25%"
                y2="70%"
                stroke="url(#lineGradient)"
                strokeWidth="1"
              />
            </svg>

            {/* ORBITAL RINGS - REDUCED SIZES (420px, 280px, 160px) */}
            <div className="absolute w-[420px] h-[420px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[280px] h-[280px] border border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute w-[160px] h-[160px] border border-dashed border-white/20 rounded-full animate-[spin_20s_linear_infinite]" />

            {/* CENTER CORE */}
            <div className="relative z-20 w-20 h-20 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.4)]">
              <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-lg blur-sm absolute opacity-60 animate-pulse" />
              <div className="relative z-10 w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-sm" />
              </div>
            </div>

            {/* SATELLITE NODES */}
            <div className="absolute top-[30%] left-[20%] z-10 animate-[bounce_6s_infinite]">
              <div className="w-12 h-12 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#c084fc]" />
              </div>
            </div>

            <div className="absolute top-[25%] right-[20%] z-10 animate-[bounce_5s_infinite] delay-75">
              <div className="w-16 h-16 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center">
                <div className="w-8 h-1 bg-white/20 rounded-full" />
              </div>
            </div>

            <div className="absolute bottom-[25%] right-[25%] z-10 animate-[bounce_7s_infinite] delay-150">
              <div className="w-14 h-14 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-pink-400 rounded-full shadow-[0_0_10px_#f472b6]" />
              </div>
            </div>

            <div className="absolute bottom-[30%] left-[25%] z-10 animate-[bounce_8s_infinite] delay-300">
              <div className="px-3 py-1.5 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-lg">
                <div className="w-8 h-1 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>

          {/* Bottom Text Area - Reduced top margin to mt-8 */}
          <div className="relative z-10 mt-8 text-center">
            <h3 className="text-white text-lg font-medium mb-2">
              Connect Your Network
            </h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
              ColdDraft maps your relationships and automates your outreach
              intelligently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;