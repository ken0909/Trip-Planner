import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plane, Send, Bot, User } from 'lucide-react';

export default function TravelLLMInterface(){
  const [messages,setMessages]=useState([{role:'assistant',content:'Hi! Tell me your budget, travel dates, weather preference, and interests. I will help plan your trip.'}]);
  const [input,setInput]=useState('');
  const [loading,setLoading]=useState(false);

  const sendMessage=async()=>{
    if(!input.trim()) return;
    const next=[...messages,{role:'user',content:input}];
    setMessages(next);
    const prompt=input;
    setInput('');
    setLoading(true);
    setTimeout(()=>{
      const reply=`Based on your request: "${prompt}", I recommend exploring warm destinations with strong value, outdoor activities, and balanced costs. Connect this UI to your FastAPI / LangChain endpoint for live responses.`;
      setMessages([...next,{role:'assistant',content:reply}]);
      setLoading(false);
    },900);
  };

  return (
    <div className='min-h-screen bg-slate-950 text-white p-6'>
      <div className='max-w-4xl mx-auto space-y-6'>
        <div className='flex items-center gap-3'>
          <Plane className='w-8 h-8'/>
          <div>
            <h1 className='text-3xl font-bold'>Smart Travel Planner</h1>
            <p className='text-slate-400'>LLM Interface & Launcher</p>
          </div>
        </div>

        <Card className='bg-slate-900 border-slate-800'>
          <CardContent className='p-4 space-y-4'>
            <div className='grid md:grid-cols-4 gap-3'>
              <Input placeholder='Budget e.g. $1500' className='bg-slate-800 border-slate-700'/>
              <Input placeholder='Month / Dates' className='bg-slate-800 border-slate-700'/>
              <Input placeholder='Preferred Weather' className='bg-slate-800 border-slate-700'/>
              <Input placeholder='Interests: hiking, beach...' className='bg-slate-800 border-slate-700'/>
            </div>
            <p className='text-sm text-slate-400'>Use quick fields above or chat below.</p>
          </CardContent>
        </Card>

        <Card className='bg-slate-900 border-slate-800'>
          <CardContent className='p-4 h-[460px] overflow-y-auto space-y-4'>
            {messages.map((m,i)=>(
              <div key={i} className={`flex gap-3 ${m.role==='user'?'justify-end':''}`}>
                {m.role==='assistant' && <Bot className='w-5 h-5 mt-1 text-cyan-400'/>}
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${m.role==='user'?'bg-cyan-500 text-black':'bg-slate-800'}`}>
                  {m.content}
                </div>
                {m.role==='user' && <User className='w-5 h-5 mt-1'/>}
              </div>
            ))}
            {loading && <div className='text-slate-400 text-sm'>Thinking...</div>}
          </CardContent>
        </Card>

        <div className='flex gap-3'>
          <Textarea value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Ask where you should travel...' className='bg-slate-900 border-slate-800 min-h-[90px]' />
          <Button onClick={sendMessage} className='h-auto px-6'>
            <Send className='w-4 h-4 mr-2'/> Send
          </Button>
        </div>
      </div>
    </div>
  );
}
