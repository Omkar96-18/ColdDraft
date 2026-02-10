import React, { useState } from 'react';
import api from '../../api'; // Assuming api.js is in frontend/src/api.js

const MessageGenerator = () => {
  const [prospectName, setProspectName] = useState('');
  const [generatedMessages, setGeneratedMessages] = useState({
    email: '',
    sms: '',
    whatsapp: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateMessages = async () => {
    setError('');
    setLoading(true);
    setGeneratedMessages({ email: '', sms: '', whatsapp: '' }); // Clear previous messages

    try {
      // Get token from local storage
      const token = localStorage.getItem("token") || localStorage.getItem("access_token");
      if (!token) {
        setError("Authentication token not found. Please log in.");
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await api.post(
        '/api/llm/generate',
        { prospect_name: prospectName },
        config
      );
      setGeneratedMessages(response.data);
    } catch (err) {
      console.error('Message generation failed:', err);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.status === 404) {
          setError(`Prospect '${prospectName}' not found. Please check the name.`);
        } else {
          setError(`Error: ${err.response.data.detail || err.message}`);
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please ensure the backend is running.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

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
              value={prospectName}
              onChange={(e) => setProspectName(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/20 text-red-400 text-sm font-bold">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerateMessages}
            className="px-8 py-4 rounded-full bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            disabled={loading || !prospectName.trim()}
          >
            {loading ? 'Generating...' : 'Generate Messages'}
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
              value={generatedMessages.email}
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
              value={generatedMessages.sms}
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
              value={generatedMessages.whatsapp}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageGenerator;
