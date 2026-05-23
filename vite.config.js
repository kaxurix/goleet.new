import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // (or your framework's plugin)

export default defineConfig({
  plugins: [react()],
  server: {
    // Allows the server to be accessed from the network / ngrok
    host: true,

    // Required in newer Vite versions to prevent "Invalid Host header" errors.
    // 'true' allows all hosts, which is fine for temporary local testing.
    allowedHosts: true,
  },
});
