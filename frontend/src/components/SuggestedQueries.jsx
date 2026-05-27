import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { HelpCircle, Terminal } from 'lucide-react';

const ROLE_SUGGESTIONS = {
  admin: [
    "Which routers are down?",
    "Show recent config changes",
    "Show devices CPU above 80%",
    "Show interfaces with packet loss above 5%",
    "Show critical alerts"
  ],
  network_engineer: [
    "Show recent config changes",
    "Show interfaces with packet loss above 5%",
    "List all switches in Dallas",
    "Show devices CPU above 80%"
  ],
  security_team: [
    "Show critical alerts",
    "Which routers are down?",
    "List all switches in Dallas"
  ],
  network_operator: [
    "Show critical alerts",
    "Which routers are down?",
    "Show devices CPU above 80%",
    "List all switches in Dallas"
  ]
};

export const SuggestedQueries = ({ onSelect }) => {
  const { user } = useAuth();

  if (!user) return null;

  const userRole = (user.role || 'network_operator').toLowerCase();
  const suggestions = ROLE_SUGGESTIONS[userRole] || ROLE_SUGGESTIONS['network_operator'];

  return (
    <div className="flex flex-col items-center mt-2 max-w-xl w-full">
      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase tracking-wider font-semibold font-mono mb-3">
        <HelpCircle className="w-3.5 h-3.5 text-slate-600" /> Whitelisted Operator Inquiries for **{userRole.toUpperCase()}**:
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map((query, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelect(query)}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 hover:bg-slate-850 hover:text-slate-200 text-slate-400 rounded-xl px-3.5 py-1.5 text-xs transition-all duration-200 cursor-pointer shadow-md select-none flex items-center font-mono active:scale-95"
          >
            {query}
          </button>
        ))}
      </div>
    </div>
  );
};
