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
      </p>

      <div className="mt-8 grid gap-4">
        {agents.length === 0 ? (
          <p className="text-gray-500">
            No agents created yet.
          </p>
        ) : (
          agents.map((agent) => (
            <div
              key={agent.id}
              className="border border-gray-700 rounded-xl p-5"
            >
              <h2 className="text-xl font-semibold">
                {agent.name}
              </h2>

              <p className="text-gray-400">
                {agent.role}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
