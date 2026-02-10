import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WritePage = () => {
  const navigate = useNavigate();
  
  // --- STATE MANAGEMENT ---
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  // Mock data
  const [drafts, setDrafts] = useState({
    email: { subject: "", body: "" },
    sms: "",
    whatsapp: ""
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerated(false);

    // Simulate AI API Latency
    setTimeout(() => {
      setDrafts({
        email: {
          subject: "Project Collaboration: Synergy with [Project Name]",
          body: `Hi [Name],\n\nI noticed your recent work on sustainable tech architecture—it’s impressive.\n\nOur platform connects directly with the goals you mentioned in your Q3 report. I’d love to share a brief demo on how we can accelerate that timeline.\n\nAre you free next Tuesday for 10 minutes?\n\nBest,\n[Your Name]`
        },
        sms: "Hi [Name]! Saw the LinkedIn update. We actually just solved that exact latency issue you posted about. Free for a quick call tomorrow? - [Your Name]",
        whatsapp: "Hey [Name]! 👋 Hope you're having a great week. I loved your recent post about AI efficiency. We actually just launched a beta that does exactly that. Would love to get your feedback if you have a sec! 🚀"
      });
      setIsGenerating(false);
      setGenerated(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-200 font-sans selection:bg-blue-500/30 pb-20 relative overflow-x-hidden">
      
      {/* --- BACKGROUND AMBIENCE (Matched from Dashboard) --- */}
      <div className="fixed top-[-10%] left-[20%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Sidebar Placeholder for layout consistency (Optional, keeps the 'main' centered) */}
      <div className="w-20 hidden lg:block fixed left-0 h-screen border-r border-white/5 bg-black/20 backdrop-blur-3xl z-20"></div>

      <main className="flex-1 lg:ml-20 relative z-10 h-full p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">
            
            {/* --- HEADER --- */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                <div>
                    <button 
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-3 mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                    >
                        <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-colors">←</span>
                        <span>Return to Dashboard</span>
                    </button>
                    <h1 className="text-5xl font-black tracking-tighter text-white mb-2">
                        Outreach Generator
                    </h1>
                    <div className="flex items-center gap-3 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                        <span>AI Engine V1.0</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        <span>Ready</span>
                    </div>
                </div>

                {/* Main Action Button (Matched Dashboard Style) */}
                <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="px-8 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isGenerating ? (
                        <>
                            <div className="w-4 h-4 border-2 border-zinc-400 border-t-black rounded-full animate-spin"></div>
                            <span>Synthesizing...</span>
                        </>
                    ) : (
                        <>
                            <span>Generate Drafts</span>
                            <span className="text-lg leading-none mb-0.5">✨</span>
                        </>
                    )}
                </button>
            </header>

            {/* --- OUTPUT GRID --- */}
            {generated && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
                    
                    {/* 1. EMAIL CARD */}
                    <div className="group relative bg-gradient-to-br from-white/[0.07] to-white/[0.01] border border-white/[0.08] rounded-[2.5rem] p-6 transition-all duration-500 hover:border-white/[0.2] hover:bg-white/[0.08]">
                        <div className="flex items-center gap-3 mb-8">
                             <div className="w-10 h-10 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-blue-400 shadow-lg">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Email Protocol</span>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[9px] font-black uppercase text-zinc-600 tracking-widest block mb-2">Subject Line</label>
                                <div className="text-white font-bold text-sm border-b border-white/10 pb-2">
                                    {drafts.email.subject}
                                </div>
                            </div>
                            <div>
                                <label className="text-[9px] font-black uppercase text-zinc-600 tracking-widest block mb-2">Content Body</label>
                                <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line font-medium">
                                    {drafts.email.body}
                                </p>
                            </div>
                        </div>
                        <ActionRow />
                    </div>

                    {/* 2. SMS CARD */}
                    <div className="group relative bg-gradient-to-br from-white/[0.07] to-white/[0.01] border border-white/[0.08] rounded-[2.5rem] p-6 transition-all duration-500 hover:border-white/[0.2] hover:bg-white/[0.08]">
                         <div className="flex items-center gap-3 mb-8">
                             <div className="w-10 h-10 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-purple-400 shadow-lg">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">SMS / Signal</span>
                        </div>

                        <div className="bg-black/40 rounded-3xl p-6 border border-white/5 relative">
                             {/* Tail */}
                             <div className="absolute top-6 -left-2 w-4 h-4 bg-black/40 border-l border-b border-white/5 transform rotate-45"></div>
                            <p className="text-sm text-zinc-200 leading-relaxed relative z-10">
                                {drafts.sms}
                            </p>
                        </div>
                        <ActionRow />
                    </div>

                    {/* 3. WHATSAPP CARD */}
                    <div className="group relative bg-gradient-to-br from-white/[0.07] to-white/[0.01] border border-white/[0.08] rounded-[2.5rem] p-6 transition-all duration-500 hover:border-white/[0.2] hover:bg-white/[0.08]">
                         <div className="flex items-center gap-3 mb-8">
                             <div className="w-10 h-10 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-emerald-400 shadow-lg">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">WhatsApp</span>
                        </div>

                        <div className="bg-[#005c4b]/20 border border-[#005c4b]/40 rounded-3xl rounded-tr-sm p-5 relative flex flex-col items-end">
                            <p className="text-sm text-emerald-100 leading-relaxed w-full">
                                {drafts.whatsapp}
                            </p>
                            <span className="text-[9px] font-bold text-emerald-400/60 mt-2 uppercase tracking-widest">Read 12:04</span>
                        </div>
                        <ActionRow />
                    </div>

                </div>
            )}
        </div>
      </main>
    </div>
  );
};

// Reusable Action Row 
const ActionRow = () => (
    <div className="mt-8 pt-6 border-t border-white/[0.05] flex gap-4">
        <button className="flex-1 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition-colors border border-white/5 hover:border-white/10">
            Copy Text
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors border border-white/5 hover:border-white/10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </button>
    </div>
);

export default WritePage;