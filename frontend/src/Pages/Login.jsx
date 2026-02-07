import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const handleNoOp = (e) => e.preventDefault();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* GLOBAL AMBIENT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        {/* The strong purple gradient washing over the Left Panel */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[120%] opacity-60 blur-[120px]"
          style={{
            background: 'radial-gradient(circle at center, #5b21b6 0%, #2e1065 40%, transparent 70%)'
          }}
        />
      </div>

      <div className="flex w-full min-h-screen relative z-10">
        
        {/* =======================
            LEFT PANEL: Login Form
           ======================= */}
        <div className="w-full lg:w-[45%] flex flex-col items-center justify-center p-8 lg:pl-20 lg:pr-12 relative border-r border-white/5">
          
          <div className="w-full max-w-sm">
            {/* Branding */}
            <div className="mb-12">
               <h1 className="text-white text-2xl font-bold tracking-tight flex items-center gap-2">
                 ColdDraft
               </h1>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-4xl text-white font-serif mb-2 tracking-tight">Welcome back</h2>
              <p className="text-gray-400 text-sm">
                Enter your details to access your network.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleNoOp} className="space-y-5">
              
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="
                    w-full rounded-xl px-4 py-3
                    bg-white/[0.03] text-white
                    border border-white/10
                    placeholder:text-gray-600
                    focus:outline-none focus:border-white/20 focus:bg-white/[0.05]
                    transition-all duration-200
                  "
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="
                    w-full rounded-xl px-4 py-3
                    bg-white/[0.03] text-white
                    border border-white/10
                    placeholder:text-gray-600
                    focus:outline-none focus:border-white/20 focus:bg-white/[0.05]
                    transition-all duration-200
                  "
                />
              </div>

              {/* UPDATED: GLASS SIGN IN BUTTON */}
              <button
                type="submit"
                className="
                  w-full mt-2 py-3.5 rounded-xl
                  bg-white/10 backdrop-blur-md
                  border border-white/20
                  text-white font-bold tracking-wide
                  hover:bg-white/20 hover:border-white/30
                  active:scale-[0.98]
                  transition-all duration-200
                  shadow-[0_0_30px_rgba(255,255,255,0.05)]
                "
              >
                Sign In
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                New user?{" "}
                <Link 
                  to="/register" 
                  className="text-white hover:text-purple-300 transition-colors font-medium border-b border-white/20 hover:border-purple-300"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* =======================
            RIGHT PANEL: Visuals
           ======================= */}
        <div className="hidden lg:flex lg:w-[55%] flex-col items-center justify-center p-12 relative bg-black">
          
          {/* CSS RECREATION OF THE "CLAY SPHERE" & SHAPES */}
          <div className="relative w-[500px] h-[500px] flex items-center justify-center">
            
            {/* Orbiting Shape 1: Top Right (Purple Circle) */}
            <div className="absolute top-[20%] right-[25%] w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 opacity-80 blur-sm animate-pulse" />
            
            {/* Orbiting Shape 2: Bottom Left (Pink Semi-Circle) */}
            <div className="absolute bottom-[25%] left-[25%] w-20 h-20 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 opacity-80 blur-[2px]" />
            
            {/* Orbiting Shape 3: Top Left (Yellow Triangle-ish) */}
            <div className="absolute top-[30%] left-[20%] w-16 h-16 bg-yellow-600/40 rotate-45 blur-md" />

            {/* THE CENTRAL GLASS SPHERE (CD Text Removed) */}
            <div className="relative z-10 w-64 h-64 rounded-full bg-gradient-to-b from-white/10 to-transparent backdrop-blur-2xl border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
              
              {/* Inner Gloss */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              
            </div>
            
            {/* Floating faint elements behind */}
            <div className="absolute w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl -z-10" />

          </div>

          {/* Bottom Text Area */}
          <div className="relative z-10 mt-[-40px] text-center">
            <h3 className="text-white text-lg font-medium mb-2">Welcome</h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
              ColdDraft is the most powerful way to remember who you've met and what matters to them.
            </p>
          </div>

          {/* Pagination Dots REMOVED here */}

        </div>

      </div>
    </div>
  );
};

export default Login;