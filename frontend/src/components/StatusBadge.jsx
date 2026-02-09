import React from "react";

const StatusBadge = ({ status }) => {
  const styles = {
    Live: "bg-emerald-500/20 text-emerald-400 border-emerald-400/30",
    Running: "bg-blue-500/20 text-blue-400 border-blue-400/30",
    Scheduled: "bg-amber-500/20 text-amber-400 border-amber-400/30",
    Draft: "bg-white/5 text-zinc-400 border-white/10",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md border ${styles[status]}`}>
      <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 bg-current animate-pulse" />
      {status}
    </span>
  );
};

const CampaignCard = ({ campaign }) => {
  const { title, desc, img, status, stats } = campaign;

  return (
    <div className="group relative bg-gradient-to-br from-white/[0.07] to-white/[0.01] border border-white/[0.08] rounded-[2.5rem] p-3 transition-all duration-700 hover:border-white/[0.2] hover:bg-white/[0.08] hover:translate-y-[-8px] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
      {/* Image Section */}
      <div className="h-60 overflow-hidden rounded-[2rem] relative shadow-2xl">
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-60" />
        <div className="absolute top-5 right-5 scale-90 group-hover:scale-100 transition-transform duration-500">
          <StatusBadge status={status} />
        </div>
      </div>

      {/* Info Section */}
      <div className="px-5 py-8">
        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors duration-300">{title}</h3>
        <p className="text-sm text-zinc-500 leading-relaxed font-medium line-clamp-2">{desc}</p>

        <div className="mt-8 pt-8 border-t border-white/[0.05] flex justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Reach</p>
            <p className="text-white text-xl font-bold">{stats.sent.toLocaleString()}</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Engagement</p>
            <p className="text-emerald-400 text-xl font-bold">{stats.openRate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;