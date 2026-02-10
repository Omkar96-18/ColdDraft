import React from 'react';

const MessageGenerator = () => {
  return (
    <div className="flex-1 p-8 lg:p-12">
      <h1 className="text-5xl font-black tracking-tighter text-white mb-2">
        AI Message Generator
      </h1>
      <p className="text-zinc-400">Generate hyper-personalized messages for your prospects.</p>

      <div className="max-w-4xl mx-auto mt-8">
        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.07] to-white/[0.01] border border-white/[0.08] shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Generate Messages</h2>
          
          <div className="mb-6">
            <label htmlFor="prospectName" className="block text-zinc-400 text-sm font-bold mb-2">
              Prospect Name (e.g., "amd ryzen", "anuj", "Sahil Dinkar Katurde")
            </label>
            <input
              type="text"
              id="prospectName"
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              placeholder="Enter prospect name"
            />
          </div>

          <button
            className="px-8 py-4 rounded-full bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)]"
          >
            Generate Messages
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Email Card */}
          <div className="col-span-full lg:col-span-1 p-6 rounded-[2rem] bg-gradient-to-br from-white/[0.07] to-white/[0.01] border border-white/[0.08] shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Email</h3>
            <textarea
              readOnly
              rows="10"
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-zinc-200 resize-none focus:outline-none"
              placeholder="Generated email will appear here..."
            ></textarea>
          </div>

          {/* SMS Card */}
          <div className="col-span-full lg:col-span-1 p-6 rounded-[2rem] bg-gradient-to-br from-white/[0.07] to-white/[0.01] border border-white/[0.08] shadow-lg">
            <h3 className="2xl font-bold text-white mb-4">SMS</h3>
            <textarea
              readOnly
              rows="10"
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-zinc-200 resize-none focus:outline-none"
              placeholder="Generated SMS will appear here..."
            ></textarea>
          </div>

          {/* WhatsApp Card */}
          <div className="col-span-full lg:col-span-1 p-6 rounded-[2rem] bg-gradient-to-br from-white/[0.07] to-white/[0.01] border border-white/[0.08] shadow-lg">
            <h3 className="2xl font-bold text-white mb-4">WhatsApp</h3>
            <textarea
              readOnly
              rows="10"
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-zinc-200 resize-none focus:outline-none"
              placeholder="Generated WhatsApp message will appear here..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageGenerator;
