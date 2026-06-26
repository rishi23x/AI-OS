import { useEffect, useState } from "react";

export default function Dashboard() {
  const [agents, setAgents] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/agents")
      .then((res) => res.json())
      .then(setAgents)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen p-10 bg-black text-white">
      <h1 className="text-4xl font-bold">
        AI-OS Dashboard
      </h1>

      <p className="mt-2 text-gray-400">
        Your AI Agents
