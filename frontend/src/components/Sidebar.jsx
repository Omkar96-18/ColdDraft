import React from "react";

const Sidebar = ({ user }) => {
  const menuItems = ['Campaigns', 'Analytics', 'Contacts', 'Settings'];
  
  // Get first letter for the avatar, fallback to '?'
  const userInitial = user?.username?.charAt(0).toUpperCase() || "U";

  return (
    <aside className="w-64 border-r border-white/[0.06] bg-white/[0.01] backdrop-blur-3xl z-20 flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.5)]">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-white to-zinc-500 shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center justify-center text-black font-black text-lg">
            {userInitial}
          </div>
          <span className="text-white font-bold tracking-tight text-lg truncate">
            {user?.username || "Guest User"}
          </span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 mt-4 space-y-1.5">
        {menuItems.map(item => (
          <div 
            key={item} 
            className={`group cursor-pointer px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
              item === 'Campaigns' 
                ? 'bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' 
                : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            {item}
          </div>
        ))}
      </nav>

      <div className="p-6">
        <div className="p-4 rounded-3xl bg-white/[0.03] border border-white/5">
          <p className="text-[10px] font-black uppercase text-zinc-500 mb-2 tracking-widest">Storage</p>
          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;