import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "my-mcp-server",
  version: "1.0.0"
}, {
  capabilities: {
    tools: {}  // or resources: {}, prompts: {}
  }
});

// Define your tool
server.setRequestHandler("tools/list", async () => ({
  tools: [{
    name: "my_tool",
    description: "What it does",
    inputSchema: {
      type: "object",
      properties: {
        param: { type: "string" }
      }
    }
  }]
}));

// Handle tool calls
server.setRequestHandler("tools/call", async (request) => {
  // Your logic here
  return { content: [{ type: "text", text: "result" }] };
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);