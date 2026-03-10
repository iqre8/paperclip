export const type = "kimi_local";
export const label = "Kimi Code (local)";

export const models = [
  { id: "kimi-for-coding", label: "Kimi for Coding" },
  { id: "kimi-k2.5", label: "Kimi K2.5" },
  { id: "kimi-k2-turbo-preview", label: "Kimi K2 Turbo" },
];

export const agentConfigurationDoc = `# kimi_local agent configuration

Adapter: kimi_local

Core fields:
- cwd (string, optional): default absolute working directory fallback for the agent process (created if missing when possible)
- instructionsFilePath (string, optional): absolute path to a markdown instructions file injected at runtime
- model (string, optional): Kimi model id (e.g., "kimi-for-coding", "kimi-k2.5")
- thinking (boolean, optional): enable thinking mode
- promptTemplate (string, optional): run prompt template
- maxStepsPerRun (number, optional): max steps for one run
- command (string, optional): defaults to "kimi"
- extraArgs (string[], optional): additional CLI args
- env (object, optional): KEY=VALUE environment variables
  - KIMI_API_KEY: API key for Kimi
  - KIMI_BASE_URL: Base URL for Kimi API (e.g., "https://api.kimi.com/coding/v1")

Operational fields:
- timeoutSec (number, optional): run timeout in seconds
- graceSec (number, optional): SIGTERM grace period in seconds
`;
