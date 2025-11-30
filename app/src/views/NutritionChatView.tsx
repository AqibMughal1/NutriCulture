"use client";

import { useChat } from "ai/react";
import { useBMI } from "@/contexts/bmi-context";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, RefreshCw, Copy, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { generateUUID } from "@/lib/utils";
import { MDRenderer } from "@/components/MDRenderer";
import { formatDistanceToNow } from "date-fns";

/**
 * Nutrition Chat View - Enhanced UI
 * 
 * Allows users to chat with AI about nutrition, meal plans, recipes, and health goals.
 * Can help recreate meal plans, answer nutrition questions, and provide dietary advice.
 */
export default function NutritionChatView() {
  const { bmiData } = useBMI();
  const [chatId] = useState(() => generateUUID());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, reload } = useChat({
    api: "/api/nutrition-chat",
    id: chatId,
    body: {
      id: chatId,
      bmiData: {
        bmi: bmiData.bmi,
        category: bmiData.category,
        goal: bmiData.goal,
      },
    },
    onError: (error) => {
      console.error("Chat error:", error);
      toast.error("Failed to send message. Please try again.");
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter a message");
      return;
    }
    handleSubmit(e);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (inputRef.current) {
      inputRef.current.value = suggestion;
      handleInputChange({ target: { value: suggestion } } as any);
      inputRef.current.focus();
    }
  };

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const getMessageContent = (message: any) => {
    if (typeof message.content === "string") {
      return message.content;
    }
    if (message.parts) {
      return message.parts
        ?.map((part: any) => (part.type === "text" ? part.text : ""))
        .join("") || "";
    }
    return "";
  };

  const suggestions = [
    "I don't like my recommended meal plan, can you help me create a new one?",
    "What are good protein sources for vegetarians?",
    "How can I modify this recipe to be healthier?",
    "What should I eat to lose weight?",
    "Can you suggest healthy snacks?",
  ];

  return (
    <div className="container mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8 pt-20 md:pt-24">
      <div className="max-w-5xl mx-auto">
        <Card className="h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] flex flex-col shadow-2xl border-2">
          {/* Enhanced Header */}
          <CardHeader className="border-b bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                    Nutrition Chat Assistant
                    <Sparkles className="h-4 w-4 text-green-600 animate-pulse" />
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Ask me anything about nutrition, meal plans, or recipes
                  </CardDescription>
                </div>
              </div>
              {bmiData.goal && (
                <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-semibold shadow-lg">
                  Goal: {bmiData.goal === "lose" ? "Lose Weight" : bmiData.goal === "gain" ? "Gain Weight" : "Maintain Weight"}
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            {/* Messages Area with ScrollArea */}
            <ScrollArea className="flex-1">
              <div className="p-4 md:p-6 space-y-6 min-h-full">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-6 animate-in fade-in duration-500">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 flex items-center justify-center">
                        <Bot className="h-12 w-12 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <div className="max-w-lg space-y-4">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        Start a conversation
                      </h3>
                      <p className="text-muted-foreground text-lg">
                        I'm here to help with nutrition questions, meal planning, recipe suggestions, and more.
                      </p>
                      <div className="mt-6 space-y-3">
                        <p className="text-sm font-semibold text-muted-foreground mb-3">Try asking:</p>
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 hover:shadow-lg transition-all duration-300 text-left group hover:scale-[1.02]"
                          >
                            <p className="text-sm text-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                              "{suggestion}"
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {messages.map((message, index) => {
                  const content = getMessageContent(message);
                  const isUser = message.role === "user";
                  const isLastMessage = index === messages.length - 1;
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isUser && (
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-20"></div>
                            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                              <Bot className="h-5 w-5 text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className={`flex flex-col gap-2 max-w-[85%] md:max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
                        <div
                          className={`group relative rounded-2xl px-5 py-4 shadow-lg transition-all duration-300 ${
                            isUser
                              ? "bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-br-sm"
                              : "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 text-foreground rounded-bl-sm border border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          {!isUser && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0 bg-background shadow-md"
                              onClick={() => copyToClipboard(content, message.id)}
                              title="Copy message"
                            >
                              {copiedMessageId === message.id ? (
                                <Check className="h-3 w-3 text-green-600" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          )}
                          
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            {isUser ? (
                              <p className="whitespace-pre-wrap break-words text-white m-0">{content}</p>
                            ) : (
                              <MDRenderer content={content} />
                            )}
                          </div>
                        </div>
                        
                        {message.createdAt && (
                          <span className="text-xs text-muted-foreground px-2">
                            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                          </span>
                        )}
                      </div>
                      
                      {isUser && (
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex gap-4 justify-start animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-20 animate-pulse"></div>
                        <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl rounded-bl-sm px-5 py-4 shadow-lg border border-slate-200 dark:border-slate-700">
                      <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                        <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Enhanced Input Area */}
            <div className="border-t bg-gradient-to-r from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50 p-4 md:p-6">
              <form onSubmit={handleFormSubmit} className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about nutrition, meal plans, recipes..."
                    disabled={isLoading}
                    className="pr-12 h-12 text-base border-2 focus:border-green-500 focus:ring-green-500 rounded-xl shadow-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleFormSubmit(e as any);
                      }
                    }}
                  />
                  {input.trim() && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <kbd className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted rounded border">
                        Enter
                      </kbd>
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="h-12 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </Button>
                {messages.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => reload()}
                    disabled={isLoading}
                    title="Regenerate last response"
                    className="h-12 px-4 border-2 rounded-xl"
                  >
                    <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                  </Button>
                )}
              </form>
              <p className="text-xs text-muted-foreground mt-3 text-center flex items-center justify-center gap-2">
                <Bot className="h-3 w-3" />
                I can only answer questions about nutrition, diet, and health-related topics.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
