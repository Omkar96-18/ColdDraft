import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const ProspectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prospect, setProspect] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProspect = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/api/prospects/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProspect(res.data);
      } catch (err) {
        console.error("Error fetching prospect", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProspect();
  }, [id]);

  if (loading) return (
    <div className="h-screen w-full bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
    </div>
  );

  if (!prospect) return <div className="text-white">Prospect not found.</div>;

  // --- STYLING ---
  const theme = {
    bg: "bg-blue-500",
    color: "text-blue-400",
    border: "border-blue-500/20",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.1)]",
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 font-sans selection:bg-blue-500/30 pb-20 relative">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto p-6 lg:p-10 relative z-10">
        
        {/* Navigation */}
        <header className="flex justify-between items-center mb-10">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors group"
            >
                <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-colors">←</span>
                <span>Return to Campaign</span>
            </button>
            <div className="px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-[10px] font-black uppercase tracking-widest">
                ● Live Record
            </div>
        </header>

        {/* --- HERO SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 items-center">
            
            {/* 1. Avatar / Initials */}
            <div className="md:col-span-2">
                <div className={`aspect-square rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-6xl font-black text-white ${theme.glow}`}>
                    {prospect.full_name?.charAt(0) || "?"}
                </div>
            </div>

            {/* 2. Name & Quick Stats */}
            <div className="md:col-span-8 flex flex-col justify-center">
                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-2">
                    {prospect.full_name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-400">
                    <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white">
                        {prospect.profession || "Unknown Role"}
                    </span>
                    {prospect.region && <span>📍 {prospect.region}</span>}
                    {prospect.age && <span>🎂 {prospect.age} Years Old</span>}
                    {prospect.gender && <span>👤 {prospect.gender}</span>}
                </div>
            </div>

            {/* 3. THE MAGIC CUBE (Action Button) */}
            <div className="md:col-span-2 flex justify-end">
                <button
                    onClick={() => navigate(`/prospects/${id}/write`)}
                    className="group relative w-20 h-20 bg-[#0F0F0F] rounded-2xl border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] overflow-hidden"
                    title="Initialize AI Outreach"
                >
                    {/* The Cube Icon */}
                    <svg 
                        className="w-8 h-8 text-zinc-600 group-hover:text-blue-400 transition-colors duration-300 group-hover:rotate-12" 
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>

                    {/* Corner accents */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
            </div>
        </div>

        {/* --- DOSSIER BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* CARD 1: THE BIG TEXT (Psychographic Profile) */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                </div>
                
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    Psychographic Intelligence
                </h3>
                
                <div className="space-y-6">
                    <div>
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Interests & Drivers</p>
                        <p className="text-xl text-zinc-200 leading-relaxed font-medium">
                            {prospect.interests_hobbies ? `"${prospect.interests_hobbies}"` : "No specific interests logged."}
                        </p>
                    </div>
                    
                    {prospect.previous_post_text && (
                        <div className="pt-6 border-t border-white/5">
                            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Recent Discourse Analysis</p>
                            <div className="p-4 rounded-xl bg-black/40 border border-white/5 italic text-zinc-400">
                                "{prospect.previous_post_text}"
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* CARD 2: DIGITAL FOOTPRINT & CONTACT */}
            <div className="md:col-span-1 space-y-6">
                
                {/* Contact Box */}
                <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/10">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-4">Direct Line</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-[9px] uppercase text-zinc-600 font-bold">Email</label>
                            <div className="text-white font-mono text-sm break-all">{prospect.email || "N/A"}</div>
                        </div>
                        <div>
                            <label className="text-[9px] uppercase text-zinc-600 font-bold">Phone</label>
                            <div className="text-white font-mono text-sm">{prospect.phone || "N/A"}</div>
                        </div>
                    </div>
                </div>

                {/* Social Nodes */}
                <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/10">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-4">Digital Nodes</h3>
                    <div className="flex flex-col gap-2">
                        {prospect.linkedin_url && (
                            <a href={prospect.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-blue-600/20 hover:border-blue-500/50 border border-transparent transition-all group">
                                <span className="text-xs font-bold text-zinc-300 group-hover:text-blue-400">LinkedIn Profile</span>
                                <span className="text-zinc-500 group-hover:text-blue-400">↗</span>
                            </a>
                        )}
                        {prospect.portfolio_url && (
                            <a href={prospect.portfolio_url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-emerald-600/20 hover:border-emerald-500/50 border border-transparent transition-all group">
                                <span className="text-xs font-bold text-zinc-300 group-hover:text-emerald-400">Portfolio</span>
                                <span className="text-zinc-500 group-hover:text-emerald-400">↗</span>
                            </a>
                        )}
                         {prospect.instagram_url && (
                            <a href={prospect.instagram_url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-pink-600/20 hover:border-pink-500/50 border border-transparent transition-all group">
                                <span className="text-xs font-bold text-zinc-300 group-hover:text-pink-400">Instagram</span>
                                <span className="text-zinc-500 group-hover:text-pink-400">↗</span>
                            </a>
                        )}
                    </div>
                </div>

            </div>
            
            {/* CARD 3: META DATA (Footer) */}
            <div className="md:col-span-3 p-6 rounded-2xl border border-dashed border-white/10 flex justify-between items-center opacity-50">
                <span className="text-xs font-mono text-zinc-600">ID: {prospect.id}</span>
                <span className="text-xs font-mono text-zinc-600">Added: {new Date(prospect.created_at).toLocaleString()}</span>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ProspectDetail;