import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

// --- REUSABLE COMPONENTS ---
const Sidebar = ({ currentPath }) => {
  const navigate = useNavigate();
  
  return (
    <aside className="w-20 lg:w-64 border-r border-white/5 bg-black/20 backdrop-blur-3xl h-screen flex flex-col items-center lg:items-start p-6 z-20 fixed left-0 top-0">
      <div className="h-10 w-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-xl shadow-lg mb-12">
        O
      </div>
      <nav className="flex-1 space-y-6 w-full">
        {/* Fixed: Made Dashboard Clickable */}
        <div 
          onClick={() => navigate('/')}
          className={`cursor-pointer transition-all text-xs font-bold uppercase tracking-widest text-center lg:text-left ${currentPath === '/' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
        >
          Dashboard
        </div>
        
        <div className="text-white bg-white/10 p-3 rounded-xl cursor-pointer transition-all text-xs font-bold uppercase tracking-widest text-center lg:text-left">
          Launch New
        </div>
      </nav>
    </aside>
  );
};

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // State for all form data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    banner_url: "",
    type: "sales", 
    product_name: "",
    product_price: "",
    product_desc: "",
    landing_url: "",
    role_title: "",
    experience_years: "",
    location: "",
    skills_required: "",
    purpose: "",
    target_industry: "",
    intro_context: "",
    relationship_goal: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Construct Payload
    let payload = {
      name: formData.name,
      description: formData.description,
      type: formData.type,
      banner_url: formData.banner_url || "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=1000&auto=format&fit=crop",
    };

    // 2. Attach specific fields
    if (formData.type === "sales") {
      payload = { 
        ...payload, 
        product_name: formData.product_name, 
        product_price: Number(formData.product_price), 
        landing_url: formData.landing_url 
      };
    } else if (formData.type === "hiring") {
      payload = { 
        ...payload, 
        role_title: formData.role_title, 
        experience_years: Number(formData.experience_years), 
        location: formData.location, 
        skills_required: formData.skills_required 
      };
    } else if (formData.type === "networking") {
      payload = { 
        ...payload, 
        purpose: formData.purpose, 
        target_industry: formData.target_industry,
        intro_context: formData.intro_context
      };
    }

    try {
      // FIX: Explicitly get token to prevent 401 redirects
      const token = localStorage.getItem("token") || localStorage.getItem("access_token"); 
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      // Send request with config
      await api.post("/api/campaigns/", payload, config);
      
      // Success! Navigate to Home/Dashboard
      // Note: If "/" is your login page, change this to "/dashboard"
      navigate("/home"); 

    } catch (err) {
      console.error("Error creating campaign:", err);
      // If error is 401, the user session is actually expired
      if(err.response && err.response.status === 401) {
          alert("Session expired. Please login again.");
          navigate("/login");
      } else {
          alert("Failed to create campaign. Please check inputs.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020202] text-zinc-200 font-sans selection:bg-blue-500/30">
      <Sidebar currentPath="/create" />

      <main className="flex-1 ml-20 lg:ml-64 p-8 lg:p-12 relative">
        {/* Background Ambience */}
        <div className="fixed top-[-10%] left-[20%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-16 relative z-10">
          
          {/* --- LEFT COLUMN: THE FORM --- */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-black tracking-tighter text-white mb-2">Create Campaign</h1>
              <p className="text-zinc-500 text-sm font-medium">Define your outreach strategy and target audience.</p>
            </div>

            <form id="campaignForm" onSubmit={handleSubmit} className="space-y-8">
              
              {/* SECTION 1: BASE INFO */}
              <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">1. Base Configuration</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-2">Campaign Name</label>
                    <input name="name" required value={formData.name} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700" placeholder="e.g. Q3 Enterprise Sales" />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-2">Banner Image URL</label>
                    <input name="banner_url" value={formData.banner_url} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700" placeholder="https://..." />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-2">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500/50 transition-all h-24 resize-none placeholder:text-zinc-700" placeholder="Brief summary of this campaign..." />
                  </div>
                </div>
              </div>

              {/* SECTION 2: TYPE SELECTION */}
              <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">2. Campaign Strategy</h3>
                 <div className="grid grid-cols-3 gap-3">
                   {['sales', 'hiring', 'networking'].map(type => (
                     <button
                       key={type}
                       type="button"
                       onClick={() => setFormData({...formData, type})}
                       className={`py-4 rounded-2xl border text-xs font-bold uppercase tracking-widest transition-all ${formData.type === type ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-transparent text-zinc-500 border-white/10 hover:border-white/30'}`}
                     >
                       {type}
                     </button>
                   ))}
                 </div>
              </div>

              {/* SECTION 3: DYNAMIC FIELDS */}
              <div className="p-6 rounded-[2rem] bg-gradient-to-b from-blue-500/5 to-purple-500/5 border border-white/10 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">3. {formData.type} Details</h3>
                
                {formData.type === 'sales' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                       <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-2">Product Name</label>
                       <input name="product_name" required value={formData.product_name} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500/50" />
                    </div>
                    <div>
                       <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-2">Price (₹)</label>
                       <input name="product_price" type="number" required value={formData.product_price} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500/50" />
                    </div>
                    <div>
                       <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-2">Landing Page</label>
                       <input name="landing_url" required value={formData.landing_url} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500/50" />
                    </div>
                  </div>
                )}

                {formData.type === 'hiring' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                       <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-2">Role Title</label>
                       <input name="role_title" required value={formData.role_title} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500/50" />
                    </div>
                    <div>
                       <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-2">Min Experience (Yrs)</label>
                       <input name="experience_years" type="number" required value={formData.experience_years} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500/50" />
                    </div>
                    <div>
                       <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-2">Location</label>
                       <input name="location" required value={formData.location} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500/50" />
                    </div>
                    <div className="col-span-2">
                       <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-2">Required Skills</label>
                       <input name="skills_required" required value={formData.skills_required} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500/50" placeholder="e.g. React, Python, AWS" />
                    </div>
                  </div>
                )}

                {formData.type === 'networking' && (
                  <div className="space-y-4">
                    <div>
                       <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-2">Primary Purpose</label>
                       <input name="purpose" required value={formData.purpose} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500/50" />
                    </div>
                    <div>
                       <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-2">Target Industry</label>
                       <input name="target_industry" required value={formData.target_industry} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500/50" />
                    </div>
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => navigate('/')} className="px-8 py-4 rounded-full border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all">Cancel</button>
                  <button type="submit" disabled={loading} className="flex-1 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                      {loading ? "Creating..." : "Initialize Campaign"}
                  </button>
              </div>
            </form>
          </div>

          {/* --- RIGHT COLUMN: LIVE PREVIEW --- */}
          <div className="hidden xl:block relative">
            <div className="sticky top-12">
               <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-8 text-center">Live Preview</h3>
               
               <div className="w-[400px] mx-auto group relative bg-gradient-to-br from-white/[0.07] to-white/[0.01] border border-white/[0.08] rounded-[2.5rem] p-6 shadow-2xl backdrop-blur-xl">
                 {/* Image Area */}
                 <div className="h-56 overflow-hidden rounded-[2rem] relative shadow-lg mb-6 bg-black">
                     <img 
                       src={formData.banner_url || "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=1000&auto=format&fit=crop"} 
                       className="w-full h-full object-cover opacity-80"
                       alt="Preview"
                     />
                     <div className="absolute top-4 right-4">
                       <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 bg-black/30 text-white">
                           {formData.type}
                       </span>
                     </div>
                 </div>

                 {/* Content Area */}
                 <div className="px-2">
                     <h2 className="text-3xl font-bold text-white mb-2 tracking-tight break-words leading-tight">
                       {formData.name || "Campaign Name"}
                     </h2>
                     <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 mb-6">
                       {formData.description || "Your campaign description will appear here..."}
                     </p>

                     {/* Dynamic Stats Preview */}
                     <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                        {formData.type === 'sales' && (
                           <>
                               <div><p className="text-[9px] uppercase text-zinc-600 font-bold tracking-widest">Product</p><p className="text-white font-bold text-sm truncate">{formData.product_name || "-"}</p></div>
                               <div className="text-right"><p className="text-[9px] uppercase text-zinc-600 font-bold tracking-widest">Price</p><p className="text-emerald-400 font-bold text-sm">{formData.product_price ? `$${formData.product_price}` : "-"}</p></div>
                           </>
                        )}
                        {formData.type === 'hiring' && (
                           <>
                               <div><p className="text-[9px] uppercase text-zinc-600 font-bold tracking-widest">Role</p><p className="text-white font-bold text-sm truncate">{formData.role_title || "-"}</p></div>
                               <div className="text-right"><p className="text-[9px] uppercase text-zinc-600 font-bold tracking-widest">Experience</p><p className="text-blue-400 font-bold text-sm">{formData.experience_years ? `${formData.experience_years} Yrs` : "-"}</p></div>
                           </>
                        )}
                        {formData.type === 'networking' && (
                           <div className="col-span-2"><p className="text-[9px] uppercase text-zinc-600 font-bold tracking-widest">Target Industry</p><p className="text-white font-bold text-sm">{formData.target_industry || "-"}</p></div>
                        )}
                     </div>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CreateCampaign;