import { useState } from 'react'
import './App.css'

export default function App(){
  const [msg,setMsg]=useState('')
  const [reply,setReply]=useState('')
  const [loading,setLoading]=useState(false)

  const send = async ()=>{
    setLoading(true)
    const res = await fetch('http://localhost:8000/chat',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body: JSON.stringify({message:msg})
    })
    const data = await res.json()
    setReply(data.reply)
    setLoading(false)
  }

  return (
    <div className='wrap'>
      <h1>Smart Travel Planner</h1>
      <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder='Ask about your trip...' />
      <button onClick={send}>{loading ? 'Thinking...' : 'Plan My Trip'}</button>
      <pre>{reply}</pre>
    </div>
  )
}