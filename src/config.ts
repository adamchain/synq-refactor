// API host configuration
export interface Config {
  apiHost: string;
}

const config: Config = {
  apiHost: import.meta.env.VITE_API_HOST || "http://localhost:3001",
};

export default config;
