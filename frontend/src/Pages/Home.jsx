import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

// --- REUSABLE COMPONENTS ---
const Sidebar = ({ user, onLogout }) => (
  <aside className="w-64 border-r border-white/5 bg-black/20 backdrop-blur-3xl h-screen p-8 flex flex-col z-20">
    <div className="flex items-center gap-3 mb-12">
      <div className="h-10 w-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-xl shadow-lg shadow-white/10">
        {user?.username?.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col">
        <span className="text-white font-bold truncate">{user?.username}</span>
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Active User</span>
      </div>
    </div>
    <nav className="flex-1 space-y-2">
      <div className="bg-white/10 text-white p-4 rounded-2xl cursor-pointer font-bold text-sm">Campaigns</div>
      <div className="text-zinc-500 p-4 hover:text-white cursor-pointer transition-all text-sm font-bold">Analytics</div>
    </nav>
    <button onClick={onLogout} className="p-4 rounded-2xl border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500/10 transition-all">
      Logout
    </button>
  </aside>
);

const CampaignCard = ({ campaign, onDelete }) => (
  <div className="group relative bg-gradient-to-br from-white/[0.07] to-white/[0.01] border border-white/[0.08] rounded-[2.5rem] p-6 transition-all duration-500 hover:border-white/[0.2] hover:bg-white/[0.08] hover:-translate-y-2">
    <div className="flex justify-between items-start mb-6">
       <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10 bg-white/5 text-zinc-400">
         {campaign.type}
       </span>
       <button onClick={() => onDelete(campaign.id)} className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-500 transition-all text-xs font-bold uppercase">Delete</button>
    </div>
    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">{campaign.name}</h3>
    <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-8">{campaign.description}</p>
    
    <div className="pt-6 border-t border-white/[0.05] flex justify-between items-end">
       <div>
          <p className="text-[9px] font-black uppercase text-zinc-600 tracking-widest mb-1">Status</p>
          <p className="text-white text-sm font-bold capitalize">{campaign.status}</p>
       </div>
       <div className="text-right">
          <p className="text-[9px] font-black uppercase text-zinc-600 tracking-widest mb-1">Created</p>
          <p className="text-zinc-400 text-xs">{new Date(campaign.created_at).toLocaleDateString()}</p>
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
        const [userRes, campaignRes] = await Promise.all([
          api.get("/api/users/me"),
          api.get("/api/campaigns")
        ]);
        setUser(userRes.data);
        setCampaigns(campaignRes.data);
      } catch (err) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    initDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this campaign?")) return;
    try {
      await api.delete(`/api/campaigns/${id}`);
      setCampaigns(campaigns.filter(c => c.id !== id));
    } catch (err) { console.error("Delete failed"); }
  };

  if (loading) return (
    <div className="h-screen w-full bg-[#020202] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
    </div>
  );

  return (
    <div className="flex h-screen bg-[#020202] text-zinc-200 overflow-hidden relative font-sans selection:bg-blue-500/30">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <Sidebar user={user} onLogout={handleLogout} />

      <main className="flex-1 overflow-y-auto relative z-10 p-12 custom-scrollbar">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-end mb-20">
            <div>
              <h1 className="text-5xl font-black tracking-tighter text-white">Outreach</h1>
              <div className="flex items-center gap-3 text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">
                <span>Dashboard</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                <span>{campaigns.length} Campaigns Active</span>
              </div>
            </div>
            <button className="px-10 py-5 rounded-full bg-white text-black font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
              Launch New
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {campaigns.map((c) => (
              <CampaignCard key={c.id} campaign={c} onDelete={handleDelete} />
            ))}
            {campaigns.length === 0 && (
              <div className="col-span-full py-20 border-2 border-dashed border-white/5 rounded-[3rem] text-center">
                <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">No active campaigns found.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;