import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

// --- REUSABLE COMPONENTS ---
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
      <div className="bg-white/10 text-white p-4 rounded-2xl cursor-pointer font-bold text-sm text-center lg:text-left">
        Campaigns
      </div>
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

const CampaignCard = ({ campaign, onDelete }) => (
  <div className="group relative bg-gradient-to-br from-white/[0.07] to-white/[0.01] border border-white/[0.08] rounded-[2.5rem] p-4 transition-all duration-500 hover:border-white/[0.2] hover:bg-white/[0.08] hover:-translate-y-2">
    
    {/* --- NEW: Image Section --- */}
    <div className="h-48 w-full overflow-hidden rounded-[2rem] relative mb-6 shadow-lg bg-black">
        <img 
            src={campaign.banner_url || "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80"} 
            alt={campaign.name}
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
        />
        
        {/* Type Badge (Overlaid on Image) */}
        <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 bg-black/50 text-white shadow-xl">
                {campaign.type}
            </span>
        </div>

        {/* Delete Button (Overlaid on Image) */}
        <button
            onClick={(e) => {
                e.stopPropagation(); // Prevent triggering card click if you add one later
                onDelete(campaign.id);
            }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400"
            title="Delete Campaign"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
    </div>

    {/* Content Section */}
    <div className="px-2 pb-2">
        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
        {campaign.name}
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-6 h-10">
        {campaign.description || "No description provided."}
        </p>

        <div className="pt-4 border-t border-white/[0.05] flex justify-between items-end">
            <div>
                <p className="text-[9px] font-black uppercase text-zinc-600 tracking-widest mb-1">
                Status
                </p>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                    <p className="text-white text-xs font-bold capitalize">
                    Active
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-[9px] font-black uppercase text-zinc-600 tracking-widest mb-1">
                Created
                </p>
                <p className="text-zinc-400 text-xs font-medium">
                {new Date(campaign.created_at).toLocaleDateString()}
                </p>
            </div>
        </div>
    </div>
  </div>
);

const Home = () => {
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initDashboard = async () => {
      try {
        const token = localStorage.getItem("token") || localStorage.getItem("access_token");
        if (!token) throw new Error("No token");

        // Assuming your API helper handles headers, if not, add { headers: { Authorization: `Bearer ${token}` } }
        const [userRes, campaignRes] = await Promise.all([
          api.get("/api/users/me"),
          api.get("/api/campaigns/"),
        ]);
        
        setUser(userRes.data);
        setCampaigns(campaignRes.data);
      } catch (err) {
        console.error("Dashboard Load Error:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    initDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this campaign?")) return;
    try {
      await api.delete(`/api/campaigns/${id}`);
      setCampaigns(campaigns.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete campaign");
    }
  };

  if (loading)
    return (
      <div className="h-screen w-full bg-[#020202] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
            <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest animate-pulse">Loading Engine...</div>
        </div>
      </div>
    );

  return (
    <div className="flex h-screen bg-[#020202] text-zinc-200 overflow-hidden relative font-sans selection:bg-blue-500/30">
      <Sidebar user={user} onLogout={handleLogout} />

      <main className="flex-1 ml-20 lg:ml-64 relative z-10 h-full overflow-y-auto p-8 lg:p-12 scrollbar-hide">
         {/* Background Ambience */}
        <div className="fixed top-[-10%] left-[20%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto pb-20">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h1 className="text-5xl font-black tracking-tighter text-white mb-2">
                Outreach
              </h1>
              <div className="flex items-center gap-3 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                <span>Dashboard</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                <span>{campaigns.length} Campaigns Active</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/campaigns/new")}// Updated to match your previous route
              className="px-8 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              + Launch New
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {campaigns.map((c) => (
              <CampaignCard key={c.id} campaign={c} onDelete={handleDelete} />
            ))}
            
            {campaigns.length === 0 && (
              <div className="col-span-full py-32 border border-dashed border-white/10 rounded-[3rem] text-center bg-white/[0.01]">
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-4">
                  No active campaigns found
                </p>
                <button 
                    onClick={() => navigate("/create")}
                    className="text-white border-b border-white pb-0.5 text-sm font-bold hover:text-blue-400 hover:border-blue-400 transition-all"
                >
                    Create your first campaign
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;