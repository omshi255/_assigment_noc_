import React from 'react';
import { Header } from './Header';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { EmptyState } from './EmptyState';
import { useChat } from '../hooks/useChat';
import { Trash2 } from 'lucide-react';

export const ChatContainer = () => {
  const { messages, isLoading, sendMessage, clearMessages, lastQueryMs } = useChat();

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 relative overflow-hidden select-none">
      {/* Background Matrix Grid Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#022c22_1px,transparent_1px),linear-gradient(to_bottom,#022c22_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.07] pointer-events-none"></div>

      {/* Main Header */}
      <Header lastQueryMs={lastQueryMs} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {messages.length > 0 && (
          /* Clear Terminal floating button */
          <button
            type="button"
            onClick={clearMessages}
            title="Clear Console Screen"
            className="absolute top-4 right-6 p-2 bg-slate-900/90 border border-slate-800 text-slate-500 hover:text-red-400 hover:border-slate-700 rounded-xl transition-all cursor-pointer shadow-lg z-20 hover:scale-105 active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}

        {messages.length === 0 && !isLoading ? (
          /* Empty Dashboard welcome state */
          <div className="flex-1 overflow-y-auto flex items-center justify-center">
            <EmptyState onSelectQuery={sendMessage} />
          </div>
        ) : (
          /* Standard list of messages */
          <MessageList messages={messages} isLoading={isLoading} />
        )}
      </div>

      {/* Terminal Input Box */}
      <ChatInput sendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};
