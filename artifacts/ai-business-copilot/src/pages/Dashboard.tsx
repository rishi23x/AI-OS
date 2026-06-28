import { useEffect, useState } from "react";

export default function Dashboard() {
  const [agents, setAgents] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");

  async function loadAgents() {
    const res = await fetch("/api/agents");
    const data = await res.json();
    setAgents(data);
  }

  useEffect(() => {
    loadAgents();
  }, []);

  async function createAgent() {
    await fetch("/api/agents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        role,
        systemPrompt,
      }),
    });

    setName("");
    setRole("");
    setSystemPrompt("");

    loadAgents();
  }

  return (
    <div className="min-h-screen p-10 bg-black text-white">

      <h1 className="text-4xl font-bold">
        AI-OS Dashboard
      </h1>

      <div className="mt-8 space-y-3 max-w-xl">

        <input
          className="w-full p-3 rounded bg-gray-900"
          placeholder="Agent Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-gray-900"
          placeholder="Agent Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <textarea
          className="w-full p-3 rounded bg-gray-900"
          placeholder="System Instructions"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
        />

        <button
          onClick={createAgent}
          className="px-5 py-3 rounded bg-white text-black"
        >
          Create Agent
        </button>

      </div>


      <h2 className="text-2xl mt-12">
        Your AI Agents
      </h2>


      <div className="mt-5 space-y-4">

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
              <h3 className="text-xl font-bold">
                {agent.name}
              </h3>

              <p>
                {agent.role}
              </p>

              <p className="text-gray-400 mt-2">
                {agent.systemPrompt}
              </p>

            </div>
          ))
        )}

      </div>

    </div>
  );
}
