import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // --- STATE ---
  const [campaign, setCampaign] = useState(null);
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  
  // --- FORM DATA (Matches SQLAlchemy Model) ---
  const [formData, setFormData] = useState({
    full_name: "",
    ethnicity: "",
    gender: "",
    age: "",
    profession: "",
    region: "",
    email: "",
    phone: "",
    linkedin_url: "",
    instagram_url: "",
    portfolio_url: "",
    interests_hobbies: "",
    previous_post_text: ""
  });

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token") || localStorage.getItem("access_token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const [campRes, prosRes] = await Promise.all([
             api.get(`/api/campaigns/${id}`, config),
             api.get(`/api/prospects/campaign/${id}`, config).catch(() => ({ data: [] }))
        ]);

        setCampaign(campRes.data);
        setProspects(prosRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
        const token = localStorage.getItem("token") || localStorage.getItem("access_token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const payload = {
            campaign_id: parseInt(id),
            full_name: formData.full_name,
            ethnicity: formData.ethnicity || null,
            gender: formData.gender || null,
            age: formData.age ? parseInt(formData.age) : null,
            profession: formData.profession || null,
            region: formData.region || null,
            email: formData.email || null,
            phone: formData.phone || null,
            linkedin_url: formData.linkedin_url || null,
            instagram_url: formData.instagram_url || null,
            portfolio_url: formData.portfolio_url || null,
            interests_hobbies: formData.interests_hobbies || null,
            previous_post_text: formData.previous_post_text || null,
        };

        const res = await api.post("/api/prospects/", payload, config);
        
        setProspects([...prospects, res.data]);
        
        setFormData({ 
            full_name: "", ethnicity: "", gender: "", age: "",
            profession: "", region: "", email: "", phone: "",
            linkedin_url: "", instagram_url: "", portfolio_url: "",
            interests_hobbies: "", previous_post_text: ""
        });
        setShowForm(false);
    } catch (err) {
        console.error("Failed to create prospect", err);
        alert("Failed to create prospect. Check console.");
    } finally {
        setFormLoading(false);
    }
  };

  if (loading) return (
    <div className="h-screen w-full bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
    </div>
  );

  if (!campaign) return null;

  // --- THEME ENGINE ---
  const theme = {
    sales: { 
        color: "text-emerald-400", bg: "bg-emerald-400", border: "border-emerald-500/20", gradient: "from-emerald-500/10", glow: "bg-emerald-500/10",
        inputFocus: "focus:border-emerald-500/50", cardHover: "hover:border-emerald-500/30 hover:bg-emerald-500/5", badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20",
    },
    hiring: { 
        color: "text-green-400", bg: "bg-green-400", border: "border-green-500/20", gradient: "from-green-500/10", glow: "bg-green-500/10",
        inputFocus: "focus:border-green-500/50", cardHover: "hover:border-green-500/30 hover:bg-green-500/5", badge: "bg-green-500/20 text-green-400 border-green-500/20",
    },
    networking: { 
        color: "text-purple-400", bg: "bg-purple-400", border: "border-purple-500/20", gradient: "from-purple-500/10", glow: "bg-purple-500/10",
        inputFocus: "focus:border-purple-500/50", cardHover: "hover:border-purple-500/30 hover:bg-purple-500/5", badge: "bg-purple-500/20 text-purple-400 border-purple-500/20",
    },
  }[campaign.type?.toLowerCase()] || { 
        color: "text-white", bg: "bg-white", border: "border-white/20", gradient: "from-white/10", glow: "bg-white/10",
        inputFocus: "focus:border-white", cardHover: "hover:border-white/30", badge: "bg-white/10 text-white"
  };

  const inputStyle = `w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white placeholder-zinc-700 focus:outline-none ${theme.inputFocus} transition-colors`;
  const labelStyle = "text-[10px] font-bold uppercase text-zinc-500 tracking-widest block mb-2";
  const sectionTitleStyle = `text-xs font-black uppercase tracking-[0.2em] ${theme.color} mb-4 flex items-center gap-2`;

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 font-sans selection:bg-white/20 pb-20 relative">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className={`fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b ${theme.gradient} to-transparent opacity-30 pointer-events-none`} />

      <div className="max-w-[1400px] mx-auto p-6 lg:p-10 relative z-10">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
            <button 
                onClick={() => navigate('/home')}
                className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors group"
            >
                <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-colors">←</span>
                <span>Back</span>
            </button>
            <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${theme.bg} shadow-[0_0_10px_currentColor] animate-pulse`}></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">System Active</span>
            </div>
        </header>

        {/* --- MAIN BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min mb-20">
            {/* Title Block */}
            <div className="md:col-span-8 flex flex-col justify-end">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${theme.border} bg-white/[0.02] w-fit mb-6`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${theme.bg}`}></span>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.color}`}>{campaign.type} Protocol</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9] mb-4">
                    {campaign.name}
                </h1>
                <p className="text-zinc-500 font-medium text-sm">ID: {campaign.id.toString().padStart(4, '0')} • Created {new Date(campaign.created_at).toLocaleDateString()}</p>
            </div>

            {/* Banner */}
            <div className="md:col-span-4 h-64 md:h-auto min-h-[250px] relative group rounded-3xl overflow-hidden border border-white/10">
                <img 
                    src={campaign.banner_url || "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80"} 
                    alt="Banner" 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            {/* Description */}
            <div className="md:col-span-7 p-8 rounded-3xl bg-white/[0.03] border border-white/10">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">Brief</h3>
                <p className="text-lg text-zinc-300 leading-relaxed font-medium whitespace-pre-wrap">
                    {campaign.description || "No description provided."}
                </p>
            </div>
             
             {/* Stats */}
             <div className="md:col-span-5 p-8 rounded-3xl border border-dashed border-white/10 flex items-center justify-center bg-white/[0.01]">
                <div className="text-center">
                    <span className="text-2xl mb-2 block opacity-50">👥</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{prospects.length} Prospects</span>
                </div>
            </div>
        </div>

        {/* --- SECTION: OUTREACH ENGINE --- */}
        <div className="border-t border-white/10 pt-12">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight mb-2">Outreach Hub</h2>
                    <p className="text-zinc-500 text-sm">Add prospects to generate AI drafts.</p>
                </div>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className={`px-6 py-3 rounded-xl border font-bold text-xs uppercase tracking-widest transition-all ${
                        showForm 
                        ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                        : `bg-white/[0.05] ${theme.color} ${theme.border} hover:bg-white/[0.1]`
                    }`}
                >
                    {showForm ? 'Cancel Entry' : '+ Add Prospect'}
                </button>
            </div>

            {/* --- DATA ENTRY FORM --- */}
            {showForm && (
                <div className={`mb-12 p-1 rounded-[2rem] bg-gradient-to-b ${theme.gradient} to-transparent`}>
                    <div className="bg-[#050505] rounded-[1.9rem] p-8 border border-white/10 relative overflow-hidden">
                        
                        <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${theme.glow} blur-[100px] rounded-full pointer-events-none`} />

                        <div className="flex items-center gap-3 mb-8">
                             <div className={`w-2 h-2 rounded-full ${theme.bg} animate-pulse`}></div>
                             <h3 className={`text-xs font-black uppercase tracking-[0.2em] ${theme.color}`}>Prospect Data Entry</h3>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                            
                            {/* --- COL 1: IDENTITY --- */}
                            <div className="space-y-6">
                                <div className={sectionTitleStyle}>
                                    <span className="text-lg">🆔</span> Identity
                                </div>
                                
                                <div>
                                    <label className={labelStyle}>Full Name *</label>
                                    <input required name="full_name" value={formData.full_name} onChange={handleInputChange} className={inputStyle} placeholder="John Doe" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelStyle}>Age</label>
                                        <input type="number" name="age" value={formData.age} onChange={handleInputChange} className={inputStyle} placeholder="34" />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>Gender</label>
                                        <input name="gender" value={formData.gender} onChange={handleInputChange} className={inputStyle} placeholder="Male/Female/Other" />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelStyle}>Ethnicity</label>
                                    <input name="ethnicity" value={formData.ethnicity} onChange={handleInputChange} className={inputStyle} placeholder="Optional" />
                                </div>
                            </div>

                            {/* --- COL 2: PROFESSIONAL & CONTACT --- */}
                            <div className="space-y-6">
                                <div className={sectionTitleStyle}>
                                    <span className="text-lg">💼</span> Professional
                                </div>

                                <div>
                                    <label className={labelStyle}>Profession / Role</label>
                                    <input name="profession" value={formData.profession} onChange={handleInputChange} className={inputStyle} placeholder="Software Engineer" />
                                </div>

                                <div>
                                    <label className={labelStyle}>Region / Location</label>
                                    <input name="region" value={formData.region} onChange={handleInputChange} className={inputStyle} placeholder="New York, USA" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelStyle}>Email</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputStyle} placeholder="@company.com" />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>Phone</label>
                                        <input name="phone" value={formData.phone} onChange={handleInputChange} className={inputStyle} placeholder="+1..." />
                                    </div>
                                </div>
                            </div>

                            {/* --- COL 3: DIGITAL FOOTPRINT --- */}
                            <div className="space-y-6">
                                <div className={sectionTitleStyle}>
                                    <span className="text-lg">🌐</span> Digital Footprint
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className={labelStyle}>LinkedIn URL</label>
                                        <input name="linkedin_url" value={formData.linkedin_url} onChange={handleInputChange} className={inputStyle} placeholder="https://linkedin.com/in/..." />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>Instagram URL</label>
                                        <input name="instagram_url" value={formData.instagram_url} onChange={handleInputChange} className={inputStyle} placeholder="@username" />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>Portfolio URL</label>
                                        <input name="portfolio_url" value={formData.portfolio_url} onChange={handleInputChange} className={inputStyle} placeholder="website.com" />
                                    </div>
                                </div>
                            </div>

                            {/* --- FULL WIDTH: CONTEXT --- */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 pt-4 border-t border-white/5">
                                <div className={sectionTitleStyle}>
                                    <span className="text-lg">🧠</span> AI Context
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelStyle}>Interests & Hobbies</label>
                                        <textarea name="interests_hobbies" rows="3" value={formData.interests_hobbies} onChange={handleInputChange} className={`${inputStyle} resize-none`} placeholder="Golf, Sci-Fi movies, Public Speaking..." />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>Previous Post Text (Context)</label>
                                        <textarea name="previous_post_text" rows="3" value={formData.previous_post_text} onChange={handleInputChange} className={`${inputStyle} resize-none`} placeholder="Paste a recent post they made..." />
                                    </div>
                                </div>
                            </div>

                            {/* --- SUBMIT BUTTON --- */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 pt-4">
                                <button 
                                    type="submit" disabled={formLoading}
                                    className={`w-full py-6 rounded-xl relative overflow-hidden group border ${theme.border} bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300`}
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 pointer-events-none" />
                                    <span className={`relative z-10 font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 ${theme.color}`}>
                                         {formLoading ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"/>
                                                Processing...
                                            </>
                                        ) : "Save Prospect Profile"}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- PROSPECTS LIST --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {prospects.length === 0 ? (
                    <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-3xl">
                        <p className="text-zinc-600 font-medium text-sm">No profiles created yet.</p>
                    </div>
                ) : (
                    prospects.map((p) => (
                        <div 
                            key={p.id} 
                            onClick={() => navigate(`/prospects/${p.id}`)} 
                            className={`p-6 rounded-2xl bg-white/[0.02] border border-white/5 ${theme.cardHover} transition-all group cursor-pointer relative overflow-hidden`}
                        >
                            <div className={`absolute inset-0 ${theme.glow} opacity-0 group-hover:opacity-100 transition-opacity blur-xl pointer-events-none`} />
                            
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center font-bold text-white">
                                        {p.full_name.charAt(0)}
                                    </div>
                                    <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider border ${theme.badge}`}>
                                        {p.profession || "Prospect"}
                                    </span>
                                </div>
                                <h4 className="font-bold text-white text-lg mb-1">{p.full_name}</h4>
                                <div className="flex flex-wrap gap-2 text-[10px] text-zinc-500 mb-4 font-mono">
                                    {p.age && <span>{p.age} yrs</span>}
                                    {p.gender && <span>• {p.gender}</span>}
                                    {p.region && <span>• {p.region}</span>}
                                </div>
                                
                                <div className="space-y-2 border-t border-white/5 pt-3">
                                    {p.email && <p className="text-xs text-zinc-400">📧 {p.email}</p>}
                                    {p.linkedin_url && <p className="text-xs text-blue-400/70 truncate">🔗 LinkedIn</p>}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;