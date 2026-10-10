import React, { useState } from 'react';
import { MessageSquare, Copy, ExternalLink, Check, Info, X } from 'lucide-react';
import toast from 'react-hot-toast';

const WhatsAppDraftModal = ({ isOpen, onClose, draftData }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !draftData) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(draftData.rawText);
    setCopied(true);
    toast.success('WhatsApp message details copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleOpenWhatsApp = () => {
    window.open(draftData.clickToChatUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-card bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">WhatsApp Booking Confirmation</h3>
            <p className="text-xs text-slate-400">Prefilled Click-to-Chat Message Draft</p>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="mb-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-amber-300">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block mb-0.5">Important WhatsApp Integration Note:</span>
            Clicking "Open WhatsApp Draft" will launch WhatsApp with this message prefilled. You need to press <b>Send</b> inside WhatsApp to deliver it.
          </div>
        </div>

        {/* Message Preview Box */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            Prefilled Message Preview
          </label>
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto select-all">
            {draftData.rawText}
          </div>
        </div>

        {/* Recipient Phone Info */}
        {draftData.recipientPhone && (
          <div className="mb-5 text-xs text-slate-400 flex items-center justify-between bg-slate-800/50 px-4 py-2.5 rounded-xl border border-slate-700/50">
            <span>Recipient Number:</span>
            <span className="font-mono text-emerald-400 font-semibold">+{draftData.recipientPhone}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-xl transition-all border border-slate-700 text-sm"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>

          <button
            onClick={handleOpenWhatsApp}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-4 rounded-xl transition-all shadow-lg shadow-emerald-600/25 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Open WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppDraftModal;
