import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User as UserIcon, ShieldAlert, ArrowRight, Wrench } from 'lucide-react';
import { ComponentItem, Project, User } from '../../types';
import { AdvisorMessage, generateAdvisorResponse } from '../../services/aiAdvisor';

interface AiAdvisorViewProps {
  currentUser: User;
  userInventory: ComponentItem[];
  allProjects: Project[];
  marketplaceComponents: ComponentItem[];
  onOpenProject: (projectId: string) => void;
}

export const AiAdvisorView: React.FC<AiAdvisorViewProps> = ({
  currentUser,
  userInventory,
  allProjects,
  marketplaceComponents,
  onOpenProject
}) => {
  const [messages, setMessages] = useState<AdvisorMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      content: `Hello ${currentUser.name}! I am your **RELife AI Hardware Advisor**. I have synchronized with your personal inventory (**${userInventory.length} verified components on hand**).\n\nAsk me what projects you can assemble immediately, how to substitute missing parts, or how to safely perform circuit wiring!`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: AdvisorMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAdvisorResponse(
        text,
        currentUser,
        userInventory,
        allProjects,
        marketplaceComponents
      );
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 700);
  };

  const samplePrompts = [
    'What can I build right now with what I have?',
    'What is missing from my inventory to build an obstacle rover?',
    'How do I safely wire an ESP32 with an OLED display?',
    'Can I repair a broken Arduino Uno with a bad bootloader?'
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-900">RELife AI Project Advisor</h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Grounded exclusively in your physical inventory of {userInventory.length} components. No hallucinated parts.
            </p>
          </div>
        </div>

        {/* Quick prompt chips */}
        <div className="mt-4 pt-4 border-t border-stone-100">
          <div className="text-[11px] font-semibold text-stone-500 mb-2">Try asking:</div>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-xs text-stone-700 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-900 px-3 py-1.5 rounded-md border border-stone-200 cursor-pointer transition-colors text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs flex flex-col h-[520px] overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-stone-900 text-white'
                    : 'bg-emerald-800 text-white'
                }`}
              >
                {msg.sender === 'user' ? (
                  <UserIcon className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4 text-emerald-300" />
                )}
              </div>

              <div
                className={`max-w-xl rounded-xl p-4 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-50 text-stone-800 border border-stone-200/80'
                }`}
              >
                {/* Safety Alert if triggered */}
                {msg.safetyAlert && (
                  <div className="mb-2 p-2 bg-amber-100/80 border border-amber-300 rounded text-amber-900 font-semibold flex items-center gap-1.5 text-[11px]">
                    <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{msg.safetyAlert}</span>
                  </div>
                )}

                <div className="whitespace-pre-line space-y-2">
                  {msg.content}
                </div>

                {/* Suggested Project Cards */}
                {msg.suggestedProjects && msg.suggestedProjects.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-stone-200/60 space-y-2">
                    <div className="font-semibold text-stone-900 text-[11px]">
                      Recommended Builds from Catalog:
                    </div>
                    {msg.suggestedProjects.map(sp => (
                      <div
                        key={sp.projectId}
                        onClick={() => onOpenProject(sp.projectId)}
                        className="p-2.5 bg-white hover:bg-emerald-50/60 rounded border border-stone-200 hover:border-emerald-700/50 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-bold text-stone-900">{sp.title}</div>
                          <div className="text-[11px] text-stone-500">
                            {sp.feasibilityScore}% Feasible · {sp.missingCount === 0 ? 'Ready Now' : `Missing ${sp.missingCount} parts (+₹${sp.additionalCost})`}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-emerald-800 shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                )}

                <div className={`text-[10px] mt-2 ${msg.sender === 'user' ? 'text-stone-400 text-right' : 'text-stone-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-stone-400 text-xs italic p-2">
              <Bot className="w-4 h-4 text-emerald-800" />
              <span>RELife AI is evaluating inventory...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-stone-200 bg-stone-50">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about project feasibility, pin wiring, or missing components..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-hidden"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 disabled:opacity-40 rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
