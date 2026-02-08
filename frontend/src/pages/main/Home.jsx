import React, { useState } from "react";

// --- DATA ---
const campaigns = [
  {
    title: "Nashik Wine Campaign",
    desc: "Distributor outreach for premium wine brands",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80",
    status: "Live",
    stats: { sent: 1240, openRate: "42%" },
  },
  {
    title: "Glassdoor Campaign",
    desc: "Employer branding & reputation management",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80",
    status: "Running",
    stats: { sent: 850, openRate: "35%" },
  },
  {
    title: "LensCard Campaign",
    desc: "Cold outreach for eyewear customers",
    img: "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&q=80",
    status: "Draft",
    stats: { sent: 0, openRate: "-" },
  },
  {
    title: "Tech Summit Invite",
    desc: "VIP invitations for annual tech conference",
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80",
    status: "Scheduled",
    stats: { sent: 0, openRate: "-" },
  },
];

// --- COMPONENTS ---

const StatusBadge = ({ status }) => {
  const styles = {
    Live: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
    Running: "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]",
    Scheduled: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Draft: "bg-zinc-800/50 text-zinc-400 border-zinc-700/50",
  };

  const activeStyle = styles[status] || styles.Draft;

  return (
    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${activeStyle}`}>
      {status}
    </span>
  );
};

const SidebarItem = ({ icon, label, isActive }) => (
  <button
    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
      isActive
        ? "bg-white/10 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
        : "text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
    }`}
  >
    <span className={`mr-3 ${isActive ? "text-white" : "text-zinc-600 group-hover:text-zinc-400"}`}>
      {icon}
    </span>
    {label}
  </button>
);

const Home = () => {
  const [activeTab, setActiveTab] = useState("Campaigns");

  return (
    <div className="flex h-screen bg-[#050505] text-zinc-200 font-sans selection:bg-orange-500/30 overflow-hidden">
      
      {/* --- AMBIENT GLOWS (Matching your Nexus Screenshot) --- */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Warm Peach Glow (Top Left) */}
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vh] bg-orange-500/10 blur-[120px] rounded-full mix-blend-screen" />
        {/* Deep Indigo/Purple (Bottom Right) */}
        <div className="absolute top-[20%] -right-[10%] w-[40vw] h-[60vh] bg-indigo-600/10 blur-[130px] rounded-full mix-blend-screen" />
        {/* Subtle Pink (Center) */}
        <div className="absolute bottom-[-10%] left-[20%] w-[30vw] h-[40vh] bg-pink-600/5 blur-[100px] rounded-full" />
      </div>

      {/* --- SIDEBAR --- */}
      <aside className="w-64 flex flex-col border-r border-white/5 bg-[#080808]/50 backdrop-blur-xl relative z-20">
        
        {/* 1. PROFILE SECTION (Moved to Top) */}
        <div className="p-4 mb-2">
          <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 text-left group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80"
                alt="Profile"
                className="w-10 h-10 rounded-lg object-cover ring-1 ring-white/10 group-hover:ring-white/20 transition-all"
              />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-black rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Saurabh</p>
              <p className="text-[11px] text-zinc-500 truncate group-hover:text-zinc-400">Pro Workspace</p>
            </div>
            <svg className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* 2. SEARCH (Clay Style) */}
        <div className="px-4 mb-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-9 pr-3 py-1.5 border border-white/5 rounded-lg leading-5 bg-white/5 text-zinc-300 placeholder-zinc-600 focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-white/20 sm:text-sm transition-all shadow-inner"
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-zinc-600 text-xs border border-white/10 rounded px-1.5 py-0.5">⌘K</span>
            </div>
          </div>
        </div>

        {/* 3. NAVIGATION */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar">
          {[
            { label: "Home", icon: <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
            { label: "Review", icon: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> },
            { label: "People", icon: <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /> },
            { label: "Campaigns", icon: <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /> },
            { label: "Settings", icon: <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /> },
          ].map((item) => (
            <SidebarItem 
              key={item.label}
              label={item.label} 
              isActive={activeTab === item.label}
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  {item.icon}
                </svg>
              } 
            />
          ))}
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 relative z-10 overflow-y-auto no-scrollbar">
        <div className="max-w-6xl mx-auto px-8 py-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight mb-2 drop-shadow-sm">Campaigns</h1>
              <div className="flex items-center space-x-2 text-zinc-500 text-sm font-medium">
                <span>Workspace</span>
                <span className="text-zinc-700">/</span>
                <span className="text-zinc-400">Outreach</span>
              </div>
            </div>
            
            <button className="
              group px-4 py-2 rounded-lg
              bg-white text-black font-semibold text-sm
              hover:bg-zinc-200 transition-all duration-200
              flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]
            ">
              <svg className="w-4 h-4 text-zinc-600 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Campaign
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { label: 'Active', value: '12', trend: '+2', color: 'text-emerald-400' },
              { label: 'Total Reach', value: '8,540', trend: '+12%', color: 'text-blue-400' },
              { label: 'Avg Open Rate', value: '42.8%', trend: '+4%', color: 'text-orange-400' },
            ].map((stat, i) => (
              <div key={i} className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">{stat.label}</span>
                  <span className={`text-xs font-bold ${stat.color} bg-white/5 px-1.5 py-0.5 rounded`}>{stat.trend}</span>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Campaign Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
            {campaigns.map((c, i) => (
              <div
                key={i}
                className="
                  group relative flex flex-col
                  bg-[#0A0A0A] border border-white/[0.08] rounded-2xl overflow-hidden
                  hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,1)]
                  hover:-translate-y-1
                  transition-all duration-300 ease-out
                "
              >
                {/* Image Section - NO OPACITY, CRYSTAL CLEAR */}
                <div className="h-48 w-full relative overflow-hidden bg-zinc-900">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle gradient ONLY at the bottom for text contrast if needed, but keeping image clear */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-80" />
                  
                  <div className="absolute top-3 right-3">
                    <StatusBadge status={c.status} />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-1 border-t border-white/5 bg-[#0A0A0A]">
                  <div className="mb-auto">
                    <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-orange-200 transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                      {c.desc}
                    </p>
                  </div>

                  {/* Footer Stats */}
                  <div className="flex items-center justify-between pt-5 mt-5 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-zinc-500 transition-colors" />
                      <span className="text-xs text-zinc-400 font-medium">
                        {c.stats.sent} <span className="text-zinc-600">sent</span>
                      </span>
                    </div>
                    
                    <div className="text-xs font-mono font-medium">
                      <span className={c.stats.openRate !== '-' ? 'text-emerald-400' : 'text-zinc-600'}>
                        {c.stats.openRate}
                      </span>
                      <span className="text-zinc-600 ml-1">open</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default Home;