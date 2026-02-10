import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ user, onLogout }) => (
  <aside className="w-20 lg:w-64 border-r border-white/5 bg-black/20 backdrop-blur-3xl h-screen flex flex-col items-center lg:items-start p-6 z-20 fixed left-0 top-0">
    <div className="flex items-center gap-3 mb-12">
      <div className="h-10 w-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-xl shadow-lg shadow-white/10">
        {user?.username?.charAt(0).toUpperCase()}
      </div>
      <div className="hidden lg:flex flex-col">
        <span className="text-white font-bold truncate w-32">{user?.username}</span>
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
          Active User
        </span>
      </div>
    </div>
    
    <nav className="flex-1 space-y-2 w-full">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `p-4 rounded-2xl cursor-pointer font-bold text-sm text-center lg:text-left transition-all w-full
          ${isActive ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'}`
        }
      >
        Campaigns
      </NavLink>
      <NavLink
        to="/messages/generate" // New link for AI Message Generator
        className={({ isActive }) =>
          `p-4 rounded-2xl cursor-pointer font-bold text-sm text-center lg:text-left transition-all w-full
          ${isActive ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'}`
        }
      >
        AI Gen
      </NavLink>
      <div className="text-zinc-500 p-4 hover:text-white cursor-pointer transition-all text-sm font-bold text-center lg:text-left">
        Analytics
      </div>
    </nav>
    
    <button
      onClick={onLogout}
      className="w-full p-4 rounded-2xl border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500/10 transition-all"
    >
      <span className="hidden lg:inline">Logout</span>
      <span className="lg:hidden">X</span>
    </button>
  </aside>
);

export default Sidebar;
