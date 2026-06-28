import { useEffect, useState } from "react";
import { LayoutDashboard, Activity, Layers, Grid, Bell, User, Settings } from "lucide-react";

export default function Dashboard() {

  const [agents, setAgents] = useState<any[]>([]);

  const [name,setName] = useState("");
  const [role,setRole] = useState("");
  const [systemPrompt,setSystemPrompt] = useState("");

  async function loadAgents(){
    const res = await fetch("/api/agents");
    const data = await res.json();
    setAgents(data);
  }

  useEffect(()=>{
    loadAgents();
  },[]);


  async function createAgent(){

    await fetch("/api/agents",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        role,
        systemPrompt
      })
    });


    setName("");
    setRole("");
    setSystemPrompt("");

    loadAgents();

  }



return (

<div className="min-h-screen bg-black text-white flex">


{/* SIDEBAR */}

<div className="w-64 border-r border-white/10 p-6 hidden md:block">


<h2 className="text-xl font-bold mb-10 text-cyan-400">
AI-OS
</h2>


<div className="space-y-4 text-white/60">

<div className="flex gap-3">
<LayoutDashboard/>
Overview
</div>


<div className="flex gap-3">
<Activity/>
Analytics
</div>


<div className="flex gap-3">
<Layers/>
Agents
</div>


<div className="flex gap-3">
<Grid/>
Data
</div>


<div className="flex gap-3">
<Bell/>
Alerts
</div>


</div>


</div>





{/* MAIN */}

<div className="flex-1 p-8">


<h1 className="text-4xl font-bold">
Command Center
</h1>


<p className="text-white/50 mt-2">
AI business operations dashboard
</p>





{/* KPI */}

<div className="grid md:grid-cols-4 gap-4 mt-8">


{[
["Agents",agents.length],
["Status","Online"],
["Efficiency","98%"],
["Risk","Low"]

].map((x)=>(


<div className="border border-white/10 bg-white/5 rounded-xl p-5">

<p className="text-white/50 text-sm">
{x[0]}
</p>

<h2 className="text-3xl font-bold mt-2">
{x[1]}
</h2>


</div>


))}



</div>







{/* CREATE AGENT */}


<div className="mt-10 border border-white/10 bg-white/5 rounded-xl p-6">


<h2 className="text-xl font-bold mb-5">
Create AI Agent
</h2>


<input
className="w-full bg-black border border-white/10 p-3 rounded mb-3"
placeholder="Agent Name"
value={name}
onChange={e=>setName(e.target.value)}
/>



<input
className="w-full bg-black border border-white/10 p-3 rounded mb-3"
placeholder="Agent Role"
value={role}
onChange={e=>setRole(e.target.value)}
/>



<textarea
className="w-full bg-black border border-white/10 p-3 rounded mb-3"
placeholder="System Instructions"
value={systemPrompt}
onChange={e=>setSystemPrompt(e.target.value)}
/>



<button
onClick={createAgent}
className="px-6 py-3 bg-cyan-400 text-black rounded"
>
Create Agent
</button>


</div>







{/* AGENTS */}


<div className="mt-10">


<h2 className="text-2xl font-bold">
Your AI Agents
</h2>



<div className="grid md:grid-cols-3 gap-5 mt-5">


{
agents.map(agent=>(


<div className="border border-white/10 bg-white/5 rounded-xl p-5">


<h3 className="text-xl font-bold">
{agent.name}
</h3>


<p className="text-white/50">
{agent.role}
</p>


<p className="mt-3 text-sm">
{agent.systemPrompt}
</p>


</div>


))
}



</div>


</div>



</div>


</div>


)

}
